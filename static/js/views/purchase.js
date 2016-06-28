fun.views.purchase = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {
        // 'click #about-signup-btn': 'signup',
        // 'click #about-signin-btn': 'signin',
        // 'click #subscribe-btn' : 'subscribe'
    },

    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.purchase = this.$el;
    },

    /*
    * Render the about view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.purchase));
            this.$el.html(template);
            $.getScript( "/static/js/scripts.js", function(data,textStatus,jqxhr){});
            fun.utils.templateStart();
            fun.utils.renderAccordion();
            // this.signupError = this.$('#about-alert');
            // // Form inputs
            // this.account = this.$('#about_username');
            // this.newAccount = this.account;
            // this.email = this.$('#about_email');
            // this.password = this.$('#about_password');
        }
        this.$el.removeClass("hide").addClass("show");
    },

    signin: function(event){
        'use strict';
        event.preventDefault();
        fun.utils.redirect(fun.conf.hash.login);
    },

    signup: function(event){
        'use strict';
        var signupError,
            account,
            password,
            location = window.location.hostname,
            email,
            view,
            rules,
            validationRules,
            callbacks,
            validForm;
        event.preventDefault();
        signupError = this.signupError;
        account = this.account.val();
        password = this.password.val();
        email = this.email.val();
        // check if this view stuff is really needed
        view = this;
        // form validation rules
        rules = {
            rules: {
                about_username: {
                    minlength: 2,
                    required: true
                },
                about_email: {
                    required: true,
                    email: true
                },
                about_password: {
                    minlength: 8,
                    required: true
                }
            }
        }
        validationRules = $.extend(rules, fun.utils.validationRules);
        $('#about-signup-form').validate(validationRules);
        // new user account callbacks
        callbacks = {
            success: function(){
                // Clear the stuff from the inputs ;)
                view.$('#about_username').val('');
                view.$('#about_email').val('');
                view.$('#about_password').val('');
                signupError.hide();
                // login the created user
                fun.utils.login(account, password,
                    {
                        success : function(xhr, status){

                            // currently this success call is never executed
                            // the success stuff is going on case 200 of the error function.
                            // Why? well... I really don't fucking know...

                            fun.utils.redirect(fun.conf.hash.profile);
                        },
                        error : function(xhr, status, error){

                            switch(xhr.status) {
                                case 403:
                                    var message = fun.utils.translate("usernameOrPasswordError");
                                    signupError.find('p').html(message);
                                    signupError.removeClass("hide").addClass("show");
                                    break;
                                case 200:
                                    // Check browser support
                                    if (typeof(Storage) != "undefined") {
                                        // Store
                                        localStorage.setItem("username", account);
                                    }
                                    fun.utils.redirect(fun.conf.hash.login);
                                    break;
                                default:
                                    console.log('the monkey is down');
                                    break;
                            }
                        }
                    }
                );
            },

            error: function(model, error){
                // Catch duplicate errors or some random stuff
                signupError.removeClass("hide").addClass("show");
                // TODO: on error add class error and label to the input field
                if (error.responseText.indexOf('account') != -1){
                    signupError.find('p').html('Username is already taken.');
                }
                else if (error.responseText.indexOf('email') != -1){
                    signupError.find('p').html('Email is invalid or already taken.');
                }
                else {
                    signupError.find('p').html('what daa!?');
                }
                
            }
        };

        // check for a valid form and create the new user account
        validForm = $('#about-signup-form').valid();
        if (validForm){
            //event.preventDefault();
            this.model = new fun.models.Account();
            this.model.save(
                {
                    account: account,
                    password: password,
                    email: email,

                    // here we put the location from where this user is made.
                    location:location,
                },
                callbacks
            );
        }
    },


    subscribe: function(event){
        'use strict';
        event.preventDefault();
        var email = this.$('#subscribe-email').val();
        fun.utils.subscribe(email, {
            success : function(jqXHR, textStatus){
                this.$('#subscribe-email').val('');
            },
            error : function(jqXHR, textStatus, errorThrown) {
                console.log('subscribe error');
            }
        });
    }

});
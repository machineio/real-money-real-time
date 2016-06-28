fun.views.forums = Backbone.View.extend({

    /*
    * Bind the event functions to the different HTML elements
    */
    events : {

    },
    
    /*
    * Class constructor
    */
    initialize : function(options) {
        fun.containers.forums = this.$el;
    },
    
    /*
    * Render the forums view
    */
    render : function(){
        if (!this.$el.html()){
            var template = _.template(fun.utils.getTemplate(fun.conf.templates.forums));
            this.$el.html(template);
        }
        this.$el.removeClass("hide").addClass("show");
    }

});

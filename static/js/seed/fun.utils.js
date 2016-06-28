/*
* Fun namespace container
*/
var fun = {
    account: {},
    utils: {},
    views: {},
    instances: {},
    containers: {},
    models: {},
    strings: {},
    conf: {},
    session: {}, //account and context maybe?
    cache: {templates : {}},
    omnibus: _.extend({}, Backbone.Events)
};

fun.utils.validateFormHome = function(type,data){
    if(type==='signup'){
        if(!fun.utils.emailValidation(data.email)){
            swal({title:'Error',text:"Please enter a valid email",type:"error",confirmButtonText:"Cool"});
            return;
        } else {
            if(data.username.length<6){
                swal({title:"Error",text:"The username must have at least 6 characters",type:"error",confirmButtonText:"Cool"});
            } else {
                if(data.password.length<8){
                    swal({title:"Error",text:"The password must have at least 8 characters",type:"error",confirmButtonText:"Cool"});
                } else {
                    return true;
                }
            }
        }
    } else {
        if(data.username.length<6){
            swal({title:"Error",text:"The username must have at least 6 characters",type:"error",confirmButtonText:"Cool"});
            return;
        } else {
            if(fun.utils.emailValidation(data.username)){
                swal({title:"Error",text:"Please enter your username instead of the email",type:"error",confirmButtonText:"Cool"});
            } else {
                return true;
            }
        }
    }
};

fun.utils.emailValidation = function(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

fun.utils.renderBlogTrainning = function(){
    console.log('RENDER BLOG TRAINING');
    // Blog Masonry
    $('.blog-masonry-container').isotope({
      itemSelector: '.blog-masonry-item',
      layoutMode: 'masonry'
    });

    $('.blog-filters li').click(function() {
      var current = $(this);
      current.siblings('li').removeClass('active');
      current.addClass('active');
      var filterValue = current.attr('data-filter');
      var container = current.closest('.blog-masonry').find('.blog-masonry-container');
      container.isotope({ filter: filterValue });
    });
};

fun.utils.renderAccordion = function(){
    $('.accordion li').click(function(){
        $(this).parent('.accordion').children('li').removeClass('active');
        $(this).addClass('active');
    });
};

fun.utils.onYouTubeIframeAPIReady = function () {
    $('.youtube-bg-iframe').each(function(index){
        $(this).attr('id', 'yt-'+index);
        var player = new YT.Player($(this).attr('id'), {
            events: {
            'onReady': function(){
                player.mute();
                player.playVideo();
            },
            'onStateChange': function(newState){
                player.playVideo();
            }
        }
        });
    });
};

fun.utils.handleTweets = function(tweets){
    if(tweets){
        var x = tweets.length;
        var n = 0;
        var element = document.getElementById('tweets');
        var html = '<ul class="slides">';
        while(n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
        }
        html += '</ul>';
        element.innerHTML = html;
    }
};

fun.utils.alignBottom = function (){
    $('.align-bottom').each(function(){
        var that = $(this);
        var height = that.height();
        var parentHeight = that.parent().height();
        var padAmount = (parentHeight) - (height) - 32;
        that.css('padding-top', padAmount);
    });
};

fun.utils.alignVertical = function(){
    $('.align-vertical').each(function(){
        var that = $(this);
        var height = that.height();
        var parentHeight = that.parent().height();
        var padAmount = (parentHeight / 2) - (height/2);
        that.css('padding-top', padAmount);
    });
};

fun.utils.startSlider = function(){
    // Slider Initializations
    $('.hero-slider').flexslider({});
    $('.image-slider').flexslider({ animation: "slide"});
    $('.testimonials-slider').flexslider({ directionNav: false });

    // Slide Sizes
    $('.slider-fullscreen .slides li').each(function(){
        $(this).css('height', $(window).height());
    });
    $('.fullscreen-element').each(function(){
        $(this).css('height', $(window).height());
    });


    // Feature Selector
    $('.selector-tabs li').click(function(){
        $(this).parent('.selector-tabs').children('li').removeClass('active');
        $(this).addClass('active');
        var activeTab = $(this).index() + 1;
        $(this).closest('.feature-selector').find('.selector-content').children('li').removeClass('active');
        $(this).closest('.feature-selector').find('.selector-content').children('li:nth-child('+activeTab+')').addClass('active');
    });

    // Append .background-image-holder <img>'s as CSS backgrounds
    $('.background-image-holder').each(function(){
        var imgSrc= $(this).children('img').attr('src');
        $(this).css('background', 'url("' + imgSrc + '")');
        $(this).children('img').hide();
        $(this).css('background-position', '50% 0%');
    });

    // Accordion
    $('.accordion li').click(function(){
        $(this).parent('.accordion').children('li').removeClass('active');
        $(this).addClass('active');
    });
};

fun.utils.templateStart = function(){
    // Offscreen Nav
    $('.offscreen-toggle').click(function(){
        $('.main-container').toggleClass('reveal-nav');
        $('.offscreen-container').toggleClass('reveal-nav');
        $('.offscreen-menu .container').toggleClass('reveal-nav');
    });

    $('.main-container').click(function(){
        if($(this).hasClass('reveal-nav')){
            $('.main-container').toggleClass('reveal-nav');
            $('.offscreen-container').toggleClass('reveal-nav');
            $('.offscreen-menu .container').toggleClass('reveal-nav');
        }
    });

    // Detect logo dimensions and add correct class
    var logoImage = $('.top-bar .logo:first-of-type');
    var theImage = new Image();
    theImage.src = logoImage.attr("src");
    var logoWidth = theImage.width;
    var logoHeight = theImage.height;
    var logoRatio = logoWidth / logoHeight;
    if(logoRatio > 2.8){
        $('.top-bar .logo').addClass('logo-wide');
    }
    if(logoRatio < 2){
        $('.top-bar .logo').addClass('logo-square');
    }
    // Smooth scroll
    $('.inner-link').smoothScroll({offset: -96, speed: 800});

    // Mobile Toggle
    $('.mobile-toggle').click(function(){
        $('nav').toggleClass('open-nav');
    });

    // Fullscreen nav toggle
    $('.fullscreen-nav-toggle').click(function(){
        if(!$('.fullscreen-nav-container').hasClass('show-fullscreen-nav')){
            $('.fullscreen-nav-container').addClass('show-fullscreen-nav');
            setTimeout(function(){
                $('.fullscreen-nav-container').addClass('fade-fullscreen-nav');
            },100);
            $(this).addClass('toggle-icon');
        }else{
            $(this).removeClass('toggle-icon');
                $('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
            setTimeout(function(){
                $('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
            },500);
        }
    });
    $('.fullscreen-nav-container .menu li a').click(function(){
        $('.fullscreen-nav-toggle').removeClass('toggle-icon');
            $('.fullscreen-nav-container').removeClass('fade-fullscreen-nav');
        setTimeout(function(){
            $('.fullscreen-nav-container').removeClass('show-fullscreen-nav');
        },500);
    });

    // Margin first section for top bar
    if(!$('nav').hasClass('overlay-bar') && !$('nav').hasClass('contained-bar')){
        $('.main-container').first().css('margin-top', $('nav').outerHeight());
    }

    // Pad first section for overlay bar
    if($('nav').hasClass('overlay-bar') || $('nav').hasClass('contained-bar') ){
        var currentPad = parseInt($('.main-container').find(':first-child').css('padding-top'));
        var newPad = currentPad + $('nav').outerHeight() - 48;
        if(currentPad > 0){
            $('.main-container').children(':first').css('padding-top', newPad);
        }else if($('.main-container').find(':first').hasClass('hero-slider')){
            var height = parseInt($('.hero-slider .slides li:first-child').outerHeight());
            var newHeight = height + $('nav').outerHeight();
            $('.hero-slider .slides li').css('height', newHeight);
        }
    }
    // Fullwidth Subnavs
    // Position Fullwidth Subnavs fullwidth correctly
    $('.subnav-fullwidth').each(function () {
        $(this).css('width', $('.container').width());
        var offset = $(this).closest('.has-dropdown').offset();
        offset = offset.left;
        var containerOffset = $(window).width() - $('.container').outerWidth();
        containerOffset = containerOffset /2;
        offset = offset - containerOffset - 15;
        $(this).css('left', -offset);
    });

    /************** Parallax Scripts **************/

    var isFirefox = typeof InstallTrigger !== 'undefined';
    var isIE = /*@cc_on!@*/ false || !!document.documentMode;
    var isChrome = !!window.chrome;
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    var prefix;

    if (isFirefox) {
        prefix = '-moz-';
    } else if (isIE) {

    } else if (isChrome || isSafari) {
        prefix = '-webkit-';
    }

    // $('.main-container section:first-child').addClass('first-child');

    // $('.parallax-background').each(function () {

    //     if ($(this).closest('section').hasClass('first-child') && !$(this).closest('section').hasClass('slider-fullscreen')) {
    //         $(this).attr('data-top', prefix + 'transform: translate3d(0px,0px, 0px)');
    //         $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,200px, 0px)');

    //     } else {

    //         $(this).attr('data-bottom-top', prefix + 'transform: translate3d(0px,-100px, 0px)');
    //         $(this).attr('data-center', prefix + 'transform: translate3d(0px,0px, 0px)');
    //         $(this).attr('data-top-bottom', prefix + 'transform: translate3d(0px,100px, 0px)');

    //     }

    // });

    if (!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)) {
        skrollr.init({
            forceHeight: false
        });
        
        // Multi Layer Parallax

        $('.hover-background').each(function(){
            $(this).mousemove(function( event ) {
                $(this).find('.background-image-holder').css('transform', 'translate(' + -event.pageX /30 + 'px,' + -event.pageY /45+ 'px)');
                $(this).find('.layer-1').css('transform', 'translate(' + -event.pageX /50 + 'px,' + -event.pageY /50+ 'px)');
                $(this).find('.layer-2').css('transform', 'translate(' + -event.pageX /60 + 'px,' + -event.pageY /60+ 'px)');
            });
        });
    }

    // Map Holder Overlay

    $('.map-holder').click(function(){
        $(this).addClass('on');
    });

    // Map Details Holder
    $('.details-holder').each(function(){
        $(this).css('height', $(this).width());
    });

    $('.details-holder').mouseenter(function(){
        $(this).closest('.map-overlay').addClass('fade-overlay');
    }).mouseleave(function(){$(this).closest('.map-overlay').removeClass('fade-overlay');});

    // Countdown

    $('.countdown').each(function(){
        $(this).countdown({until: new Date($(this).attr('data-date'))});
    });

    // Twitter Feed

    // if($('#tweets').length){
    //     twitterFetcher.fetch($('#tweets').attr('data-widget-id'), '', 5, true, true, true, '', false, fun.utils.handleTweets());
    // }

    // Expanding Lists (updated in Pivot 1.4.0)
    $('.expanding-ul li').click(function(){
        $('.expanding-ul li').removeClass('active');
        $(this).addClass('active');
    });

    // Align Elements Vertically
    fun.utils.alignVertical();
    fun.utils.alignBottom();

    // Blog Masonry
    $('.blog-masonry-container').isotope({
      itemSelector: '.blog-masonry-item',
      layoutMode: 'masonry'
    });

    $('.blog-filters li').click(function() {
      var current = $(this);
      
      current.siblings('li').removeClass('active');
      current.addClass('active');
      
      var filterValue = current.attr('data-filter');
      var container = current.closest('.blog-masonry').find('.blog-masonry-container');
      container.isotope({ filter: filterValue });
    });
};

fun.utils.hideAccountsHistory = function(){
    'use strict';
    // test this stuff up
    $('#all-history-trades').removeClass('hide').addClass('show');
    // list of active and demo accounts
    $('#wipe-the-house').removeClass("show").addClass('hide');
    $('#wipe-the-incakid').removeClass('show').addClass('hide');
    $('#wipe-crazy-tracy').removeClass('show').addClass('hide');
    $('#wipe-ron-jones').removeClass('show').addClass('hide');
    $('#wipe-affiliate').removeClass('show').addClass('hide');
    $('#wipe-irene').removeClass('show').addClass('hide');
    $('#wipe-oilmanreed').removeClass('show').addClass('hide');
    $('#wipe-village').removeClass('show').addClass('hide');
    $('#wipe-todd').removeClass('show').addClass('hide');
    $('#wipe-vwoodard').removeClass('show').addClass('hide');
    $('#wipe-mredd').removeClass('show').addClass('hide');
    $('#wipe-drkno').removeClass('show').addClass('hide');
    $('#wipe-imcy').removeClass('show').addClass('hide');
    $('#wipe-minaran').removeClass('show').addClass('hide');
    $('#wipe-paul').removeClass('show').addClass('hide');
    $('#wipe-winnerscircle').removeClass('show').addClass('hide');
    $('#wipe-ashanabey').removeClass('show').addClass('hide');
    $('#wipe-greatsavings').removeClass('show').addClass('hide');
    $('#wipe-chris').removeClass('show').addClass('hide');
    $('#wipe-khut').removeClass('show').addClass('hide');
    $('#wipe-tntnitro').removeClass('show').addClass('hide');
    $('#wipe-oscara').removeClass('show').addClass('hide');
    $('#wipe-khern').removeClass('show').addClass('hide');
    $('#wipe-mark-carter').removeClass('show').addClass('hide');
    $('#wipe-chuma-luanne').removeClass('show').addClass('hide');
    $('#wipe-curtis').removeClass('show').addClass('hide');
    $('#wipe-papilindo').removeClass('show').addClass('hide');
    $('#wipe-sabco').removeClass('show').addClass('hide');
    $('#wipe-desertmann').removeClass('show').addClass('hide');
    $('#wipe-lwellszero').removeClass('show').addClass('hide');
    $('#wipe-youngpaul').removeClass('show').addClass('hide');
    $('#wipe-larostr').removeClass('show').addClass('hide');
    $('#wipe-thomaswswetz').removeClass('show').addClass('hide');
    $('#wipe-delightfulnita').removeClass('show').addClass('hide');
    $('#wipe-ahmedrehman').removeClass('show').addClass('hide');
    $('#wipe-teamline').removeClass('show').addClass('hide');
    $('#wipe-easyclick').removeClass('show').addClass('hide');
    $('#wipe-aparikh').removeClass('show').addClass('hide');
    $('#wipe-dmcmproperties').removeClass('show').addClass('hide');
    $('#wipe-jubair-toha').removeClass('show').addClass('hide');
    $('#wipe-eljosmith').removeClass('show').addClass('hide');
    $('#wipe-ashleymarielove').removeClass('show').addClass('hide');
    $('#wipe-johnsontilldeath').removeClass('show').addClass('hide');
    $('#wipe-rjs-productions').removeClass('show').addClass('hide');
    $('#wipe-ashrafmalak').removeClass('show').addClass('hide');
    $('#wipe-lilustreci').removeClass('show').addClass('hide');
    $('#wipe-trader').removeClass('show').addClass('hide');
    $('#wipe-benniecurrey').removeClass('show').addClass('hide');
    $('#wipe-annjosuccess').removeClass('show').addClass('hide');
    $('#wipe-christopherruxer').removeClass('show').addClass('hide');
    $('#wipe-whitlow').removeClass('show').addClass('hide');
    $('#wipe-billyjoe').removeClass('show').addClass('hide');
    $('#wipe-billyt').removeClass('show').addClass('hide');
    $('#wipe-gaddy').removeClass('show').addClass('hide');
    $('#wipe-billye').removeClass('show').addClass('hide');
    $('#wipe-blakeyevans').removeClass('show').addClass('hide');
    $('#wipe-bstuart').removeClass('show').addClass('hide');
    $('#wipe-bonwuamaegbu').removeClass('show').addClass('hide');
    $('#wipe-pmmidlands').removeClass('show').addClass('hide');
    $('#wipe-1naturalmaster').removeClass('show').addClass('hide');
    $('#wipe-bobklassen').removeClass('show').addClass('hide');
    $('#wipe-olblueeyes').removeClass('show').addClass('hide');
    $('#wipe-bobby59').removeClass('show').addClass('hide');
    $('#wipe-tamikrag').removeClass('show').addClass('hide');
    $('#wipe-bsenninger').removeClass('show').addClass('hide');
    $('#wipe-chrlsbrnrd').removeClass('show').addClass('hide');
    $('#wipe-sandwalker').removeClass('show').addClass('hide');
    $('#wipe-jc357ii').removeClass('show').addClass('hide');
    $('#wipe-thompson').removeClass('show').addClass('hide');
    $('#wipe-dkdelgardo').removeClass('show').addClass('hide');
    $('#wipe-demilldolly').removeClass('show').addClass('hide');
    $('#wipe-dellareagan').removeClass('show').addClass('hide');
    $('#wipe-dennissheehan').removeClass('show').addClass('hide');
    $('#wipe-deezey').removeClass('show').addClass('hide');
    $('#wipe-jamaredaniels').removeClass('show').addClass('hide');
    $('#wipe-dbdavisnc').removeClass('show').addClass('hide');
    $('#wipe-devon').removeClass('show').addClass('hide');
    $('#wipe-ugc').removeClass('show').addClass('hide');
    $('#wipe-barrygurman').removeClass('show').addClass('hide');
    $('#wipe-servicespecialty').removeClass('show').addClass('hide');
    $('#wipe-dkg').removeClass('show').addClass('hide');
    $('#wipe-ddeposey').removeClass('show').addClass('hide');
    $('#wipe-dsanches').removeClass('show').addClass('hide');
    $('#wipe-deonbelle').removeClass('show').addClass('hide');
    $('#wipe-benallyd').removeClass('show').addClass('hide');
    $('#wipe-paullive').removeClass('show').addClass('hide');
    $('#wipe-dgray').removeClass('show').addClass('hide');
    $('#wipe-ddeposey').removeClass('show').addClass('hide');
    $('#wipe-dsanches').removeClass('show').addClass('hide');
    $('#wipe-deonbelle').removeClass('show').addClass('hide');
    $('#wipe-donaldselfgold').removeClass('show').addClass('hide');
    $('#wipe-demarco').removeClass('show').addClass('hide');
    $('#wipe-atvwizard').removeClass('show').addClass('hide');
    $('#wipe-angiemamac').removeClass('show').addClass('hide');
    $('#wipe-gmars').removeClass('show').addClass('hide');
    $('#wipe-atechagivens').removeClass('show').addClass('hide');
    $('#wipe-demimosby').removeClass('show').addClass('hide');
    $('#wipe-jthode').removeClass('show').addClass('hide');
    $('#wipe-bunnydonna').removeClass('show').addClass('hide');
    $('#wipe-deray').removeClass('show').addClass('hide');
    $('#wipe-henryjamespollock').removeClass('show').addClass('hide');
    $('#wipe-elyas').removeClass('show').addClass('hide');
    $('#wipe-deliver').removeClass('show').addClass('hide');
    $('#wipe-lavonwilliams').removeClass('show').addClass('hide');
    $('#wipe-randyharrison').removeClass('show').addClass('hide');
    $('#wipe-zjavanee').removeClass('show').addClass('hide');
    $('#wipe-cal-lacoste').removeClass('show').addClass('hide');
    $('#wipe-angiemamac').removeClass('show').addClass('hide');
    $('#wipe-archpm44').removeClass('show').addClass('hide');
    $('#wipe-nicoleforsale').removeClass('show').addClass('hide');
    $('#wipe-tombo44').removeClass('show').addClass('hide');
    $('#wipe-duane58').removeClass('show').addClass('hide');
    $('#wipe-nynee').removeClass('show').addClass('hide');
    $('#wipe-bodysbyjackie').removeClass('show').addClass('hide');
    $('#wipe-wskicme').removeClass('show').addClass('hide');
    $('#wipe-davidrake').removeClass('show').addClass('hide');
    $('#wipe-aliciachase').removeClass('show').addClass('hide');
    $('#wipe-edgarjrgonzalez').removeClass('show').addClass('hide');
    $('#wipe-taz-man').removeClass('show').addClass('hide');
    $('#wipe-haovod').removeClass('show').addClass('hide');
    $('#wipe-camelotent1').removeClass('show').addClass('hide');
    $('#wipe-aicaulay').removeClass('show').addClass('hide');
    $('#wipe-frdag2').removeClass('show').addClass('hide');
    $('#wipe-tekia37').removeClass('show').addClass('hide');
    $('#wipe-conniej931').removeClass('show').addClass('hide');
    $('#wipe-pvera112').removeClass('show').addClass('hide');
    $('#wipe-sunshinepitcher').removeClass('show').addClass('hide');
    $('#wipe-franceskelsey').removeClass('show').addClass('hide');
    $('#wipe-jamesgerard').removeClass('show').addClass('hide');
    $('#wipe-sampson').removeClass('show').addClass('hide');
    $('#wipe-jonesgermain').removeClass('show').addClass('hide');
    $('#wipe-yvonnemariathomas').removeClass('show').addClass('hide');
    $('#wipe-estep').removeClass('show').addClass('hide');
    $('#wipe-erardolopez').removeClass('show').addClass('hide');
    $('#wipe-polox').removeClass('show').addClass('hide');
    $('#wipe-brendaspearman').removeClass('show').addClass('hide');
    $('#wipe-aphilly').removeClass('show').addClass('hide');
    $('#wipe-bigmagdy').removeClass('show').addClass('hide');
    $('#wipe-rich').removeClass('show').addClass('hide');
    $('#wipe-lbrandtnyc').removeClass('show').addClass('hide');
    $('#wipe-deannajohnh').removeClass('show').addClass('hide');
    $('#wipe-frankjr').removeClass('show').addClass('hide');
    $('#wipe-titoexvi').removeClass('show').addClass('hide');
    $('#wipe-flugo').removeClass('show').addClass('hide');
    $('#wipe-eric').removeClass('show').addClass('hide');
    $('#wipe-fred-maloney').removeClass('show').addClass('hide');
    $('#wipe-johnsontildeath80').removeClass('show').addClass('hide');
    $('#wipe-gerardolopez81').removeClass('show').addClass('hide');
    $('#wipe-mikec').removeClass('show').addClass('hide');
    $('#wipe-williamhunter').removeClass('show').addClass('hide');
    $('#wipe-wtprop').removeClass('show').addClass('hide');
    $('#wipe-appltb').removeClass('show').addClass('hide');
    $('#wipe-cowboy').removeClass('show').addClass('hide');
    $('#wipe-pb6615').removeClass('show').addClass('hide');
    $('#wipe-josejoday').removeClass('show').addClass('hide');
    $('#wipe-healymoto').removeClass('show').addClass('hide');
    $('#wipe-djcarl').removeClass('show').addClass('hide');
    $('#wipe-olliemclrk').removeClass('show').addClass('hide');
    $('#wipe-brucepenigton').removeClass('show').addClass('hide');
    $('#wipe-kevin_roberts').removeClass('show').addClass('hide');
    $('#wipe-dwight').removeClass('show').addClass('hide');
    $('#wipe-charleslee').removeClass('show').addClass('hide');
    $('#wipe-kjframing').removeClass('show').addClass('hide');
    $('#wipe-janice').removeClass('show').addClass('hide');
    $('#wipe-1stephnasty').removeClass('show').addClass('hide');
    $('#wipe-mtumlin').removeClass('show').addClass('hide');
    $('#wipe-justind25').removeClass('show').addClass('hide');
    $('#wipe-avendano').removeClass('show').addClass('hide');
    $('#wipe-hussain').removeClass('show').addClass('hide');
    $('#wipe-bestycolon').removeClass('show').addClass('hide');
    $('#wipe-axonceleste').removeClass('show').addClass('hide');
    $('#wipe-azcoeho').removeClass('show').addClass('hide');
    $('#wipe-sarjmussa').removeClass('show').addClass('hide');
    $('#wipe-mike-w').removeClass('show').addClass('hide');
    $('#wipe-mennie').removeClass('show').addClass('hide');
    $('#wipe-rickdanre').removeClass('show').addClass('hide');
    $('#wipe-eddie96797').removeClass('show').addClass('hide');
    $('#wipe-andy2740').removeClass('show').addClass('hide');
    $('#wipe-lsmoreland').removeClass('show').addClass('hide');
    $('#wipe-madsunintl').removeClass('show').addClass('hide');
    $('#wipe-farjmussa').removeClass('show').addClass('hide');
};


fun.utils.hideAmounts = function(){
    'use strict';
    $('#current-budget').removeClass('show').addClass('hide');
    $('#current-250').removeClass('show').addClass('hide');
    $('#current-150').removeClass('show').addClass('hide');
    $('#current-475').removeClass('show').addClass('hide');
    $('#current-825').removeClass('show').addClass('hide');
    $('#current-500').removeClass('show').addClass('hide');
    $('#current-945').removeClass('show').addClass('hide');
    $('#current-645').removeClass('show').addClass('hide');
    $('#current-850').removeClass('show').addClass('hide');
    $('#current-384').removeClass('show').addClass('hide');
    $('#current-384b').removeClass('show').addClass('hide');
    $('#current-380').removeClass('show').addClass('hide');
    $('#current-344').removeClass('show').addClass('hide');
    $('#current-625').removeClass('show').addClass('hide');
    $('#current-471').removeClass('show').addClass('hide');
    $('#current-367').removeClass('show').addClass('hide');
    $('#current-111').removeClass('show').addClass('hide');
    $('#current-7539').removeClass('show').addClass('hide');
    $('#current-2599').removeClass('show').addClass('hide');
    $('#current-2218').removeClass('show').addClass('hide');
    $('#current-8191').removeClass('show').addClass('hide');
    $('#current-9249').removeClass('show').addClass('hide');
    $('#current-10118').removeClass('show').addClass('hide');
    $('#current-11163').removeClass('show').addClass('hide');
    $('#current-10879').removeClass('show').addClass('hide');
    $('#current-750').removeClass('show').addClass('hide');
    $('#current-1418').removeClass('show').addClass('hide');
    $('#current-2772').removeClass('show').addClass('hide');
    $('#current-3079').removeClass('show').addClass('hide');
    $('#current-1878').removeClass('show').addClass('hide');
    $('#current-1284').removeClass('show').addClass('hide');
    $('#current-6025').removeClass('show').addClass('hide');
    $('#current-666').removeClass('show').addClass('hide');
    $('#current-5130').removeClass('show').addClass('hide');
    $('#current-1126').removeClass('show').addClass('hide');
    $('#current-6986').removeClass('show').addClass('hide');
    $('#current-7704').removeClass('show').addClass('hide');
    $('#current-2718').removeClass('show').addClass('hide');
    $('#current-4257').removeClass('show').addClass('hide');
    $('#current-602').removeClass('show').addClass('hide');
    $('#current-674').removeClass('show').addClass('hide');
    $('#current-652').removeClass('show').addClass('hide');
    $('#current-879').removeClass('show').addClass('hide');
    $('#current-2534').removeClass('show').addClass('hide');
    $('#current-945').removeClass('show').addClass('hide');
    $('#current-1718').removeClass('show').addClass('hide');
    $('#current-5502').removeClass('show').addClass('hide');
    $('#current-8293').removeClass('show').addClass('hide');
    $('#current-342').removeClass('show').addClass('hide');
    $('#current-567').removeClass('show').addClass('hide');
    $('#current-2250').removeClass('show').addClass('hide');
    $('#current-6402').removeClass('show').addClass('hide');
    $('#current-6752').removeClass('show').addClass('hide');
    $('#current-428').removeClass('show').addClass('hide');
    $('#current-10435').removeClass('show').addClass('hide');
    $('#current-3164').removeClass('show').addClass('hide');
    $('#current-2233').removeClass('show').addClass('hide');
    $('#current-275').removeClass('show').addClass('hide');
    $('#current-319').removeClass('show').addClass('hide');
    $('#current-4670').removeClass('show').addClass('hide');
    $('#current-3918').removeClass('show').addClass('hide');
    $('#current-10770').removeClass('show').addClass('hide');
    $('#current-3923').removeClass('show').addClass('hide');
    $('#current-421').removeClass('show').addClass('hide');
    $('#current-10819').removeClass('show').addClass('hide');
    $('#current-338').removeClass('show').addClass('hide');
    $('#current-384c').removeClass('show').addClass('hide');
    $('#current-428b').removeClass('show').addClass('hide');
    $('#current-317').removeClass('show').addClass('hide');
    $('#current-3935').removeClass('show').addClass('hide');
    $('#current-360').removeClass('show').addClass('hide');
    $('#current-304').removeClass('show').addClass('hide');
    $('#current-1503').removeClass('show').addClass('hide');
    $('#current-273').removeClass('show').addClass('hide');
    $('#current-1233').removeClass('show').addClass('hide');
    $('#current-1233').removeClass('show').addClass('hide');
    $('#current-297').removeClass('show').addClass('hide');
    $('#current-3946').removeClass('show').addClass('hide');
    $('#current-443').removeClass('show').addClass('hide');
    $('#current-315').removeClass('show').addClass('hide');
    $('#current-371').removeClass('show').addClass('hide');
    $('#current-1514').removeClass('show').addClass('hide');
    $('#current-1255').removeClass('show').addClass('hide');
    $('#current-351').removeClass('show').addClass('hide');
    $('#current-408').removeClass('show').addClass('hide');
    $('#current-1259').removeClass('show').addClass('hide');
    $('#current-480').removeClass('show').addClass('hide');
    $('#current-382').removeClass('show').addClass('hide');
    $('#current-358').removeClass('show').addClass('hide');
    $('#current-293').removeClass('show').addClass('hide');
    $('#current-4537').removeClass('show').addClass('hide');
    $('#current-360b').removeClass('show').addClass('hide');
    $('#current-7404').removeClass('show').addClass('hide');
    $('#current-2284').removeClass('show').addClass('hide');
    $('#current-358b').removeClass('show').addClass('hide');
    $('#current-336').removeClass('show').addClass('hide');
    $('#current-66').removeClass('show').addClass('hide');
    $('#current-316').removeClass('show').addClass('hide');
    $('#current-7479').removeClass('show').addClass('hide');
    $('#current-3938').removeClass('show').addClass('hide');
    $('#current-318').removeClass('show').addClass('hide');
    $('#current-385').removeClass('show').addClass('hide');
    $('#current-316c').removeClass('show').addClass('hide');
    $('#current-7606').removeClass('show').addClass('hide');
    $('#current-4342').removeClass('show').addClass('hide');
    $('#current-4591').removeClass('show').addClass('hide');
    $('#current-1570').removeClass('show').addClass('hide');
    $('#current-473').removeClass('show').addClass('hide');
    $('#current-344a').removeClass('show').addClass('hide');
    $('#current-401').removeClass('show').addClass('hide');
    $('#current-1251').removeClass('show').addClass('hide'); 
    $('#current-340').removeClass('show').addClass('hide'); 
    $('#current-274').removeClass('show').addClass('hide');
    $('#current-7981').removeClass('show').addClass('hide');
    $('#current-293b').removeClass('show').addClass('hide');
    $('#current-388').removeClass('show').addClass('hide');
    $('#current-320').removeClass('show').addClass('hide');
    $('#current-314').removeClass('show').addClass('hide');
    $('#current-231').removeClass('show').addClass('hide');
    $('#current-4012').removeClass('show').addClass('hide');
    $('#current-314b').removeClass('show').addClass('hide');
    $('#current-484').removeClass('show').addClass('hide');
    $('#current-427').removeClass('show').addClass('hide');
    $('#current-4621').removeClass('show').addClass('hide');
    $('#current-383').removeClass('show').addClass('hide');
    $('#current-315b').removeClass('show').addClass('hide');
    $('#current-8027').removeClass('show').addClass('hide');
    $('#current-582').removeClass('show').addClass('hide');
    $('#current-242').removeClass('show').addClass('hide');
    $('#current-4023').removeClass('show').addClass('hide');
    $('#current-466').removeClass('show').addClass('hide');
    $('#current-4632').removeClass('show').addClass('hide');
    $('#current-438').removeClass('show').addClass('hide');
    $('#current-495').removeClass('show').addClass('hide');
    $('#current-1138').removeClass('show').addClass('hide');
    $('#current-1263').removeClass('show').addClass('hide');
    $('#current-1581').removeClass('show').addClass('hide');
    $('#current-342b').removeClass('show').addClass('hide');
    $('#current-4479').removeClass('show').addClass('hide');
    $('#current-632').removeClass('show').addClass('hide');
    $('#current-351b').removeClass('show').addClass('hide');
    $('#current-618').removeClass('show').addClass('hide');
    $('#current-8465').removeClass('show').addClass('hide');
    $('#current-4059').removeClass('show').addClass('hide');
    $('#current-503').removeClass('show').addClass('hide');
    $('#current-4668').removeClass('show').addClass('hide');
    $('#current-532').removeClass('show').addClass('hide');
    $('#current-1210').removeClass('show').addClass('hide');
    $('#current-1299').removeClass('show').addClass('hide');
    $('#current-1618').removeClass('show').addClass('hide');
    $('#current-8588').removeClass('show').addClass('hide');
    $('#current-4699').removeClass('show').addClass('hide');
    $('#current-408b').removeClass('show').addClass('hide');
    $('#current-649').removeClass('show').addClass('hide');
    $('#current-339').removeClass('show').addClass('hide');
    $('#current-10588').removeClass('show').addClass('hide');
    $('#current-1399').removeClass('show').addClass('hide');
    $('#current-1410').removeClass('show').addClass('hide');
    $('#current-10693').removeClass('show').addClass('hide');
    $('#current-673').removeClass('show').addClass('hide');
    $('#current-4710').removeClass('show').addClass('hide');
    $('#current-4521').removeClass('show').addClass('hide');
    $('#current-362').removeClass('show').addClass('hide');
    $('#current-4027').removeClass('show').addClass('hide');
    $('#current-1239').removeClass('show').addClass('hide');
    $('#current-513').removeClass('show').addClass('hide');
    $('#current-485').removeClass('show').addClass('hide');
    $('#current-542').removeClass('show').addClass('hide');
    $('#current-315c').removeClass('show').addClass('hide');
    $('#current-4671').removeClass('show').addClass('hide');
    $('#current-1868').removeClass('show').addClass('hide');
    $('#current-10843').removeClass('show').addClass('hide');
    $('#current-340b').removeClass('show').addClass('hide');
    $('#current-338b').removeClass('show').addClass('hide');
    $('#current-278').removeClass('show').addClass('hide');
    $('#current-11162').removeClass('show').addClass('hide');
    $('#current-11379').removeClass('show').addClass('hide');
    $('#current-11253').removeClass('show').addClass('hide');
    $('#current-4545').removeClass('show').addClass('hide');
    $('#current-1423').removeClass('show').addClass('hide');
    $('#current-1919').removeClass('show').addClass('hide');
    $('#current-11352').removeClass('show').addClass('hide');
    $('#current-4611').removeClass('show').addClass('hide');
    $('#current-1409').removeClass('show').addClass('hide');
    $('#current-1985').removeClass('show').addClass('hide');
    $('#current-4726').removeClass('show').addClass('hide');
    $('#current-659').removeClass('show').addClass('hide');
    $('#current-347').removeClass('show').addClass('hide');
    $('#current-401275').removeClass('show').addClass('hide');
    $('#current-1270').removeClass('show').addClass('hide');
    $('#current-499').removeClass('show').addClass('hide');
    $('#current-471b').removeClass('show').addClass('hide');
    $('#current-528').removeClass('show').addClass('hide');
    $('#current-1196').removeClass('show').addClass('hide');
    $('#current-11428').removeClass('show').addClass('hide');
};




/*
* Updater deals with websocket stuff
*/
fun.utils.updater = {
    socket: null,

    start: function() {
        var url = "ws://" + location.host + "/ws/alerts";
        fun.utils.updater.socket = new WebSocket(url);
        fun.utils.updater.socket.onmessage = function(event) {
            fun.utils.updater.processMessage(JSON.parse(event.data));
        }
    },

    processMessage: function(message){
        if (message['message'] !== 'heartbeat'){
            sessionStorage.setItem("obelix", message['message']);
            fun.omnibus.trigger("obelix:message");
        }
    }
};


/*
* Updater deals with websocket stuff
*/
fun.utils.getExpiryMinutes = function(expiry) {
    'use strict';
    var expiry, times;
    times = {
        '0':5,
        '1':10,
        '2':15,
        '3':20,
        '4':30,
        '5':60,
        '6':120,
        '7':150
    };
    return times[expiry];
};


/*
* Fetches the session from it's container (cookie)
* @return Object: Session data
*/
fun.utils.getSession = function() {
    var session = null;
    
    if ($.cookie){
        session = $.cookie('username');
    }
    return session;
};


/**
 * Tells whether the session has been created or not.
 * @return boolean
 */
fun.utils.loggedIn = function() {
    var session = this.getSession();
    fun.session = session;
    return (session != null);
};


/**
 * Logs the user into the system
 * @param string account: account
 * @param string password: password
 * @param object callbacks: object with success and error callback
 * @return boolean
 */
fun.utils.login = function(account, password, callbacks) {
    $.ajax({
        type: "GET",
        url: fun.conf.urls.login,
        dataType: 'json',
        beforeSend: function(xhr){
            auth = account + ':' + password;
            var words  = CryptoJS.enc.Latin1.parse(auth);
            var base64 = CryptoJS.enc.Base64.stringify(words);
            xhr.setRequestHeader("Authorization", "Basic " + base64);
            xhr.setRequestHeader("Access-Control-Allow-Origin","*");
        },
        success: function (data, textStatus, jqXHR){

            //$.cookie( 'account', account );

            // so... this stuff never works...

            if (_.isFunction(callbacks.success)){
                callbacks.success(data);
            }
        },
        error: function (xhr, textStatus, thrownError){
            if (_.isFunction(callbacks.error)){
                callbacks.error(xhr, textStatus, thrownError);
            }
        }
    });
};


fun.utils.sendFile = function(file) {
    var uri = "/upload";
    var request = new XMLHttpRequest();
    var fd = new FormData();
    
    request.open("POST", uri, true);
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            // Handle response.
            alert(request.responseText); // handle response.
        }
    };
    fd.append('fileUpload', file);
    // Initiate a multipart/form-data upload
    request.send(fd);
};

/*
* Subscribe
*/
fun.utils.subscribe = function(callbacks){
    'use strict';
    console.log('fun.utils.subscribe');
    var email = $("#subscribe-email").val(),
        task,
        taskPayload;

    taskPayload = {
        first_name: 'Random',
        last_name: 'Funster',
        title: 'news subscribe',
        description: 'curious and stuff',
        label: 'Home Subscribe',
        email: email,
    };

    task = new fun.models.Task(taskPayload);
    task.save();

    $("#subscribe-email").val('');
};


/**
 * Logout the account
 * @return void
 */
fun.utils.logout = function(callbacks){
    $.ajax({
        url : fun.conf.urls.logout,
        type : 'GET',
        dataType : 'json',
        success : function(data, textStatus, jqXHR) {
            // this is bananas... why? cuz it don't work anymore... 
            // Clear the html from the containers
            for (var i in fun.containers) {
                if(i !== 'login' && i !== 'footer' && i !== 'navbar' && i !== 'subheader'){
                    fun.containers[i].empty();
                }
            }
            if (_.isObject(callbacks) && _.isFunction(callbacks.success)) {
                callbacks.success();
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
            // Clear the html from the containers
            for (var i in fun.containers) {
                if(i !== 'login' && i !== 'footer' && i !== 'navbar' && i !== 'subheader'){
                    fun.containers[i].empty();
                }
            }
            if (_.isObject(callbacks) && _.isFunction(callbacks.error)) {
                callbacks.error();
            }
        }
    });

    // Clean storage outside ajax call, this way we always clean the stuff.
    if (typeof(Storage) != "undefined") {
        localStorage.removeItem('username');
        localStorage.removeItem('profile');
        sessionStorage.removeItem('context');
    }
};


/**
* Checks on the strings object for the specified key.
* If the value doesn't exist the key is returned
* @param string key for the translation requested
* @return The translated value for the specified key
*/
fun.utils.translate = function translate(key) {
    var value = key;
    if (typeof fun.strings[key] != 'undefined') {
        value = fun.strings[key];
    }

    // replace the rest of the arguments into the string
    for( var i = 1; i < arguments.length; i++) {
        value = value.replace('%' + i + '$s', args[i]);
    }

    return value;
};


/**
 * Fetches an html template
 * @return Object
 */
fun.utils.getTemplate = function(url){
    if ( !fun.cache.templates[url] ) {
        var response = $.ajax(url, {
            async : false,
            dataTypeString : 'html'
        });
        fun.cache.templates[url] = response.responseText;
    }
    return fun.cache.templates[url];
};


/**
 * Redirects to a different url #hash
 * @param string url: new location
 * @return Object
 */
fun.utils.redirect = function(url) {
    window.location = url;
};


/**
 * Hide all the UI stuff
 */
fun.utils.hideAll = function() {
    for (var i in fun.containers){
        // hide all containers including footer
        //fun.containers[i].hide();
        fun.containers[i].removeClass("show").addClass("hide");
        //if ( i != 'footer'){
        //    fun.containers[i].hide();
        //}
    }
};


/**
* check if this stuff works on empty strings
*/
fun.utils.emptyString = function(str) {
    return (!str || 0 === str.length);
};


/**
 * Rounds up a number.
 * @return Object
 */
fun.utils.round = function(number, decimals){
  if (typeof decimals === 'undefined')
  {
      var decimals = 2;
  }
  var newNumber = Math.round(number*Math.pow(10,decimals))/Math.pow(10,decimals);
  return parseFloat(newNumber);
};


/**
 * validation rules
 * return custom validation rules
 */
fun.utils.validationRules = function(){
    var custom = {
        focusCleanup: false,
        wrapper: 'div',
        errorElement: 'span',
        
        highlight: function(element) {
            $(element).parents ('.control-group').removeClass ('success').addClass('error');
        },
        success: function(element) {
            $(element).parents ('.control-group').removeClass ('error').addClass('success');
            $(element).parents ('.controls:not(:has(.clean))').find ('div:last').before ('<div class="clean"></div>');
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parents ('.controls'));
        }
    };
    
    return custom;
};

/**
 * string 'join' format
 */
fun.utils.format = function(){
    'use strict';
    var args,
        initial;
    args = [].slice.call(arguments);
    initial = args.shift();

    // check if we can use {%d} instead of '%s'
    function replacer (text, replacement) {
        return text.replace('%s', replacement);
    }
    return args.reduce(replacer, initial);
};

/**
 * jQuery validator custom error messages
 * Included fun.utils after the validation plugin to override the messages
 *
 * TODO: validator.messages on fun.strings.js
 */
jQuery.extend(jQuery.validator.messages, {
    required: "This field is required.",
    remote: "Please fix this field.",
    email: "Please enter a valid email address.",
    url: "Please enter a valid URL.",
    date: "Please enter a valid date.",
    dateISO: "Please enter a valid date (ISO).",
    number: "Please enter a valid number.",
    digits: "Please enter only digits.",
    creditcard: "Please enter a valid credit card number.",
    equalTo: "Please enter the same value again.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
    minlength: jQuery.validator.format("Please enter at least {0} characters."),
    rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
    range: jQuery.validator.format("Please enter a value between {0} and {1}."),
    max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
    min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});


/**
 * Alias
 */
var translate = fun.utils.translate;
var round = fun.utils.round;


// random stuff that needs some new love

var Theme = function(){
    
    var chartColors;
    
    // Black & Orange
    //chartColors = ["#FF9900", "#333", "#777", "#BBB", "#555", "#999", "#CCC"];
    
    // Ocean Breeze
    //chartColors = ['#94BA65', '#2B4E72', '#2790B0', '#777','#555','#999','#bbb','#ccc','#eee'];
    
    // Fire Starter
    //chartColors = ['#750000', '#F90', '#777', '#555','#002646','#999','#bbb','#ccc','#eee'];
    
    // Mean Green
    chartColors = ['#5F9B43', '#DB7D1F', '#BA4139', '#777','#555','#999','#bbb','#ccc','#eee'];
    
    return { chartColors: chartColors };
    
}();


var Charts = function () {
    
    var colors = Theme.chartColors;
    
    return {
        vertical: vertical,
        horizontal: horizontal,
        pie: pie,
        donut: donut,
        line: line
    };
    
    function vertical(target, data) {
        var options = {
            colors: colors,
    
            grid: {
                hoverable: true, 
                borderWidth: 2
            }, 
            bars: {
                horizontal: false, 
                show: true, 
                align: 'center', 
                lineWidth: 0,
                fillColor: { colors: [ { opacity: 1 }, { opacity: 0.5 } ] }
            }, 
            legend: {
                show: true
            },
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
        };
    
        var el = $(target);
        
        if (el.length) {
            $.plot(el, data, options );
        }
    }
    
    function horizontal(target, data) {
        var options = {
                    colors: colors,

                    grid: {
                        hoverable: true, 
                        borderWidth: 2
                    }, 
                    bars: {
                        horizontal: true, 
                        show: true, 
                        align: 'center', 
                        barWidth: .2,
                        lineWidth: 0,
                        fillColor: { colors: [ { opacity: 1 }, { opacity: 1} ] }
                    }, 
                    legend: {
                        show: true
                    },
            
                    tooltip: true,
                    tooltipOpts: {
                        content: '%s: %y'
                    },
                };
            
            var el = $(target);
                
                if (el.length) {
                    $.plot(el, data, options );
                }
    }
    
    function pie(target, data) {
        var options = {
            colors: colors,
            
            series: {
                pie: {
                    show: true,  
                    innerRadius: 0, 
                    stroke: {
                        width: 4
                    }
                }
            }, 
                
            legend: {
                position: 'ne'
            }, 
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
            
            grid: {
                hoverable: true
            }
        };

        var el = $(target);
                
            if (el.length) {
                $.plot(el, data, options );
            }
    }
    
    function donut(target, data) {
        var options = {
            colors: colors,
            
            series: {
                pie: {
                    show: true,  
                    innerRadius: .5, 
                    stroke: {
                        width: 4
                    }
                }
            }, 
                
            legend: {
                position: 'ne'
            }, 
            
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },
            
            grid: {
                hoverable: true
            }
        };
        
        var el = $(target);
                        
        if (el.length) {
            $.plot(el, data, options );
        }
    }
    
    
    /** 
    * - Please update for timezone support on charts
    */
    function line (target, data) {
        'use strict';

        var cleanToday = moment.utc().startOf('day'),
            todayPlusOne = moment.utc().startOf('day').add(1, 'day'),
            options,
            el = $(target);

        options = {
            colors: colors,
            series: {
                lines: { 
                    show: true, 
                    fill: true, 
                    lineWidth: 3, 
                    steps: false, 
                    fillColor: { colors: [{opacity: 0.4}, {opacity: 0}] } 
                },
                points: { 
                    show: true, 
                    radius: 3, 
                    fill: true
                }
            }, 
            legend: {
                position: 'ne'
            },
            tooltip: true,
            tooltipOpts: {
                content: '%s: %y'
            },

            xaxis: {
                mode: "time",
                minTickSize: [1, "hour"],
                min: cleanToday.toDate(),
                max: todayPlusOne.toDate(),
                twelveHourClock: true
            }, 
            grid: { borderWidth: 2, hoverable: true }
        };
            
        if (el.length) {
            $.plot(el, data, options );
        }
    }
}();
var $ = require('jQuery'),
    _ = require('Underscore');

var myModule = require('./myModule');
 

// base functions
base = (function($, _ ) {
    'use strict';

    var def = function(app) {
        var app = app;
        app.options = {};

        // setup touch for mobile
        app.options.uAgent = navigator.userAgent;
        app.options.interaction = app.options.uAgent.match(/(iPad|iPhone|iPod)/g) ? 'touchstart' : 'click';

        init.call(this);
    };

    var init = function() { 
        this.utils(); 
        this.module();   
    };

    def.prototype = { 

        utils: function() {
            $('body').addClass('mobile');

            // Target IE
            if (navigator.userAgent.indexOf('MSIE') >= 0 || navigator.userAgent.indexOf('Trident') >= 0) {
                document.getElementsByTagName("html")[0].className += ' ie';
            }

            if(Function('/*@cc_on return document.documentMode===10@*/')()){ 
                $('html').addClass('ie10');
            }  

            $(window).on('orientationchange', function() {
                if(window.orientation == 0) { 
                    // Portrait
                    $('body').removeClass('orientationchange'); 
                } else  {
                    // Landscape
                    $('body').addClass('orientationchange');  
                }
            });
            
        },

        module: function() { 
            $('#content').each(function() {
                //////////////////////////////////////////////////////// 
                /*
                we instantiate in this way so that we
                can access our methods from the frontend with jQuery
                like: `$('#content').data().myModule._methodName_();`
                */
                ////////////////////////////////////////////////////////
                $(this).data('myModule', new myModule(this));
            });
        }  

    };

    return def;

}).call(this, $, _);

module.exports = base; 
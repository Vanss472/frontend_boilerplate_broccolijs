/*jshint -W030 */

var jQuery = require('jquery');
var _ = require('Underscore'); 

myModule = (function($, _){
	'use strict';

	var def = function(el){
	 	this.$els = {
	 		item: el,
	 		trigger: '.my-module-trigger'
	 	};

	 	this.trigger = '<button class="button my-module-trigger">Click me, I do JavaScript</button>';

		this.options = {
			'bgColor' : '#d6d6d6',
			'target' : '#content .wrapper'
		};

		init.call(this);
	};

	var init = function() {
		this.setup();
		this.addColor();
	};

	def.prototype = {

		setup: function() {
			var self = this;
			$(this.options.target).append(this.trigger);
			$(this.$els.trigger).on('click', function() {
				self.toggle();
			});
		},

		toggle: function() {
			this.on ? this.reset() : this.addColor();
		},

		addColor: function() {
			$(this.$els.item).css('background-color', this.options.bgColor);
			this.on = true;
		},

		reset: function() {
			$(this.$els.item).css('background-color', '');
			this.on = false;
		}
	};

	return def;

})(jQuery, _);

module.exports = myModule;
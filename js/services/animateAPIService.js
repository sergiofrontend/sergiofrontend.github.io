app.service("animateElementAPI", function ($http) {

	this.animateElementInUP = function ($el) {
		$el.removeClass('animate-hidden');
		$el.addClass('animated fadeInUp');
	};
	this.animateElementOutUP = function($el) {
		$el.addClass('animate-hidden');
		$el.removeClass('animated fadeInUp');
	};
	this.animateElementInLEFT = function($el) {
		$el.removeClass('animate-hidden');
		$el.addClass('animated fadeInLeft');
	};
	this.animateElementOutLEFT = function($el) {
		$el.addClass('animate-hidden');
		$el.removeClass('animated fadeInLeft');
	};
	this.animateElementInRIGHT = function($el) {
		$el.removeClass('animate-hidden');
		$el.addClass('animated fadeInRight');
	};
	this.animateElementOutRIGHT = function($el) {
		$el.addClass('animate-hidden');
		$el.removeClass('animated fadeInRight');
	};
	this.animateElementInFADE = function($el) {
		$el.removeClass('animate-hidden');
		$el.addClass('animated fadeIn');
	};
	this.animateElementOutFADE = function($el) {
		$el.addClass('animate-hidden');
		$el.removeClass('animated fadeIn');
	};
	this.animateElementInZOOM = function($el) {
		$el.removeClass('animate-hidden');
		$el.addClass('animated zoomIn');
	};
	this.animateElementOutZOOM = function($el) {
		$el.addClass('animate-hidden');
		$el.removeClass('animated zoomIn');
	}
	this.animateElementInTADA = function($el) {
		$el.removeClass('animate-hidden');
		$el.addClass('animated tada');
	};
	this.animateElementOutTADA = function($el) {
		$el.addClass('animate-hidden');
		$el.removeClass('animated tada');
	}

});
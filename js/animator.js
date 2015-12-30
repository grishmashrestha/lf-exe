function Animator(element) {
	this.el = element;
	var that = this;
	var cssProperty = "margin-left";


	this.animate = function(cssProperty, value, duration) {
		var style = window.getComputedStyle(element);
		var initial = style.getPropertyValue(cssProperty);
		initial = parseInt(initial);
		
		var step = (value - initial) / (duration / 50);

		var counter = 0;
		var intervalId = setInterval(function() {
			counter++;
			var current = step * counter;
			element.style[cssProperty] = initial + current + 'px';
			
			if (counter >= duration/50)
				clearInterval(intervalId);
		}, 50);
	}

	this.stop = function(cssProperty, value, intervalId) {
		clearInterval(intervalId);
	}

	this.finish = function(cssProperty, value, intervalId) {
		clearInterval(intervalId);
		var initial = parseInt(style.getPropertyValue(cssProperty));
		element.style[cssProperty] = value + 'px';
	}

	this.scrollVertically = function(value, duration) {
		var initial = window.scrollY;

		var step = (value - initial) / (duration / 50);

		var counter = 0;
		var intervalId = setInterval(function() {
			counter++;
			var current = step * counter;
			window.scrollTo(0,initial + current);
			
			if (counter >= duration/50)
				clearInterval(intervalId);
		}, 50);
	}
}
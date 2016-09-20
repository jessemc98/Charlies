(function () {
	'use strict';
	//Cache DOM
	var $skewboxes = $('.skew-container');

	//Bind Events
	$($skewboxes).on('click', function() {
		var url = $(this).attr('data-url');
		$(this).children().addClass('active');
		setTimeout(function(){redirect(url);}, 500);
	})

	$(skewboxes).on('mouseenter', function() {
		$(this).children().addClass('active');
	})
	
	$(skewboxes).on('mouseleave', function() {
		$(this).children().removeClass('active');
	})

	//Redirects to the specified url
	function redirect(url) {
		window.location = url;
		window.y_offset = 0;
	};
})();
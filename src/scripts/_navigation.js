(function () {

	//Cache the dom
	var $navbar = $('.navigation');
	var $mob_menu = $($navbar).find('.mob-menu');
	var $menu = $($navbar).find('ul');
	var $close = $($navbar).find('.close');

	//Bind events
	$($mob_menu).on('click', toggleNav);

	$($close).on('click', toggleNav);

	// shows/hides navigation menu on mobile
	function toggleNav() {
		$($close).stop().slideToggle(200, 'easeInQuad');
		$($menu).stop().delay(100).slideToggle(1000, 'easeOutElastic');
	};

	//ensures menu is shown when window is resized
	$(window).resize(function() {
		if ($(window).width() >= 750) {
			$($menu).show();
		}
		else {
			$($menu).hide();
		}
	});

})();
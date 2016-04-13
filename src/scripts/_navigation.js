(function () {

	//Cache the dom
	var $navbar = $('.navigation');
	var $mob_menu = $($navbar).find('.mob-menu');
	var $menu = $($navbar).find('ul');
	var $close = $($navbar).find('.close');
	var $logo = $($navbar).find('#logo');
	var oldWidth = window.innerWidth;

	//Bind events
	$($mob_menu).on('click', toggleNav);

	$($close).on('click', toggleNav);

	$(window).on('scroll', stickyNav);

	$(window).on("resize", resized);

	// shows/hides navigation menu on mobile
	function toggleNav() {
		$($close).stop().slideToggle(200, 'easeInQuad');
		$($menu).stop().delay(100).slideToggle(1000, 'easeOutElastic');
		$($mob_menu).stop().fadeToggle();
	};

	//makes navbar stick to top on scroll
	function stickyNav() {
		var y_offset = window.pageYOffset;

        if (y_offset > 50) {
			// $($menu).css({'position':'fixed', 'top': '0'});
			$($logo).addClass('small');
		}
		else {
			// $($menu).css('position', 'initial');
			$($logo).removeClass('small');
		}
	};

	// function to run on resize
	// ensures menu is shown properly on resize
	function resized () {
		var newWidth = window.innerWidth;
		if (newWidth !== oldWidth) { //stops functiton running if resize wasnt horizontal
			$close.hide();
			if (newWidth >750) {
				$menu.show();
			}
			else {
				$menu.hide();
				$mob_menu.show();
			}
		}

		oldWidth = newWidth;
	}

})();
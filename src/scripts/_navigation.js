(function () {

	//Cache the dom
	var $navbar = $('.navigation');
	var $mob_menu = $($navbar).find('.mob-menu');
	var $menu = $($navbar).find('ul');
	var $close = $($navbar).find('.close');
	var $logo = $($navbar).find('#logo');

	//Bind events
	$($mob_menu).on('click', toggleNav);

	$($close).on('click', toggleNav);

	$(window).on('scroll', stickyNav);

	// shows/hides navigation menu on mobile
	function toggleNav() {
		$($close).stop().slideToggle(200, 'easeInQuad');
		$($menu).stop().delay(100).slideToggle(1000, 'easeOutElastic');
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

	//ensures menu is shown when window is resized
	var vw = $(window).width();

	$(window).resize(function() {
		if ($(window).width !== vw) {
			$($close).hide();
			if ($(window).width() >= 750) {
				$($menu).show();
			}
			else {
				$($menu).hide();
			}
		}
	});

})();
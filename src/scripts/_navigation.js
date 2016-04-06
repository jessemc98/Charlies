(function () {

	//Cache the dom
	var $navbar = $('.navigation');
	var $button = $($navbar).find('.mob-menu');
	var $menu = $($navbar).find('ul');

	//Bind events
	$($button).on('click', function(){
		$($menu).stop().slideToggle(350);
	});

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
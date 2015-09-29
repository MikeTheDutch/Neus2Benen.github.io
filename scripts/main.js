$(document).ready(function() {

	$('#fullpage').fullpage({
		menu: true,
		scrollingSpeed: 400,
		verticalCentered: true,
		fitToSection: true


	});

	$(window).trigger('resize');

});


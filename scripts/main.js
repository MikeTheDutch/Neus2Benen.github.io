$(document).ready(function() {

	$('#fullpage').fullpage({
		menu: true,
		scrollingSpeed: 450,
		verticalCentered: true,
		fitToSection: true


	});

	$(window).trigger('resize');

});


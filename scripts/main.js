$(document).ready(function() {

	$('#fullpage').fullpage({
		menu: true,
		scrollingSpeed: 500,
		verticalCentered: true,
		fitToSection: true
		
        
	});

	$(window).trigger('resize');

});


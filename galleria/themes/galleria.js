$(window).ready(updateGalleriaHeight);
$(window).resize(updateGalleriaHeight);

function updateGalleriaHeight() {
    var div = $('#galleria');
    var width = div.width();
    
    div.css('height', width * 0.63);
}

Galleria.loadTheme('galleria/themes/classic/galleria.classic.js');

Galleria.configure({
	transition: 'fade',
	preload: 2,
	imageCrop: false
});

Galleria.ready(function() {
	this.attachKeyboard({
		left: this.prev,
		right: this.next
	});
});

Galleria.run('#galleria', {
	autoplay: 2000,
	lightbox: true
});

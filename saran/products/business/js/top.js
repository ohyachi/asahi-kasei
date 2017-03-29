$(function(){
	$('.mainVisual').show();
	$('.mainVisual').wait(500).animate({opacity:1},700);	
	$('.mainVisual ul').wait(300).bxSlider({auto:true});	
	$('article section.productsMenu div > ul').flatHeights();
});



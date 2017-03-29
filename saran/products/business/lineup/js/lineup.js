// top
$(function(){
	$('ul.imgList li').wait(1000).flatHeights();
	$(window).on('load resize',function(){
		if($(window).width() < 768){
			$('.cpLogo').insertAfter('.cpAdopt').addClass('moved');
			$('.zlLogo').insertAfter('.zlAdopt').css('border-right','1px #fff solid').addClass('moved');
		}else{
			$('.cpLogo').insertAfter('.cpLogoPrev').removeClass('moved');
			$('.zlLogo').insertAfter('.zlLogoPrev').removeClass('moved');
			$('.moved').remove();
		}
		$('ul.imgList li').flatHeights();
	});
});

// table
$(function(){
	$(window).on('load resize',function(){
		if($(window).width() < 768 && !($('.cloneTo').length)){
			var cloneElm = $('.flowTable table').clone();
			var elmWidth = $('.flowTable table').width();
			var cloneWidth = $('.flowTable table tr:first-child th').outerWidth();
			var cloneTo = $('.cloneTo');
			$('.flowTable').append('<div class="cloneTo"><div class="inner"></div></div>');
			$(cloneElm).appendTo('.cloneTo');
			$('.flowTable table').wrap('<div class="flowWrap"></div>');
			$('.cloneTo table').unwrap();
			$('.flowTable').css({position:'relative'});
			$('.flowWrap').css({position:'relative',overflow:'auto'});
			$('.cloneTo').css({width:cloneWidth+1,overflow:'hidden',position:'absolute',left:0,top:0});
			$('.cloneTo table').css({width:elmWidth});
		}else{
			if((navigator.userAgent.indexOf('iPhone') >0 || navigator.userAgent.indexOf('iPod') > 0  || navigator.userAgent.indexOf('iPad') > 0 || navigator.userAgent.indexOf('Android') > 0)){
				
			}else{
				$('.cloneTo').remove();
				if($('.flowWrap').length){
					$('.flowTable table').unwrap();
				}
			}
		}
	});
});




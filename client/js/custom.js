(function($) { 
		  
$(document).ready(function(){
	$('.slide').prepend('<div class="patternOverlay"></div>');	
	
	$('.skillbar').each(function(){
		$(this).find('.skillbar-bar').animate({
			width:$(this).attr('data-percent')
		},6000);
	});
	
	$('.skillbar').each(function(){
		$(this).find('.skill-bar-percent').animate({
			left:$(this).attr('data-percent')
		},6000);
	});
	
	$('.skillbar').each(function(){
		$(this).find('.skill-bar-percent').text($(this).attr('data-percent'));
	});
	
	if($(window).width()>767){
		$('.navbar-wrapper').animate({
			opacity:0
		},200);
		$('.navbar-wrapper').addClass('default-menu');
		
	}	
	
	$('#nav-show').click(function(x){
		x.preventDefault();
		$('.wrapper').removeClass('noGap');
		$('.navbar-wrapper').animate({
			opacity:1
		},200);
		$('.navbar-wrapper').removeClass('default-menu');
		$(this).fadeOut();
	});
	
	$('.closeMenu').click(function(x){
		x.preventDefault();
		$('.navbar-wrapper').animate({
			opacity:0
		},50,function(){$('.navbar-wrapper').addClass('default-menu');});
		
		$('#nav-show').fadeIn();
	});

		var crotation;
		var rotateto = 0;
		var halfrotation = 180;
		var index = 0;
		
		function tcRotate(deg){  
				$('#skill-carousel-container').css({
						'transform'         : 'rotateY('+ deg +'deg)',
						'-webkit-transform' : 'rotateY('+ deg +'deg)'
				});
		}

		function toggleOpacityWithIndex(index){
			const $items = $('item');
			for(let i = 0; i < $items.length; i++){
				let $el = $items[i];
				if(i === index){
					$($el).fadeTo('slow','1.0');
				}else{
					$($el).fadeTo('slow','0.1');
				}
			}
		}

		function toggleOpacity(name){
			const $items = $('item');
			for(let i = 0; i < $items.length; i++){
				let $el = $items[i];
				if(name === $($el).text()){
					$($el).fadeTo('slow','1.0');
					index = i;
				}else{
					$($el).fadeTo('slow','0.1');
				}
			}
		}

		(function(){
			const $item =  $('item')[index];
				$($item).css('opacity','1.0');
		})()
		
		
		$('item').on('click', function(e){
				e.preventDefault();
				toggleOpacity($(this).text());
				crotation = $('#skill-carousel-container').attr('tcc-rotation');
				rotation = $(this).attr('tc-rotation');       
				rotateto = crotation - rotation;
				tcRotate(rotateto);
				crotation = rotateto;
		});
		
		$('.tc-next').on('click', function(e){
				e.preventDefault();
				rotateto -= 60;
				tcRotate(rotateto);
				index = index + 1;
				if(index > 5){
					index = 0;
				}
				toggleOpacityWithIndex(index);
				
		});
		$('.tc-prev').on('click', function(e){
				e.preventDefault();
				rotateto += 60;
				tcRotate(rotateto);
				index = index - 1;
				if(index < -5){
					index = 0;
				}
				toggleOpacityWithIndex(index);
				
		});
	
	
	
});	


	
/*===========================================================*/
	/*	Preloader 
/*===========================================================*/	
//<![CDATA[
	$(window).load(function() { // makes sure the whole site is loaded
		$("#status").fadeOut(); // will first fade out the loading animation
		$("#preloader").delay(1000).fadeOut("slow"); // will fade out the white DIV that covers the website.
	})
//]]>
		  
// for mobile nav js	
$(window).load(function(){
	$('button.navbar-toggle').click(function(){
		$(this).toggleClass('active');
		$('.navbar-collapse').slideToggle();										 
	});					
});
// for banner height js
var windowWidth = $(window).width();
var windowHeight =$(window).height();
$('.banner').css({'height':windowHeight });


// for portfoli filter jquary
$(window).load(function(){
    var $container = $('.portfolioContainer');
    $container.isotope({
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 



// for portfoli lightbox jquary
jQuery(function() {
	var $chosenSheet,
	$stylesheets = $( "a[id^=theme-]" );
	
	// run rlightbox
	$( ".lb" ).rlightbox();
	$( ".lb_title-overwritten" ).rlightbox({overwriteTitle: true});
});
});

// Somth page scroll
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top -16
        }, 1000);
        return false;
      }
    }
  });
});


// Testimonial slider
$(window).load(function(){
  $('.flexslider').flexslider({
	animation: "fade",
	animationLoop: true,
	slideshow: true,
	pauseOnAction: false,
	slideshowSpeed: 7000,
	controlNav: true,
	start: function(slider){
	  $('body').removeClass('loading');
	}
  });
});


// we worked slider
$(window).load(function(){
      $('.worklogo').flexslider({
        animation: "slide",
		slideshow: false,
        itemWidth: 210,
        itemMargin: 5,
        
      });
    });

// Skill set 


}(jQuery));

/* 
	home/scripts.js
	Copyright (C) 2012 David Yamnitsky
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation 
	files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, 
	modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the 
	Software is furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE 
	WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS 
	OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
	OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

// SlideToUnlock Plugin

(function($) {
	
	$.fn.slidetounlock = function (method) {
		
		var methods = {
			
			init : function (options) {

				var settings = $.extend( {
				  'background-src' 	: '',
				  'slider-src'		: '',
				}, options);
	
				return this.each(function() {
					
					$(this).find('.slidetounlock-slider').css('background-image','url("' + settings['slider-src'] + '")');
					
					$(this).find('.slidetounlock-slider').draggable({
						axis: 'x',
						containment: 'parent',
						drag: function(event, ui) {
							if (ui.position.left > 202) {
								ui.position.left = 202;
							} else if (ui.position.left < 0) {
								ui.position.left = 0;
							}
							var val = Math.max(0.0, Math.min(1.0, 1.0 - (ui.position.left / 100.0)));
							$(this).parent().find('.slidetounlock-label').css( 'opacity', val );
						},
						stop: function(event, ui) {
							if ( ui.position.left >= 202 ) {
								$(this).parent().trigger('unlock');
							} else {
								$(this).animate({
									left: 0
								});
								$(this).parent().find('.slidetounlock-label').animate({ opacity: 1.0 });
							}
						}
					});
			
				});
				
			},
			
			reset : function (callback) {
				$(this).find('.slidetounlock-slider').animate({ left: 0 });
				$(this).find('.slidetounlock-label').animate({ opacity: 1.0 }, function() {
					if (callback)
						callback.call($(this).parent());
				});
				
			}
			
		};
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('method ' +  method + ' does not exist in ' + 'jQuery.slidetounlock');
		}
	};

})( jQuery );

// TapToLoad Plugin

(function($){
	
	$.fn.taptoload = function (method) {
		
		var methods = {
			
			init : function (options) {

				var settings = $.extend( {
				}, options);
	
				return this.each(function() {

					var $this = $(this);
					
					if (!touch_device && ($this.attr('data-force') != 'yes')) {
						
						var imageObj = new Image();
						imageObj.className += 'taptoload-image';
						imageObj.style.display = 'inherit';
						imageObj.src = $this.attr('data-image-src');
						$this.append(imageObj);
						
						$this.find('.taptoload-label').css('display','none');
						$this.css('max-width','none');
						$this.find('img').css('visibility','visible');
						
					}
					else {
					
						$this.addClass('taptoload-background');
						
						var ttlOuter = document.createElement('div');
						ttlOuter.className += 'taptoload-outer';
						$this.append(ttlOuter);
						
						var ttlInner = document.createElement('div');
						ttlInner.className += 'taptoload-inner';
						$this.find('.taptoload-outer').append(ttlInner);
						
						$this.find('.taptoload-label').moveElementTo($this.find('.taptoload-inner'));			
						$this.find('.taptoload-label').css('visibility','visible');
						
						spinnerObj = new Image();
						spinnerObj.className += 'taptoload-spinner';
						$this.find('.taptoload-inner').append(spinnerObj);
						$this.find('.taptoload-spinner').attr('src',$this.attr('data-spinner-src'));
						
						$this.on('click', function() {
							if ($this.attr('data-tapped') != 'yes') {
								$this.attr('data-tapped', 'yes');
								
								var imageObj = new Image();
								imageObj.className += 'taptoload-image';
								$this.find('.taptoload-outer').append(imageObj);
								$this.find('.taptoload-image').attr('src',$this.attr('data-image-src'));
								$this.find('.taptoload-image').attr('onload', displayImage );
								
								var timerFired = false;
								setTimeout( function(){ timerFired = true; }, 1000 );
								
								$this.find('.taptoload-spinner').css( {opacity:0.0, visibility:'visible'} ).animate( { opacity:1.0 }, 'slow' );
								$this.find('.taptoload-inner').find('.taptoload-label').fadeOut('slow');
								
								function displayImage() {	
									if (!timerFired) {
										setTimeout( displayImage_internal, 1000 );
									}
									else {
										displayImage_internal();
									}
									
									function displayImage_internal() {
										$this.css('max-width','none');
										$this.css('width','100%');
										$this.find('.taptoload-image').css( {display: 'inherit', opacity:0.0, visibility:'visible'} ).animate( { opacity:1.0 }, 'slow' );
										$this.find('.taptoload-inner').fadeOut('slow');
										$this.removeClass('taptoload-background');
										$this.find('.taptoload-image').on('click', function() {
											window.location.href = $this.attr('data-image-src');
										});
									}
								}
							}
						});
						
					}
			
				});
				
			}
			
		};
		
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('method ' +  method + ' does not exist in ' + 'jQuery.taptoload');
		}
		
	};
	
	$.fn.moveElementTo = function(selector){
        return this.each(function(){
            var cl = $(this).clone();
            $(cl).appendTo(selector);
            $(this).remove();
        });
    };
	
	touch_device = ('ontouchstart' in document.documentElement);
	
})( jQuery );

$(function(){
	
	//On touch devices, make the navbar not follow scrolling,
	//because this looks bad when the user pinches to zoom.
	if (jQuery.browser.touch)
		$('.navbar-fixed-top').addClass('navbar-stay');
	
	//Setup subnav
	processScroll();
	$(window).scroll(function() { processScroll() });
	
	//Setup taptoload views
	$('.taptoload').taptoload();
	
	//Setup pretty print
	window.prettyPrint && prettyPrint();
	
});

$('.carousel-inner').on('click', function() {
	if ($('.carousel').find('.carousel-control').css('display') != 'none')
		$('.carousel').find('.carousel-control').fadeOut();
	else
		$('.carousel').find('.carousel-control').fadeIn();
});

$(function () {
	$('[rel=tooltiptop]').tooltip({placement:'top'});
	$('[rel=tooltipbottom]').tooltip({placement:'bottom'});
	$('[rel=tooltipleft]').tooltip({placement:'left'});
	$('[rel=tooltipright]').tooltip({placement:'right'});
	$('[rel=popovertop]').popover({placement:'top'});
	$('[rel=popoverbottom]').popover({placement:'bottom'});
	$('[rel=popoverleft]').popover({placement:'left'});
	$('[rel=popoverright]').popover({placement:'right'});
});

var navTop = $('.subnav').length && $('.subnav').offset().top - 38;
var subnavFixed = 0;

function subnavClicked(anchor) {
	var offset = 5;
	if ($('#navbar').hasClass('navbar-stay'))
		offset = 3;
	else if (window.innerWidth <= 558)
		offset = 3;
	else if (jQuery.browser.touch && window.innerWidth > 979)
		offset = 50;
	else if (window.innerWidth > 979)
		offset = subnavFixed ? 85 : 89;
	$('html,body').animate({scrollTop: $("#"+anchor).offset().top - offset},'slow');
}

function processScroll() {
	if (jQuery.browser.touch) return;
	var i, scrollTop = $(window).scrollTop();
	if (scrollTop >= navTop && !subnavFixed) {
		subnavFixed = 1;
		$('.subnav').addClass('subnav-fixed');
		$('.subnav-placeholder').removeClass('display-none');
	} else if (scrollTop <= navTop && subnavFixed) {
		subnavFixed = 0;
		$('.subnav').removeClass('subnav-fixed');
		$('.subnav-placeholder').addClass('display-none');
	}
};

$(document).ready(function() {
    $(".copycat").keyup(function() {
        $(".copycat").not($(this)).val($(this).val());
    });
});

(function($){
	jQuery.browser.touch = ('ontouchstart' in document.documentElement);
})( jQuery );

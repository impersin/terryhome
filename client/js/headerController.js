jQuery(function($) {
  $(document).ready( function() {
    //enabling stickUp on the '.navbar-wrapper' class
    $('.navbar-wrapper').stickUp({
      parts: {
        0: 'banner',
        1: 'aboutus',
        2: 'skillset',
        3: 'experience',
        4: 'education',
        5: 'ourwork',
        6: 'contact'
      },
      itemClass: 'menuItem',
      itemHover: 'active',
      topMargin: 'auto'
      });

      $('#banner').superslides({
        animation: 'fade',
        play: 5000
      });
    });
  
  });
$(window).load(function() {
  $( ".carousel-inner .item:first-child" ).addClass("active")
     // + any other carousel related stuff that has to wait for the images to complete loading
     $('.carousel').carousel({
         interval: 3500 //changes the speed
     })
});

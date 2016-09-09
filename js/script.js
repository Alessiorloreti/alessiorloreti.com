$(function() {

  var images = []
  $(".image").each(function(){
    var img = $(this).find("a").attr("href");
    images.push(img);
  })
  $(".item").each(function(){
    var img = $(this).find(".fill")[0].style.backgroundImage.slice(4,-1);
    images.push(img);
  })
  $(".blog-picture").each(function(){
    var img = $(this).attr("src");
    images.push(img);
  })

  $.fn.preload = function() {
    this.each(function(){
        $('<img/>').src = this;
    });
  }
  $(images).preload();

  $( ".carousel-inner .item:first-child" ).addClass("active")
  $('.carousel').carousel({ interval: 3500 });

  var categories = []

  //find all categories
  $(".image").each(function(){
    var cat = $(this).find("a").data("category")
    cat = cat.substr(0,1).toUpperCase() + cat.substr(1);
    if (categories.indexOf(cat) == -1 ){ categories.push(cat) }
  });

  //create li for each category
  $.each(categories.sort(), function(i,x){
    $(".categories").append($("<button>").addClass("cat-btn").attr("id", x).text(x));
  })

  var $btns = $('.cat-btn').click(function() {
    if (this.id == 'all') {
      $('#parent > div').fadeIn(450);
    } else {
      var $el = $('.' + this.id).fadeIn(450);
      $('#parent > div').not($el).hide();
    }
    $btns.removeClass('active');
    if(this.id != 'all') {$(this).addClass('active');}
  })

});

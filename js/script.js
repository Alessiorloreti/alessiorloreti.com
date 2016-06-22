$(function() {
  function preloadImage(url)
  {
    var img=new Image();
    img.src=url;
  }
  $(".image").each(function(){
    var img = $(this).find("a").attr("href")
    preloadImage(img);
  });

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

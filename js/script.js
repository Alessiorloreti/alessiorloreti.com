$(window).load(function() {
  $( ".carousel-inner .item:first-child" ).addClass("active")
  $('.carousel').carousel({ interval: 3500 });

  var categories = []

  //find all categories
  $(".image").each(function(){
    var cat = $(this).find("a").data("category")
    if (categories.indexOf(cat) == -1 ){ categories.push(cat) }
  });

  //create li for each category
  $.each(categories.sort(), function(i,x){
    $(".categories").append($("<button>").addClass("cat-btn").attr("id", x).text(x));
  })

  console.log(categories.sort());

  var $btns = $('.cat-btn').click(function() {
    console.log(this.id);
    if (this.id == 'all') {
      $('#parent > div').fadeIn(450);
    } else {
      var $el = $('.' + this.id).fadeIn(450);
      $('#parent > div').not($el).hide();
    }
    $btns.removeClass('active');
    $(this).addClass('active');
  })

});

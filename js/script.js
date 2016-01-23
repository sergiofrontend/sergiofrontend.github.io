(function($) {
    "use strict";

   $('body').scrollspy({target: ".navbar, .btn-scroll", offset: 50}); 

    
    
// Add smooth scrolling on all links inside the navbar
  $("#myNavbar a, #myNavbar-mobile a, .btn-scroll, .top-page a").on('click', function(event) {

        $('a.active').removeClass('active');
        $(this).addClass('active');
    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){
   
      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
       
    });

  });




  //Ativa o botao do menu relativamente ao scroll
  $(function() {

      var links = $("#myNavbar a, #myNavbar-mobile a");
      $(window).scroll(function() {
        var topScroll = $(window).scrollTop();
        links.each(function() {
          var href       = $(this).attr('href');
          var el         = $(href);
          var posSection = el.offset().top;
          var hSection   = el.height();

          if(posSection <= topScroll && (posSection + hSection) > topScroll){
            links.removeClass("active");
            $(this).addClass("active");        
          }
          else 
          {
            $(this).removeClass("active");
          }
        })

      })
    });


})(jQuery);





//***************************************************************************************************************
//*************************************   NAV   *****************************************************************
//***************************************************************************************************************

//NAV
    

    var ja_obj = {
        mobile: false,
        tablet: false
        };


var menuAnim = function(){
                var $window = $(window);
                var ecraW = $window.width();
                if (ecraW < 768) 
                {
                        //OPEN MENU MOBILE
                    if ( !ja_obj.mobile) {

                        $('#menu-mobile-all #icon-mobile').click(function(){
                            $(this).toggleClass('open');
                            $("#menu-mobile-all #myNavbar-mobile").removeClass('hide_menu').toggleClass('open-menu');
                        });

                        $("#menu-mobile-all #myNavbar-mobile a").click(function(){
                            $("#menu-mobile-all #icon-mobile").toggleClass('open');
                            $("#menu-mobile-all #myNavbar-mobile").removeClass('hide_menu').toggleClass('open-menu');
                        });

                        ja_obj.mobile = true;
                        console.log("ENTROU no mobile");
                    }

                }
                else if (ecraW >= 768) 
                {
                        //OPEN MENU TABLET
                    if ( !ja_obj.tablet) {
                        var $tabnav = $("#menu-tablet-all #myNavbar");

                        $('#menu-tablet-all #icon-tablet').click(function(){

                            $(this).toggleClass('open');
                            $tabnav.removeClass('open-menu').toggleClass('hide_menu');
                        });


                        $tabnav.addClass("hide_menu");
                        
                        $tabnav.hover(
                            function() {
                              $( this ).removeClass("hide_menu").removeClass('open-menu');
                              $('#icon-tablet').addClass('open');
                            }, 
                            function() {
                              $( this ).addClass("hide_menu");
                              $('#icon-tablet').removeClass('open').removeClass('open-menu');
                            }
                        ); 

                        $("section").click(function(){
                           $tabnav.addClass("hide_menu").removeClass('open-menu');
                            $('#icon-tablet').removeClass('open');
                        });

                        ja_obj.tablet = true;
                        console.log("ENTROU na tablet");
                    }
                };
            };

//***************************************************************************************************************
//*************************************   ANIM   ***************************************************************
//***************************************************************************************************************

var animhome = function(){
                var obj_animhome = {
                    box: "box-keyframes 0.5s linear 1s 1 normal forwards",
                    boy: "boy-keyframes 1s linear 1s 1 normal forwards",
                    name1: "nome1-keyframes 0.5s linear 1s 1 normal forwards",
                    name2: "nome2-keyframes 1s linear 1s 1 normal forwards",
                    name3: "nome3-keyframes 1s linear 1s 1 normal forwards"
                }

                for (item in obj_animhome) {
                    $('#anim-home #' + [item]).css({"animation": obj_animhome[item]});
                }
                $("#home .btn-scroll").css("opacity", "1");
                /*$.each(obj_animhome, function(i, val){
                    $('#anim-home #' + i).css({"animation": val});
                });
                */ 
            };

//gallery

/*
$(".btn-open").click(function(event){
    var box = this.hash.replace("#","");
    console.log(box);
    event.preventDefault();
    var link = $("#p_box." + box + " .p_img");
    $(link).addClass("click");
    setTimeout(function(){
        $("#p_box." + box + " .p_desc").addClass("click");
    },200);
    $("#p_box." + box).stop(true,true).delay(1000).animate({height: "400px"});
    $("#p_box." + box + " .p_desc").stop(true,true).delay(1000).animate({height: "400px"});
    event.preventDefault();
});

$(".btn-close").click(function(event){
    event.preventDefault();
    var box = this.hash.replace("#","");
    event.preventDefault();
    var link = $("#p_box." + box + " .p_img");
    $("#p_box." + box).stop(true,true).animate({height: "150px"});
    $("#p_box." + box + " .p_desc").stop(true,true).animate({height: "150px"});
    setTimeout(function(){
        $(link).removeClass("click");
        setTimeout(function(){
            $("#p_box." + box + " .p_desc").removeClass("click");
        },300);
    },500);
    event.preventDefault();

});*/
//***************************************************************************************************************
//*************************************   Outras   ***********************************************************
//***************************************************************************************************************

setTimeout(function(){
        $(".btn-scroll1").css("display","block").addClass("animated zoomIn");
    },1500);

$(".btn-scroll1").click(function(event){
    //para o efeito do butao
    event.preventDefault();

    // passa o valor do href para a variavel
    var hash = this.hash;
    //executa a animacao do primeiro span
    $(".btn-scroll1 span:nth-child(1)")
        .animate({left: "0px"})
        .delay(500)
        .animate({top: "150px",opacity: 0},"normal", function(){
           //calback da animacao que faz o movimento da pagina
            $('html, body').animate({
              scrollTop: $(hash).offset().top
            }, 800, function(){
              // Add hash (#) to URL when done scrolling (default click behavior)
              window.location.hash = hash;
            });
        });
    //animacao do segundo span
    $(".btn-scroll1 span:nth-child(2)")
        .animate({width: "0px", left: "10px"});   


    $(".btn-scroll1 span:nth-child(3)")
        .animate({left: "0px"},"ease-in-out", function(){
        
            $(".btn-scroll1 span:nth-child(3)").css({'-webkit-transform' : 'rotate(360deg)',
                 '-moz-transform' : 'rotate(90deg)',
                 '-ms-transform' : 'rotate(90deg)',
                 'transform' : 'rotate(90deg)'});
            setTimeout(function(){
                $(".btn-scroll1 span:nth-child(3)")
                    .animate({top: "150px",opacity: 0})
            },500);
        });
        
});



    //altura das section
    var ecraH = $(window).height();
    var ecraW = $(window).width();
        $("section#home").css({"height": ecraH + "px"});

//    console.log(ecraH);
    


$(document).ready(function(){

    //ativa animacoes
    new WOW().init();
    //MENU
    menuAnim();

   //HOME
   animhome();

    setTimeout(function(){

    $('.thumbnail').click(function(event){
        event.preventDefault();
        $('.modal-body').empty();
        var title = $(this).parent('a').attr("title");
        $('.modal-title').html(title);
        $($(this).parents('div').html()).appendTo('.modal-body');
        $('#myModal').modal({show:true});
    });

    /* blur on modal open, unblur on close */
    $('#myModal').on('show.bs.modal', function () {
       $('.col-6,.row .thumbnail').addClass('blur');
    })

    $('#myModal').on('hide.bs.modal', function () {
       $('.col-6,.row .thumbnail').removeClass('blur');
    })

    },100); 


});
 
$(document).scroll(function(){

});






//##################### SECTIONS ###################################
/*
var angle;
var bgShadow = function(){

    angle = Math.atan2($(window).width(), $(window).height());
    
    //console.log(angle);
    $('.bg-shadow').css('transform', 'skew(' + angle + 'rad)').show();
    $('.bg-shadow-yellow').css('transform', 'skew(-' + angle + 'rad)').show();
};

//executa a funcao
bgShadow();
*/

//##################### RESIZE ###################################

 $(window).resize(function(){
    var ecraH = $(window).height();
    var ecraW = $(window).width();
    console.log("resize");
    //redefine a altura das seccoes
    $("section#home").css({"height": ecraH + "px"});
    
    //redefine as shadows das seccoes
   // bgShadow()

    //MENU
    menuAnim();
  });

/*
setInterval(function(){
    var $sample = $("#myNavbar");
    if($sample.is(":hover")) {
       $sample.css("background", "yellow");
    }
    else {
       $sample.css("background", "");
    }
}, 200);
*/






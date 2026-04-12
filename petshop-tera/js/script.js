$(function() {
    // slick
    $(".main_img").slick({
        autoplay: true,
        arrows: false,
        pauiseOnFocus: false,
        pauseOnHover: false,
        // dots: true,
        fade: true,
        speed: 3000,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: "500px",
        // infinite: true,
    });

    // MagnificPopup（テラの想い）
    $("#pet_shop figure a").magnificPopup({
        type: "image",
        gallery: {							//  この部分を追記します  
            enabled: true,			//  この部分を追記します  
        },											//  この部分を追記します  
    });

    // MagnificPopup（ランキング）
    $("#ranking li a").magnificPopup({
        type: "image",
        gallery: {							//  この部分を追記します  
            enabled: true,			//  この部分を追記します  
        },											//  この部分を追記します  
    });

    // hamburger-menu
    $(".nav_btn").on("click",function() {
      $("body").toggleClass("menu-open");
    });
    $("nav").on("click", function() {
      $("body").removeClass("menu-open");
    });

    // $(document).on("click", ".menu-open nav", function() {
    //   $(".nav_btn").trigger("click");
    // });
});

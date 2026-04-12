$(function () {
  // --------------------------------------------------
  // 1. 基本設定 (Slick, Inview)
  // --------------------------------------------------
  
  // Slickスライダー
  $(".main_img ul").slick({
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
    fade: true,
    cssEase: "linear",
    pauseOnFocus: false,
    pauseOnHover: false,
    speed: 7000,
  });

  // 要素のフェードイン表示
  $(".show").on("inview", function () {
    $(this).addClass("fade-in");
  });

  // --------------------------------------------------
  // 2. スムーススクロール
  // --------------------------------------------------
  $('a[href^="#"]').click(function () {
    var href = $(this).attr('href');
    var target = $(href);
    
    // ヘッダーの高さ分ずらす設定
    // PC(>820px)なら183px、スマホ(<=820px)なら固定ヘッダー分の70px
    var headerHeight = $(window).width() > 820 ? 140 : 70; 

    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top - headerHeight
      }, 500);
      
      // スマホでメニューが開いていたら閉じる
      if ($("body").hasClass("menu-open")) {
        $(".nav-button").trigger("click");
      }
      return false;
    }
  });

  // --------------------------------------------------
  // 3. ハンバーガーメニューの開閉
  // --------------------------------------------------
  $(".nav-button").on("click", function () {
    $("body").toggleClass("menu-open");
  });

  $(document).on('click', '.menu-open nav', function () {
    $('.nav-button').trigger('click');
  });

  // --------------------------------------------------
  // 4. PC用スクロール連動 (スマホでは実行しない)
  // --------------------------------------------------
  
  // 要素の取得
  var $nav = $("#nav");
  var $logo = $(".logo");
  var $logoImg = $(".logo-imag");
  var navTop = $nav.offset().top;

  $(window).scroll(function () {
    var windowWidth = $(window).width();

    // ■ PC表示 (821px以上) の場合のみ実行
    if (windowWidth > 820) {
      var currentScroll = $(this).scrollTop();

      if (currentScroll >= navTop) {
        $nav.css({ "position": "fixed", "top": "82px" });
        $logo.css({ "position": "fixed", "top": "208px", "background": "#ebd9a9" });
        $logoImg.css("width", "100px");
      } else {
        $nav.css({ "position": "", "top": "" });
        $logo.css({ "position": "", "top": "", "background": "" });
        $logoImg.css("width", "200px");
      }
    } 
    // ■ スマホ表示 (820px以下) の場合
    else {
      // JSによるスタイル操作をリセット（CSSの固定設定を優先させるため）
      $nav.css({ "position": "", "top": "" });
      $logo.css({ "position": "", "top": "", "background": "" });
      $logoImg.css("width", "");
    }
  });
});
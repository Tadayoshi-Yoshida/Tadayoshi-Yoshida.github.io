$(function () {
  // 1. トップイメージのカルーセル初期化（変更なし）
  $('.slide_img').slick({
    fade: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    pauseOnFocus: false,
  });

  $('.slide').slick({
    dots: false,         // ドット（ページネーション）を表示
    infinite: true,     // 無限ループ
    speed: 500,         // アニメーションのスピード
    slidesToShow: 1,    // 一度に表示するスライド数
    centerMode: true,   // 表示中のスライドを中央に配置
    variableWidth: true, // スライドの幅を可変にする
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
  });

  
  // navとスライダー
  $('.scroll-container').on('scroll', function () {
    // 現在のスクロール量を取得
    const scrollTop = $(this).scrollTop();
    
    // 画面の高さ（メインビジュアル1枚分）を取得
    // これを超えたらメニューを表示するという基準にします
    const windowHeight = $(window).height();

    // ▼▼ メニューの表示切り替え処理 ▼▼
    // スクロール量が画面の高さ（メインビジュアル）を超えたら表示
    if (scrollTop > windowHeight) { 
      $('#nav_side').fadeIn(); // ふわっと表示（jQueryの機能を使用）
      // $('#nav_side').addClass('nav_side-show'); // パッと表示したい場合はこちら
      $('.nav-button').fadeIn(); // ふわっと表示（jQueryの機能を使用）
      $('.logo-wrap').fadeIn(); // ふわっと表示（jQueryの機能
      $('.main-logo').fadeIn(); // ふわっと表示（jQueryの機能
    } else {
      $('#nav_side').fadeOut(); // ふわっと非表示
      // $('#nav_side').removeClass('nav_side-show'); // パッと消したい場合はこちら
      $('.nav-button').fadeOut(); // ふわっと非表示
      $('.logo-wrap').fadeOut(); // ふわっと非表示
      $('.main-logo').fadeOut(); // ふわっと非表示
    }

    // #aboutセクションの上端の座標を取得
    // .position() は親要素からの相対位置を取得します
    const aboutTop = $('#about').position().top;    
    // ヘッダー（ビューポートの高さ）分を考慮して判定
    // スクロール量がaboutセクションの少し手前に達したら
    if (scrollTop > aboutTop / 2) {
      $('body').addClass('is-scrolled');
    } else {
      $('body').removeClass('is-scrolled');
    }
  });

  // MagnificPopup
  // プラグインの設定
	$(".photo-gallery a").magnificPopup({
		type: "image",
        gallery: {
        enabled: true,
     	},
	});
    $(".photo-gra a").magnificPopup({
		type: "image",
        gallery: {
        enabled: true,
        },
	});
    $(".clothes_wrap a").magnificPopup({
		type: "image",
        gallery: {
        enabled: true,
        },
	});
	
	// ハンバーガーメニュー
	// .nav-buttonをクリックした時の設定
	$(".nav-button").on("click", function() {
		// <body>にクラス名[menu-open]を追加・削除
		$("body").toggleClass("menu-open");
	});
	// メニューをクリックした時の設定
	$(document).on("click", ".menu-open nav", function() {
		// .nav-buttonをクリックさせる
		$(".nav-button").trigger("click");
	}); 
});

// matchHeight
$(window).on('load', function() {
  $(".matchHeight").matchHeight();
  // $(".matchHeight1").matchHeight();
  $(".matchHeight2").matchHeight();

});

// ハンバーガーメニュー
$(function() {
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

// ページリロード
$(function() {
  // 1. ブレイクポイントの設定（CSSのメディアクエリに合わせて 940 に設定）
  const breakpoint = 639;
  
  // 2. ページ読み込み時の画面がモバイルサイズ（940px以下）かどうかを判定して保存
  let isMobile = $(window).width() <= breakpoint;
  let resizeTimer;

  $(window).on('resize', function() {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(function() {
      // リサイズ後の画面がモバイルサイズかどうかを再度判定
      let currentIsMobile = $(window).width() <= breakpoint;

      // 3. PCサイズ⇔スマホサイズ の境界線をまたいだ時だけリロードする
      if (isMobile !== currentIsMobile) {
        window.location.reload();
      }
    }, 200);
  });
});

// 画像切り替え
$(window).on('load resize', function(){
  var width = $(window).width();
  var border = 640;

  if( width <  border){
    $(".toggleImg").each(function(){
      $(this).attr("src", $(this).attr("src").replace("_pc","_sp"));
      $("#arch").arctext({
        radius : 300,
      });
    })
  } else {
  	$(".toggleImg").each(function(){
      $(this).attr("src", $(this).attr("src").replace("_sp","_pc"));
    })
  }
});
$(window).on('load resize', function(){
  var width = $(window).width();
  var border = 640;

  if( width <  border){
    $(".toggleImg li span").each(function(e){
      var bg = $(this).css('background-image');
      bg = bg.replace("_pc","_sp");
      $(this).css('background-image',bg);
    })
  } else {
    $(".toggleImg li span").each(function(e){
      var bg = $(this).css('background-image');
      bg = bg.replace("_sp","_pc");
      $(this).css('background-image',bg);
    })
  }
});

//logoの表示
$(window).on('load',function(){
  $("#splash").delay(1500).fadeOut('slow');//ローディング画面を1.5秒（1500ms）待機してからフェードアウト
  $("#splash_logo").delay(1200).fadeOut('slow');//ロゴを1.2秒（1200ms）待機してからフェードアウト
});



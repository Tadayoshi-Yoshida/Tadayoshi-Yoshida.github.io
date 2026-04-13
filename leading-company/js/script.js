// slick-slider
$(function () {
  $(".slider")
    // 最初のスライドに"add-animation"のclassを付ける(data-slick-index="0"が最初のスライドを指す)
    .on("init", function () {
      $('.slick-slide[data-slick-index="0"]').addClass("add-animation");
    })
    // 通常のオプション
    .slick({
      autoplay: true, // 自動再生ON
      fade: true, // フェードON
      arrows: false, // 矢印OFF
      speed: 2000, // スライド、フェードアニメーションの速度2000ミリ秒
      autoplaySpeed: 4000, // 自動再生速度4000ミリ秒
      pauseOnFocus: false, // フォーカスで一時停止OFF
      pauseOnHover: false, // マウスホバーで一時停止OFF
    })
    .on({
      // スライドが移動する前に発生するイベント
      beforeChange: function (event, slick, currentSlide, nextSlide) {
        // 表示されているスライドに"add-animation"のclassをつける
        $(".slick-slide", this).eq(nextSlide).addClass("add-animation");
        // あとで"add-animation"のclassを消すための"remove-animation"classを付ける
        $(".slick-slide", this).eq(currentSlide).addClass("remove-animation");
      },
      // スライドが移動した後に発生するイベント
      afterChange: function () {
        // 表示していないスライドはアニメーションのclassを外す
        $(".remove-animation", this).removeClass(
          "remove-animation add-animation"
        );
      },
    });

    // ハンバーガーメニュー
    // .nav-button をクリックした時の設定
	  $(".nav-button").on("click",function() {
			  // <body> にクラス名 [menu-open] を追加・削除
			  $("body").toggleClass("menu-open");
        $(".nav-button").toggleClass("menu-nav");

	  });

	  // ナビゲーション (<nav>) 内をクリックした時の設定
	  $(document).on('click', '.menu-open nav', function() {
			  // ブラウザに .nav-button をクリックさせる
			  $('.nav-button').trigger('click');
	  });

    // inview(ふわっと)
    $(".inview").on("inview", function (event, isInView) {
      if (isInView) {
        $(this).stop().addClass("is-show");
      }
    });

    // Magnific Popup
    $('.introduction-img').magnificPopup({
      delegate: 'a', //子要素であるaタグを対象とする
      type: 'image',
      // gallery: { enabled: true }, //ギャラリー化する
    });
});

// stickyStack 紙芝居
$('.main-content-wrapper').stickyStack({
		containerElement: '.main-content-wrapper',
		stackingElement: 'section',
		boxShadow: '0 -3px 20px rgba(0, 0, 0, 0.25)'
	});

$(function () {
  // ★追加：CSSの scroll-behavior: smooth がJSと競合するのを防ぐ
  $('html').css('scroll-behavior', 'auto');

  // ★追加：ブラウザが勝手にスクロール位置を復元する機能を無効化
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // スクロール位置を計算して移動する共通関数
  function scrollToTarget(hash, isAnimate) {
    var target = $(hash);
    if (target.length) {
      var finalPos = 0;
      var headerOffset = 100; // ヘッダーの高さ分

      if ($('.main-content-wrapper').length) {
        // 【index.html用】stickyStack（紙芝居）が適用されているページの計算
        var containerTop = $('.main-content-wrapper').offset().top;
        var scrollPos = containerTop;
        
        // ターゲットより前にあるセクションの高さを全て足す
        var prevSections = target.prevAll('section');
        prevSections.each(function() {
          scrollPos += $(this).outerHeight(true);
        });
        
        finalPos = scrollPos - headerOffset;
      } else {
        // 【company.html等用】通常のページの計算
        finalPos = target.offset().top - headerOffset;
      }

      // アニメーションの有無で処理を分ける
      if (isAnimate) {
        $('html, body').animate({ scrollTop: finalPos }, 800);
      } else {
        $('html, body').scrollTop(finalPos);
      }
    }
  }

  // ★修正：別ページからハッシュ付きで遷移してきた時（ロード時）の処理
  $(window).on('load', function() {
    if (window.location.hash) {
      var hash = window.location.hash;
      
      // ブラウザの自動ジャンプをリセットするため、一旦トップへ強制移動
      window.scrollTo(0, 0);
      
      // 画像の読み込みやプラグインの計算が完全に終わるのを待つため、0.3秒遅らせて実行
      setTimeout(function() {
        scrollToTarget(hash, false);
      }, 300);
    }
  });

  // ページ内リンクをクリックした時の処理
  $('a[href*="#"]').on('click', function (e) {
    var currentPath = location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '');
    
    if (currentPath && location.hostname == this.hostname) {
      var hash = this.hash;
      
      // href="#" （トップへ戻るリンク）の場合の処理
      if (hash === "" || hash === "#") {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
      }

      // ターゲットが存在する場合のみ実行
      if ($(hash).length) {
        e.preventDefault(); // デフォルトのジャンプ動作をキャンセル
        scrollToTarget(hash, true); // アニメーション付きでスクロール
        return false;
      }
    }
  });
});

// p5 アニメーション
let blobs = []; // 円（Blob）を管理する配列
// サイトの雰囲気に合わせた色パレット（水色、薄緑、青など）
// let colors = ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#a18cd1'];
let colors = ['#bce9f5', '#9dfaffff', '#a0ffc0ff', '#ffd1dfff', '#f1f8f9'];
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  // 15個の円を作成
  for (let i = 0; i < 15; i++) {
    blobs.push(new Blob());
  }
}
function draw() {
  clear(); // 背景を透明にする（白背景はCSSに任せる）
  
  // 全ての円を更新・描画
  for (let b of blobs) {
    b.update();
    b.display();
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// 円（Blob）クラスの定義
class Blob {
  constructor() {
    // 初期位置をランダムに
    this.pos = createVector(random(width), random(height));
    
    // ノイズを使って動きを計算するためのオフセット値
    // （ランダムよりも滑らかな動きを作るため）
    this.xOffset = random(1000);
    this.yOffset = random(1000);
    
    // サイズ（大きめにするのがコツ）
    this.r = random(200, 500);
    
    // 色をパレットからランダムに決定
    this.color = color(random(colors));
    // 透明度を下げて重なりを綺麗に見せる
    this.color.setAlpha(80); 
  }
  update() {
    // noise() を使って有機的な動きを作る
    // frameCount に小さい数を掛けるほど動きがゆっくりになる
    let xMovement = map(noise(this.xOffset + frameCount * 0.002), 0, 1, -1, 1);
    let yMovement = map(noise(this.yOffset + frameCount * 0.002), 0, 1, -1, 1);
    // 現在位置に動きを加算
    this.pos.x += xMovement * 2; // 数値を変えると移動距離が変わる
    this.pos.y += yMovement * 2;
    // 画面外に出すぎないように、端に来たら反対側に戻す等の処理（ループ）
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  }
  display() {
    fill(this.color);
    circle(this.pos.x, this.pos.y, this.r);
  }
}

  // ページ読み込み時とウィンドウリサイズ時に実行
$(function() {
  imageSwitch(); // 初回実行
  $(window).resize(function() {
    imageSwitch();
  });
});







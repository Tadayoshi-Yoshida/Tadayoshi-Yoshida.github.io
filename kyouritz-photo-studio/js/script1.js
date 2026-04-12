// 監視対象の要素を取得
  const topImageContainer = document.querySelector('.slide_img');
  const nextContent = document.querySelector('.about');

  // Intersection Observer のオプション
  const options = {
    root: null, // ビューポートを基準にする
    rootMargin: '0px',
    threshold: 0.1 // ターゲットが10%見えたらコールバックを実行
  };

  // 監視対象が画面に入ったり出たりしたときに実行される関数
  const callback = (entries, observer) => {
    entries.forEach(entry => {
      // nextContentが画面に交差（表示され始めた）した場合
      if (entry.isIntersecting) {
        // トップイメージにフェードアウト用のクラスを追加
        topImageContainer.classList.add('fade-out');
      } else {
        // 画面から出たらクラスを削除（スクロールで戻った時に再表示される）
        topImageContainer.classList.remove('fade-out');
      }
    });
  };

  // Observerを作成
  const observer = new IntersectionObserver(callback, options);

  // nextContent要素の監視を開始
  observer.observe(nextContent);

$(function() {

  $('.slide_img').slick({
      dots: false,
      fade: true,         // ドット（ページネーション）を表示
      infinite: true,     // 無限ループ
      speed: 500,         // アニメーションのスピード
      slidesToShow: 1,    // 一度に表示するスライド数
      centerMode: true,   // 表示中のスライドを中央に配置
      variableWidth: true, // スライドの幅を可変にする
      pauseOnFocus: false, 
      pauseOnHover: false,
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
});



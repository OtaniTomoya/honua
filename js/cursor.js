/**
 * カスタムカーソル - JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // カーソル要素を作成
    const cursorOuter = document.createElement('div');
    cursorOuter.classList.add('cursor-outer');
    document.body.appendChild(cursorOuter);

    const cursorInner = document.createElement('div');
    cursorInner.classList.add('cursor-inner');
    document.body.appendChild(cursorInner);

    // 最後のマウス位置を記録
    let lastX = 0;
    let lastY = 0;

    // マウス移動に合わせてカーソル位置を更新
    document.addEventListener('mousemove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;

        // 通常のアニメーション - 内側のドットはマウスに直接追従
        cursorInner.style.left = `${e.clientX}px`;
        cursorInner.style.top = `${e.clientY}px`;

        // 遅延アニメーション効果 - 外側の円は少し遅れて追従
        setTimeout(() => {
            cursorOuter.style.left = `${e.clientX}px`;
            cursorOuter.style.top = `${e.clientY}px`;
        }, 100);
    });

    // スクロール時にカーソル位置を維持（スクロール位置に合わせて更新）
    document.addEventListener('scroll', () => {
        // スクロール中も最後のマウス位置に基づいてカーソルを更新
        // スクロール中はマウスイベントが発生しないため、表示を切り替える代わりに
        // 位置を維持し続ける
        cursorInner.style.left = `${lastX}px`;
        cursorInner.style.top = `${lastY}px`;
        cursorOuter.style.left = `${lastX}px`;
        cursorOuter.style.top = `${lastY}px`;
    });

    // クリック時のエフェクト
    document.addEventListener('mousedown', () => {
        cursorOuter.classList.add('cursor-click');
        cursorInner.classList.add('cursor-click');
        
        setTimeout(() => {
            cursorOuter.classList.remove('cursor-click');
            cursorInner.classList.remove('cursor-click');
        }, 300);
    });

    // リンクやボタンなど、ホバー時に特別なスタイルにするための要素
    const hoverElements = document.querySelectorAll('a, button, .btn, .service-card, .feature-item, .social-link, .mobile-toggle');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-hover');
        });
    });
    
    // ページから出た時にカーソルを非表示にする
    document.addEventListener('mouseleave', () => {
        cursorOuter.style.display = 'none';
        cursorInner.style.display = 'none';
    });
    
    // ページに戻った時にカーソルを表示する
    document.addEventListener('mouseenter', () => {
        cursorOuter.style.display = 'block';
        cursorInner.style.display = 'block';
    });
});
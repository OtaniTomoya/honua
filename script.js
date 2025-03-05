/**
 * ハワイアンロミロミhonua - メインJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // ローディング画面
    const loading = document.getElementById('loading');
    
    // ページの完全な読み込み後にローディング画面を非表示
    window.addEventListener('load', function() {
        setTimeout(function() {
            loading.classList.add('hidden');
        }, 2000); // 元のコードと同じく2秒に設定
    });
    
    // ヘッダースクロール効果
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // モバイルメニュー
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    
    // ハンバーガーボタンクリックでメニュー表示
    mobileToggle.addEventListener('click', function(e) {
        e.stopPropagation(); // イベントの伝播を停止
        nav.classList.toggle('active');
        
        // メニューが開いたときだけ、bodyにクリックイベントを追加
        if (nav.classList.contains('active')) {
            setTimeout(() => {
                document.body.addEventListener('click', closeMenuOnOutsideClick);
            }, 10);
        } else {
            document.body.removeEventListener('click', closeMenuOnOutsideClick);
        }
    });
    
    // メニュー外クリックで閉じる機能
    function closeMenuOnOutsideClick(e) {
        // ナビゲーション自体、または子要素がクリックされた場合は何もしない
        if (nav.contains(e.target) || e.target === mobileToggle) {
            return;
        }
        
        // メニュー外がクリックされた場合は閉じる
        nav.classList.remove('active');
        document.body.removeEventListener('click', closeMenuOnOutsideClick);
    }
    
    // ナビゲーション内のリンクがクリックされたらメニューを閉じる
    nav.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            nav.classList.remove('active');
            document.body.removeEventListener('click', closeMenuOnOutsideClick);
        }
    });
    
    // ナビゲーションリンクアクティブ化
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop - headerHeight - 20) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    
    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
                
                // モバイルメニューを閉じる
                nav.classList.remove('active');
            }
        });
    });
    
    // スクロールダウンボタン
    const scrollDown = document.querySelector('.scroll-down');
    
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            const headerHeight = header.offsetHeight;
            
            window.scrollTo({
                top: aboutSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // スクロール時のフェードイン
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // カルーセルナビゲーション状態の更新
    function updateCarouselNav() {
        // カルーセルナビゲーションがあれば実行
        const carousel = document.querySelector('.services-carousel');
        if (carousel) {
            // このサイトではカルーセルナビゲーションの具体的な実装は不要
            // プレースホルダーとして残しておく
        }
    }
    
    // ギャラリーナビゲーション状態の更新
    function updateGalleryNav() {
        // ギャラリーナビゲーションがあれば実行
        const gallery = document.querySelector('.gallery');
        if (gallery) {
            // このサイトではギャラリーナビゲーションの具体的な実装は不要
            // プレースホルダーとして残しておく
        }
    }
    
    // 各種イベントリスナー登録
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);
    window.addEventListener('resize', function() {
        updateCarouselNav();
        updateGalleryNav();
    });
    
    // 初期実行
    checkFade();
    updateActiveLink();
    updateCarouselNav();
    
    // ページ読み込み完了時に一度実行
    window.addEventListener('load', function() {
        updateCarouselNav();
        updateGalleryNav();
    });
});
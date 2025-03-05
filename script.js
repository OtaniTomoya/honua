document.addEventListener('DOMContentLoaded', function() {
    // ローディング画面
    const loading = document.getElementById('loading');
    
    // ページの完全な読み込み後にローディング画面を非表示
    window.addEventListener('load', function() {
        setTimeout(function() {
            loading.classList.add('hidden');
        }, 2000);
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
    
    mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // ナビゲーションリンクアクティブ化
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    
    function updateActiveLink() {
        let current = '';
        const headerHeight = document.querySelector('header').offsetHeight;
        
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
                const headerHeight = document.querySelector('header').offsetHeight;
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
    document.querySelector('.scroll-down').addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        const headerHeight = document.querySelector('header').offsetHeight;
        
        window.scrollTo({
            top: aboutSection.offsetTop - headerHeight,
            behavior: 'smooth'
        });
    });
    
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
    
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);
    
    // 初期状態のチェック
    updateCarouselNav();

    // ウィンドウのリサイズ時もナビゲーションの状態を更新
    window.addEventListener('resize', function() {
        updateCarouselNav();
        updateGalleryNav();
    });
    
    // ページ読み込み完了時に一度実行
    window.addEventListener('load', function() {
        updateCarouselNav();
        updateGalleryNav();
    });
});
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
    
    // サービスカルーセルナビゲーション
    const servicesCarousel = document.querySelector('.services-carousel');
    const servicesWrapper = document.querySelector('.services-wrapper');
    const serviceCards = document.querySelectorAll('.service-card');
    const prevArrow = document.querySelector('.carousel-arrow.prev');
    const nextArrow = document.querySelector('.carousel-arrow.next');
    //const cardWidth = 360; // カードの幅+マージン（調整）
    
    // カルーセルの端までスクロールしたかどうかを確認
    function isAtStart() {
        return servicesCarousel.scrollLeft <= 10;
    }
    
    function isAtEnd() {
        // カルーセルの全体幅からビューポート幅を引いた値がスクロール位置に近い場合、最後までスクロールしたとみなす
        return (servicesCarousel.scrollLeft) >= 
               (servicesCarousel.scrollWidth - 10);
    }
    
    // ボタンの状態を更新する関数
    function updateCarouselNav() {
        if (isAtStart()) {
            prevArrow.classList.add('disabled');
        } else {
            prevArrow.classList.remove('disabled');
        }
        
        if (isAtEnd()) {
            nextArrow.classList.add('disabled');
        } else {
            nextArrow.classList.remove('disabled');
        }
    }
    
    // スクロール時にナビゲーションボタンの状態を更新
    servicesCarousel.addEventListener('scroll', function() {
        updateCarouselNav();
    });
    
    // 初期状態のチェック
    updateCarouselNav();
    
    // 左右ボタンでのスクロール
    prevArrow.addEventListener('click', function() {
        if (!isAtStart()) {
            servicesCarousel.scrollBy({
                left: -cardWidth,
                behavior: 'smooth'
            });
        }
    });
    
    nextArrow.addEventListener('click', function() {
        if (!isAtEnd()) {
            servicesCarousel.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });
        }
    });
    
    // ギャラリーカルーセル（同様の変更）
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryPrev = document.querySelector('.gallery-prev');
    const galleryNext = document.querySelector('.gallery-next');
    const galleryItemWidth = 320; // ギャラリーアイテムの幅+マージン
    
    function isGalleryAtStart() {
        return galleryContainer.scrollLeft <= 10;
    }
    
    function isGalleryAtEnd() {
        return (galleryContainer.scrollLeft + galleryContainer.offsetWidth) >= 
               (galleryContainer.scrollWidth - 10);
    }
    
    function updateGalleryNav() {
        if (isGalleryAtStart()) {
            galleryPrev.classList.add('disabled');
        } else {
            galleryPrev.classList.remove('disabled');
        }
        
        if (isGalleryAtEnd()) {
            galleryNext.classList.add('disabled');
        } else {
            galleryNext.classList.remove('disabled');
        }
    }
    
    galleryContainer.addEventListener('scroll', function() {
        updateGalleryNav();
    });
    
    updateGalleryNav();
    
    galleryPrev.addEventListener('click', function() {
        if (!isGalleryAtStart()) {
            galleryContainer.scrollBy({
                left: -galleryItemWidth,
                behavior: 'smooth'
            });
        }
    });
    
    galleryNext.addEventListener('click', function() {
        if (!isGalleryAtEnd()) {
            galleryContainer.scrollBy({
                left: galleryItemWidth,
                behavior: 'smooth'
            });
        }
    });
    
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
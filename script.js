// ==================== 页面导航功能 ====================
document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    // 导航按钮点击事件
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetPage = btn.dataset.page;

            // 更新导航按钮状态
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 切换页面
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });

            // 关闭移动端菜单
            closeMobileMenu();
        });
    });

    // ==================== 图片轮播功能 ====================
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    let currentSlide = 0;
    let slideInterval;

    // 创建轮播指示点
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    // 切换到指定幻灯片
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        currentSlide = (index + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // 下一张
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    // 上一张
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    // 自动播放
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(slideInterval);
    }

    // 事件监听
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // 鼠标悬停时暂停自动播放
    const slider = document.querySelector('.hero-slider');
    if (slider) {
        slider.addEventListener('mouseenter', stopAutoPlay);
        slider.addEventListener('mouseleave', startAutoPlay);
    }

    // 启动自动播放
    startAutoPlay();

    // ==================== 移动端菜单 ====================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

    function closeMobileMenu() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('open');
        }
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('open');
        });
    }

    // 点击页面其他区域关闭菜单
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

        if (sidebar && mobileMenuBtn) {
            if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // ==================== 表单处理 ====================
    const contactForm = document.querySelector('.contact-form form');
    const joinBtn = document.querySelector('.join-section .btn-primary');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('感谢您的留言！我们会尽快回复您。');
            contactForm.reset();
        });
    }

    if (joinBtn) {
        joinBtn.addEventListener('click', () => {
            alert('感谢您对深鸡蛋足球协会的关注！\n\n请联系我们获取入会详情：\n电话：138-0013-8000\n邮箱：info@shendanji.com');
        });
    }

    // ==================== 滚动动画 ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察统计卡片和特色服务卡片
    document.querySelectorAll('.stat-card, .feature-card, .benefit-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

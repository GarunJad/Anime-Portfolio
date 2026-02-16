/* ==============================================
   GOKU x SOLO LEVELING PORTFOLIO — JS V3
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Basic setup
    gsap.registerPlugin(ScrollTrigger);
    if (window.lucide) lucide.createIcons();
    initPreloader();
});

/* ==================
   PRELOADER
   ================== */
function initPreloader() {
    const counter = document.getElementById('preloaderCount');
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('preloaderFill');
    let count = 0;

    const interval = setInterval(() => {
        count += Math.floor(Math.random() * 6) + 2;
        if (count > 100) count = 100;
        counter.textContent = count;
        if (fill) fill.style.width = count + '%';

        if (count >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(preloader, {
                    clipPath: 'inset(0 0 100% 0)',
                    duration: 1.2,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        preloader.style.display = 'none';
                        initEverything();
                    }
                });
            }, 400);
        }
    }, 35);
}

function initEverything() {
    initCursor();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    console.log('App Initialized');
}

/* ==================
   CUSTOM CURSOR
   ================== */
function initCursor() {
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    if (!dot || !ring || window.innerWidth < 768) return;

    let mx = 0, my = 0;
    let dx = 0, dy = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    document.querySelectorAll('.magnetic').forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            gsap.to(el, { x: (e.clientX - cx) * 0.35, y: (e.clientY - cy) * 0.35, duration: 0.4, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' });
        });
    });

    const hoverEls = document.querySelectorAll('a, button, .magnetic, .manga-panel, .skill-card, .timeline-card');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => { dot.classList.add('hovering'); ring.classList.add('hovering'); });
        el.addEventListener('mouseleave', () => { dot.classList.remove('hovering'); ring.classList.remove('hovering'); });
    });

    (function animate() {
        dx += (mx - dx) * 0.18;
        dy += (my - dy) * 0.18;
        rx += (mx - rx) * 0.07;
        ry += (my - ry) * 0.07;
        dot.style.left = dx + 'px'; dot.style.top = dy + 'px';
        ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
        requestAnimationFrame(animate);
    })();
}

/* ==================
   NAVBAR
   ================== */
function initNavbar() {
    const nav = document.getElementById('nav');
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function update() {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        let cur = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) cur = s.id; });
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
}

function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const nav = document.getElementById('navLinks');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });
    nav.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
        document.body.style.overflow = '';
    }));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        });
    });
}

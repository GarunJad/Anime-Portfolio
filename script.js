/* ==============================================
   GOKU x SOLO LEVELING PORTFOLIO — JS V3
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
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
    initHeroAnimations();
    initStatsPanel();
    initRevealAnimations();
    initParallax();
    initCounters();
    initSkillBars();
    initMangaPanels();
    initDividerAnimation();
    initMirrorDividers();
    initSideDots();
    console.log('GSAP initialized');
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

/* ==================
   HERO ENTRANCE
   ================== */
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-character-img', { opacity: 0, scale: 1.15, duration: 1.6, ease: 'power2.out' }, 0)
        .from('.hero-character-glow', { opacity: 0, scale: 0.5, duration: 1.2 }, 0.3)
        .from('.hero-badge', { opacity: 0, y: 30, scale: 0.9, duration: 0.6 }, 0.3)
        .from('.hero-sub', { opacity: 0, x: -40, duration: 0.6 }, 0.4)
        .from('.name-line', { opacity: 0, y: 100, rotateX: 30, duration: 1, stagger: 0.15 }, 0.5)
        .from('.hero-tagline', { opacity: 0, y: 20, duration: 0.5 }, 0.9)
        .from('.hero-desc', { opacity: 0, y: 30, duration: 0.6 }, 1.0)
        .from('.hero-actions', { opacity: 0, y: 30, duration: 0.6 }, 1.15)
        .from('.hero-socials .social-icon', { opacity: 0, y: 20, scale: 0.8, duration: 0.4, stagger: 0.08 }, 1.3)
        .from('.hero-scroll-hint', { opacity: 0, y: 20, duration: 0.8 }, 1.6);
}

/* ==================
   STATS PANEL ENTRANCE (Solo Leveling right panel)
   ================== */
function initStatsPanel() {
    const panel = document.getElementById('heroStats');
    if (!panel) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 1.4 });

    tl.from('.stats-panel-title', { opacity: 0, x: 40, duration: 0.7 })
        .from('.stat-line', {
            opacity: 0, x: 30,
            duration: 0.5, stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3');
}

/* ==================
   REVEAL ON SCROLL
   ================== */
function initRevealAnimations() {
    document.querySelectorAll('.reveal-text').forEach(el => {
        gsap.to(el, {
            opacity: 1, y: 0,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        });
    });

    document.querySelectorAll('.section-bg-text').forEach(el => {
        gsap.to(el, { x: -100, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    });

    // Section headings — skew entrance
    document.querySelectorAll('.section-heading').forEach(heading => {
        ScrollTrigger.create({
            trigger: heading, start: 'top 80%',
            onEnter: () => gsap.from(heading, { opacity: 0, y: 60, skewY: 3, duration: 1, ease: 'power3.out' }),
            once: true
        });
    });
}

/* ==================
   MIRRORED TEXT DIVIDERS (Monster style)
   ================== */
function initMirrorDividers() {
    document.querySelectorAll('.mirror-divider').forEach(div => {
        const top = div.querySelector('.mirror-text-top');
        const bot = div.querySelector('.mirror-text-bot');

        if (top) {
            gsap.from(top, {
                opacity: 0, x: -60, duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: div, start: 'top 80%' }
            });
        }
        if (bot) {
            gsap.from(bot, {
                opacity: 0, x: 60, duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: div, start: 'top 80%' }
            });
        }
    });
}

/* ==================
   MIRRORED TEXT DIVIDERS (Monster style)
   ================== */
function initMirrorDividers() {
    document.querySelectorAll('.mirror-divider').forEach(div => {
        const top = div.querySelector('.mirror-text-top');
        const bot = div.querySelector('.mirror-text-bot');

        if (top) {
            gsap.from(top, {
                opacity: 0, x: -60, duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: div, start: 'top 80%' }
            });
        }
        if (bot) {
            gsap.from(bot, {
                opacity: 0, x: 60, duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: div, start: 'top 80%' }
            });
        }
    });
}

/* ==================
   PARALLAX
   ================== */
function initParallax() {
    const heroImg = document.getElementById('heroImg');
    if (heroImg) {
        gsap.to(heroImg, { y: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
    }

    const aboutImg = document.getElementById('aboutImg');
    if (aboutImg) {
        gsap.to(aboutImg, { y: -20, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    }

    const dividerImg = document.getElementById('dividerImg1');
    if (dividerImg) {
        gsap.to(dividerImg, { y: -25, ease: 'none', scrollTrigger: { trigger: '#divider1', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    }

    const expertiseImg = document.getElementById('expertiseImg');
    if (expertiseImg) {
        gsap.to(expertiseImg, { y: -60, ease: 'none', scrollTrigger: { trigger: '.expertise', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    }

    const contactImg = document.getElementById('contactImg');
    if (contactImg) {
        gsap.to(contactImg, { y: -40, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    }
}

/* ==================
   COUNTERS
   ================== */
function initCounters() {
    document.querySelectorAll('[data-target]').forEach(counter => {
        ScrollTrigger.create({
            trigger: counter, start: 'top 85%',
            onEnter: () => {
                const target = parseInt(counter.dataset.target);
                gsap.to({ val: 0 }, {
                    val: target, duration: 2.5, ease: 'power2.out',
                    onUpdate: function () { counter.textContent = Math.round(this.targets()[0].val); }
                });
            },
            once: true
        });
    });
}

/* ==================
   SKILL BARS
   ================== */
function initSkillBars() {
    document.querySelectorAll('.skill-fill').forEach(bar => {
        ScrollTrigger.create({
            trigger: bar, start: 'top 90%',
            onEnter: () => { bar.style.width = bar.style.getPropertyValue('--fill'); },
            once: true
        });
    });
}

/* ==================
   MANGA PANEL GRID ANIMATIONS (Toji style)
   ================== */
function initMangaPanels() {
    const panels = document.querySelectorAll('.manga-panel');

    panels.forEach((panel, i) => {
        // Staggered reveal — each panel enters from a different direction
        const directions = [
            { x: -80, y: 40, rotate: -2 },   // large — slide from left
            { x: 80, y: 0, rotate: 2 },    // tall — slide from right
            { x: 0, y: 80, rotate: 0 },     // wide — slide from below
            { x: 60, y: 40, rotate: -1 },   // small — slide from right
        ];
        const dir = directions[i] || directions[0];

        gsap.fromTo(panel,
            { opacity: 0, x: dir.x, y: dir.y, rotation: dir.rotate, scale: 0.92 },
            {
                opacity: 1, x: 0, y: 0, rotation: 0, scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: panel,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            }
        );

        // Parallax on panel images
        const img = panel.querySelector('.panel-img');
        if (img) {
            gsap.to(img, {
                y: -25,
                ease: 'none',
                scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
            });
        }
    });
}

/* ==================
   SECTION DIVIDER (Image + Text)
   ================== */
function initDividerAnimation() {
    const divider = document.getElementById('divider1');
    if (!divider) return;

    const kanji = divider.querySelector('.divider-kanji');
    const sub = divider.querySelector('.divider-sub');
    const decor = divider.querySelectorAll('.divider-decor-text span');

    if (kanji) {
        gsap.from(kanji, {
            opacity: 0, scale: 0.8, y: 40, duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: divider, start: 'top 70%' }
        });
    }
    if (sub) {
        gsap.from(sub, {
            opacity: 0, x: -30, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: divider, start: 'top 65%' }
        });
    }
    if (decor.length) {
        gsap.from(decor, {
            opacity: 0, x: 60, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: divider, start: 'top 65%' }
        });
    }
}

/* ==================
   SIDE DOTS
   ================== */
function initSideDots() {
    const dots = document.querySelectorAll('.side-dot');
    const sections = ['hero', 'about', 'expertise', 'projects', 'experience', 'contact'];

    sections.forEach((id, i) => {
        const sec = document.getElementById(id);
        if (!sec) return;
        ScrollTrigger.create({
            trigger: sec, start: 'top center', end: 'bottom center',
            onToggle: self => {
                dots.forEach(d => d.classList.remove('active'));
                if (self.isActive && dots[i]) dots[i].classList.add('active');
            }
        });
    });
}

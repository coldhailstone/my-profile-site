/* ============================================
   테마 관리 (system → dark → light 순환)
   ============================================ */
const THEMES = ['system', 'dark', 'light'];
const THEME_ICONS = { system: 'fa-desktop', dark: 'fa-moon', light: 'fa-sun' };

let currentTheme = localStorage.getItem('theme') || 'system';

function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
        html.classList.add('dark');
    } else if (theme === 'light') {
        html.classList.remove('dark');
    } else {
        html.classList.toggle(
            'dark',
            window.matchMedia('(prefers-color-scheme: dark)').matches
        );
    }
    localStorage.setItem('theme', theme);
    updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
    document.querySelectorAll('.theme-toggle-btn i').forEach((icon) => {
        icon.className = `fas ${THEME_ICONS[theme]}`;
    });
}

function cycleTheme() {
    currentTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
    applyTheme(currentTheme);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (currentTheme === 'system')
        document.documentElement.classList.toggle('dark', e.matches);
});

document.getElementById('theme-toggle').addEventListener('click', cycleTheme);
document.getElementById('theme-toggle-mobile').addEventListener('click', cycleTheme);
applyTheme(currentTheme);

/* ============================================
   타이핑 효과
   ============================================ */
const TYPING_TEXTS = ['프론트엔드 개발자', '웹 개발자'];
const typingEl = document.getElementById('typing-text');
let textIdx = 0,
    charIdx = 0,
    isDeleting = false;

function runTyping() {
    const cur = TYPING_TEXTS[textIdx];
    typingEl.textContent = isDeleting
        ? cur.substring(0, charIdx - 1)
        : cur.substring(0, charIdx + 1);
    isDeleting ? charIdx-- : charIdx++;

    let delay = isDeleting ? 65 : 110;
    if (!isDeleting && charIdx === cur.length) {
        delay = 2200;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % TYPING_TEXTS.length;
        delay = 400;
    }
    setTimeout(runTyping, delay);
}
runTyping();

/* ============================================
   Nav 스크롤 효과
   ============================================ */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scroll-top-btn');
function handleNavScroll() {
    navbar.classList.toggle('nav-scrolled', window.scrollY > 60);
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   모바일 메뉴 토글
   ============================================ */
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
    const hidden = mobileMenu.classList.toggle('hidden');
    menuIcon.className = hidden ? 'fas fa-bars text-xl' : 'fas fa-times text-xl';
});

document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fas fa-bars text-xl';
    });
});

/* ============================================
   스무스 스크롤 (nav 높이 보정)
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top =
            target.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ============================================
   스크롤 페이드인 (IntersectionObserver)
   ============================================ */
const scrollObs = new IntersectionObserver(
    (entries) =>
        entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add('animate-in');
        }),
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.scroll-animate').forEach((el) => scrollObs.observe(el));

/* ============================================
   스킬 바 애니메이션
   ============================================ */
const skillObs = new IntersectionObserver(
    (entries) =>
        entries.forEach((e) => {
            if (e.isIntersecting) {
                setTimeout(() => {
                    e.target.style.width = e.target.dataset.width + '%';
                }, 150);
                skillObs.unobserve(e.target);
            }
        }),
    { threshold: 0.5 }
);
document.querySelectorAll('.skill-bar').forEach((bar) => skillObs.observe(bar));

/* ============================================
   DATA & 컨텐츠 렌더링
   ============================================ */
const DATA = {
    career: [
        {
            org: '프리랜서',
            role: '삼성생명 ITO · 대리',
            period: '2024.01 ~ 현재',
            status: '재직중',
            tags: ['웹 개발자'],
            isActive: true,
            projects: [
                { name: '보험료 계산 시스템 리뉴얼', period: '2024.06 ~ 현재', skills: ['Vue.js', 'TypeScript', 'Vuetify'] },
                { name: '고객 포털 UI 개선', period: '2024.01 ~ 2024.05', skills: ['Vue.js', 'JavaScript', 'SCSS'] },
            ],
        },
        {
            org: '주식회사 스마트잭',
            role: '프로덕트운영팀 · 연구원',
            period: '2022.04 ~ 2023.04',
            status: '1년 1개월',
            tags: ['프론트엔드 개발자'],
            isActive: false,
            projects: [
                { name: '관리자 대시보드 개발', period: '2022.10 ~ 2023.04', skills: ['React', 'TypeScript', 'Ant Design'] },
                { name: '모바일 웹 앱 개발', period: '2022.04 ~ 2022.09', skills: ['React', 'JavaScript', 'Styled Components'] },
            ],
        },
        {
            org: '주식회사 위컴즈',
            role: '연구개발팀 · 주임연구원',
            period: '2017.11 ~ 2021.07',
            status: '3년 9개월',
            tags: ['웹 개발자'],
            isActive: false,
            projects: [
                { name: '스마트팩토리 모니터링 시스템', period: '2020.03 ~ 2021.07', skills: ['Vue.js', 'JavaScript', 'Chart.js'] },
                { name: '물류 관리 ERP 시스템', period: '2018.07 ~ 2020.02', skills: ['jQuery', 'Java', 'Spring'] },
                { name: '사내 인트라넷 구축', period: '2017.11 ~ 2018.06', skills: ['HTML', 'CSS', 'JavaScript'] },
            ],
        },
        {
            org: '주식회사 엔피니티7',
            role: '개발팀 · 팀원',
            period: '2016.11 ~ 2017.04',
            status: '6개월',
            tags: ['클라이언트 개발자', 'Unity'],
            isActive: false,
            projects: [
                { name: '모바일 캐주얼 게임 개발', period: '2016.11 ~ 2017.04', skills: ['Unity', 'C#', 'Firebase'] },
            ],
        },
    ],
    projects: [
        {
            title: "찬우박's Blog",
            desc: 'Jekyll과 Minimal Mistakes 테마로 제작한 기술 블로그. 알고리즘 문제 풀이와 개발 관련 글을 기록합니다.',
            tags: ['Jekyll', 'Minimal Mistakes', 'GitHub Pages'],
            links: {
                demo: 'https://coldhailstone.github.io/',
                github: 'https://github.com/coldhailstone/coldhailstone.github.io',
            },
            icon: 'fa-blog',
            iconBg: 'rgba(99, 102, 241, 0.15)',
            iconColor: '#6366f1',
        },
        {
            title: '중개사닷컴',
            desc: 'Vue 3와 Firebase를 활용한 부동산 매물·고객 관리 서비스. TypeScript 기반으로 안정적인 데이터 관리를 제공합니다.',
            tags: ['Vue.js', 'TypeScript', 'Firebase'],
            links: {
                demo: 'https://joongaesa.web.app/',
                github: 'https://github.com/coldhailstone/joongaesa',
            },
            icon: 'fa-building',
            iconBg: 'rgba(16, 185, 129, 0.15)',
            iconColor: '#10b981',
        },
    ],
    certs: [
        {
            name: 'SQLD (SQL 개발자)',
            org: '한국데이터산업진흥원',
            date: '2025.12',
        },
        {
            name: 'ADsP (데이터분석 준전문가)',
            org: '한국데이터산업진흥원',
            date: '2025.09',
        },
        {
            name: '정보처리기사',
            org: '한국산업인력공단',
            date: '2024.06',
        },
    ],
};

function renderProjects() {
    const container = document.getElementById('project-list');
    if (!container) return;
    container.innerHTML = DATA.projects
        .map(
            (p) => `
        <div class="project-card scroll-animate">
            <div class="project-header">
                <div class="project-icon" style="background: ${p.iconBg}">
                    <i class="fas ${p.icon} " style="color: ${p.iconColor}; font-size: 1.5rem"></i>
                </div>
                <div class="project-links">
                    ${
                        p.links.demo
                            ? `<a href="${p.links.demo}" target="_blank" rel="noopener" class="project-link-btn" title="데모 보기"><i class="fas fa-external-link-alt"></i></a>`
                            : ''
                    }
                    ${
                        p.links.github
                            ? `<a href="${p.links.github}" target="_blank" rel="noopener" class="project-link-btn" title="GitHub"><i class="fab fa-github"></i></a>`
                            : ''
                    }
                </div>
            </div>
            <h3 class="text-xl font-bold mb-2">${p.title}</h3>
            <p class="text-muted text-sm leading-relaxed mb-5">${p.desc}</p>
            <div class="flex flex-wrap gap-2 mt-auto">
                ${p.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `
        )
        .join('');
}

function renderCareer() {
    const container = document.getElementById('career-timeline');
    if (!container) return;
    container.innerHTML = DATA.career
        .map(
            (c, i) => `
        <div class="timeline-item scroll-animate">
            <div class="timeline-dot ${c.isActive ? 'active' : ''}"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-org">${c.org}</h3>
                        <p class="timeline-role">${c.role}</p>
                    </div>
                    <span class="timeline-status ${c.isActive ? 'active' : 'ended'}">${c.status}</span>
                </div>
                <p class="timeline-period">
                    <i class="fas fa-calendar-alt mr-1.5"></i>${c.period}
                </p>
                <div class="flex flex-wrap gap-2 mt-3">
                    ${c.tags.map((tag) => `<span class="timeline-tag">${tag}</span>`).join('')}
                </div>
                ${
                    c.projects && c.projects.length > 0
                        ? `
                <button class="timeline-toggle" data-career-idx="${i}">
                    <span>프로젝트 더보기</span>
                    <i class="fas fa-chevron-down timeline-toggle-icon"></i>
                </button>
                <div class="timeline-details">
                    <div class="timeline-details-inner">
                        ${c.projects
                            .map(
                                (p) => `
                        <div class="timeline-project">
                            <h4 class="timeline-project-name">${p.name}</h4>
                            <p class="timeline-project-period"><i class="fas fa-calendar-alt mr-1"></i>${p.period}</p>
                            <div class="flex flex-wrap gap-1.5 mt-2">
                                ${p.skills.map((s) => `<span class="timeline-project-skill">${s}</span>`).join('')}
                            </div>
                        </div>
                        `
                            )
                            .join('')}
                    </div>
                </div>`
                        : ''
                }
            </div>
        </div>
    `
        )
        .join('');

    container.querySelectorAll('.timeline-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const details = btn.nextElementSibling;
            const icon = btn.querySelector('.timeline-toggle-icon');
            const isExpanded = details.classList.contains('expanded');

            if (isExpanded) {
                details.style.maxHeight = details.scrollHeight + 'px';
                requestAnimationFrame(() => {
                    details.style.maxHeight = '0';
                });
                details.classList.remove('expanded');
                icon.classList.remove('rotated');
                btn.querySelector('span').textContent = '프로젝트 더보기';
            } else {
                details.classList.add('expanded');
                details.style.maxHeight = details.scrollHeight + 'px';
                icon.classList.add('rotated');
                btn.querySelector('span').textContent = '프로젝트 접기';
            }
        });
    });
}

function renderCertifications() {
    const container = document.getElementById('cert-list');
    if (!container) return;
    container.innerHTML = DATA.certs
        .map(
            (c) => `
        <div class="cert-item scroll-animate">
            <div class="cert-icon-wrap">
                <i class="fas fa-certificate"></i>
            </div>
            <div class="flex-1">
                <p class="font-semibold mb-0.5">${c.name}</p>
                <p class="text-sm text-muted">${c.org}</p>
            </div>
            <span class="cert-date">${c.date}</span>
        </div>
    `
        )
        .join('');
}

/* ============================================
   현재 연도
   ============================================ */
document.getElementById('current-year').textContent = new Date().getFullYear();

/* ============================================
   히어로 스탯 카드 동적 계산
   ============================================ */
function updateStats() {
    const now = new Date();
    let totalMonths = 0;

    DATA.career.forEach((c) => {
        const parts = c.period.split('~').map((p) => p.trim());
        const startMatch = parts[0].match(/(\d{4})\.(\d{2})/);
        if (!startMatch) return;

        const startYear = parseInt(startMatch[1], 10);
        const startMonth = parseInt(startMatch[2], 10);

        let endYear, endMonth;
        if (parts[1] === '현재') {
            endYear = now.getFullYear();
            endMonth = now.getMonth() + 1;
        } else {
            const endMatch = parts[1].match(/(\d{4})\.(\d{2})/);
            if (endMatch) {
                endYear = parseInt(endMatch[1], 10);
                endMonth = parseInt(endMatch[2], 10);
            } else {
                return;
            }
        }

        // 월 단위 차이 계산 (시작월과 종료월 포함을 위해 +1)
        const diff = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
        totalMonths += Math.max(0, diff);
    });

    const years = Math.floor(totalMonths / 12);
    document.getElementById('stat-career').textContent = years + '+';

    // 프로젝트 수
    document.getElementById('stat-projects').textContent = DATA.projects.length;

    // 자격증 수
    document.getElementById('stat-certs').textContent = DATA.certs.length;
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    renderCareer();
    renderCertifications();
    updateStats();

    // IntersectionObserver 재설정 (동적 생성된 요소 감시)
    document.querySelectorAll('.scroll-animate').forEach((el) => scrollObs.observe(el));
});

/* ============================================
   연락 폼
   ============================================ */
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`포트폴리오 문의 - ${name}`);
    const body = encodeURIComponent(
        `이름: ${name}\n이메일: ${email}\n\n메시지:\n${message}`
    );
    window.location.href = `mailto:cksn1993@gmail.com?subject=${subject}&body=${body}`;
}

/* ============================================
   전체 페이지 인터랙티브 배경 캔버스
   마우스 어디서든 반응 — 반발 + 연결선
   ============================================ */
(function initBgCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let rafId;
    const mouse = { x: null, y: null };

    /* ---- 파티클 클래스 ---- */
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.originX = Math.random() * canvas.width;
            this.originY = Math.random() * canvas.height;
            this.x = this.originX;
            this.y = this.originY;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            // 원점이 천천히 부유
            this.driftX = (Math.random() - 0.5) * 0.12;
            this.driftY = (Math.random() - 0.5) * 0.12;
            this.radius = Math.random() * 1.6 + 0.4;
            this.alpha = Math.random() * 0.45 + 0.1;
        }

        update() {
            // 마우스 반발
            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                const R = 170;
                if (d2 < R * R && d2 > 0) {
                    const dist = Math.sqrt(d2);
                    const force = (1 - dist / R) * 2.6;
                    this.vx += (dx / dist) * force;
                    this.vy += (dy / dist) * force;
                }
            }

            // 원점 복귀 (스프링)
            this.vx += (this.originX - this.x) * 0.004;
            this.vy += (this.originY - this.y) * 0.004;

            // 원점 자연 드리프트
            this.originX += this.driftX;
            this.originY += this.driftY;
            if (this.originX < 0 || this.originX > canvas.width) this.driftX *= -1;
            if (this.originY < 0 || this.originY > canvas.height) this.driftY *= -1;

            // 감쇠
            this.vx *= 0.91;
            this.vy *= 0.91;

            this.x += this.vx;
            this.y += this.vy;
        }

        draw(isDark) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            const color = isDark ? '99,102,241' : '67,56,202';
            const alpha = isDark ? this.alpha : Math.min(this.alpha * 1.5, 0.85);
            ctx.fillStyle = `rgba(${color},${alpha})`;
            ctx.fill();
        }
    }

    /* ---- 파티클 수: 화면 크기 비례 ---- */
    function createParticles() {
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 110);
        particles = Array.from({ length: count }, () => new Particle());
    }

    /* ---- 연결선 ---- */
    function drawConnections(isDark) {
        const MAX_PP = 120; // 파티클 간 최대 거리
        const MAX_MOUSE = 190; // 마우스 연결 최대 거리
        const pColor = isDark ? '99,102,241' : '67,56,202';
        const mColor = isDark ? '6,182,212' : '8,145,178';
        const pMult = isDark ? 0.2 : 0.45;
        const mMult = isDark ? 0.5 : 0.65;

        for (let i = 0; i < particles.length; i++) {
            const pi = particles[i];

            // 파티클 ↔ 파티클
            for (let j = i + 1; j < particles.length; j++) {
                const pj = particles[j];
                const dx = pi.x - pj.x;
                const dy = pi.y - pj.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < MAX_PP * MAX_PP) {
                    const dist = Math.sqrt(d2);
                    ctx.beginPath();
                    ctx.moveTo(pi.x, pi.y);
                    ctx.lineTo(pj.x, pj.y);
                    ctx.strokeStyle = `rgba(${pColor},${(1 - dist / MAX_PP) * pMult})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }

            // 파티클 ↔ 마우스 (사이안 강조)
            if (mouse.x !== null) {
                const dx = pi.x - mouse.x;
                const dy = pi.y - mouse.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < MAX_MOUSE * MAX_MOUSE) {
                    const dist = Math.sqrt(d2);
                    ctx.beginPath();
                    ctx.moveTo(pi.x, pi.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(${mColor},${(1 - dist / MAX_MOUSE) * mMult})`;
                    ctx.lineWidth = 0.9;
                    ctx.stroke();
                }
            }
        }
    }

    /* ---- 캔버스 크기 = 뷰포트 ---- */
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createParticles();
    }

    /* ---- 전역 마우스 추적 ---- */
    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    document.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // 모바일 터치
    document.addEventListener(
        'touchmove',
        (e) => {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        },
        { passive: true }
    );
    document.addEventListener('touchend', () => {
        mouse.x = null;
        mouse.y = null;
    });

    /* ---- 탭 비활성화 시 절전 ---- */
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(rafId);
        else animate();
    });

    /* ---- 애니메이션 루프 ---- */
    function animate() {
        const isDark = document.documentElement.classList.contains('dark');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.update();
            p.draw(isDark);
        });
        drawConnections(isDark);
        rafId = requestAnimationFrame(animate);
    }

    /* ---- 리사이즈 ---- */
    window.addEventListener('resize', () => {
        cancelAnimationFrame(rafId);
        resize();
        animate();
    });

    resize();
    animate();
})();

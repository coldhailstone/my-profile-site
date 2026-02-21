/* ============================================
   테마 관리 (system → dark → light 순환)
   ============================================ */
const THEMES      = ['system', 'dark', 'light'];
const THEME_ICONS = { system: 'fa-desktop', dark: 'fa-moon', light: 'fa-sun' };

let currentTheme = localStorage.getItem('theme') || 'system';

function applyTheme(theme) {
  const html = document.documentElement;
  if (theme === 'dark') {
    html.classList.add('dark');
  } else if (theme === 'light') {
    html.classList.remove('dark');
  } else {
    html.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
  localStorage.setItem('theme', theme);
  updateThemeIcons(theme);
}

function updateThemeIcons(theme) {
  document.querySelectorAll('.theme-toggle-btn i').forEach(icon => {
    icon.className = `fas ${THEME_ICONS[theme]}`;
  });
}

function cycleTheme() {
  currentTheme = THEMES[(THEMES.indexOf(currentTheme) + 1) % THEMES.length];
  applyTheme(currentTheme);
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (currentTheme === 'system') document.documentElement.classList.toggle('dark', e.matches);
});

document.getElementById('theme-toggle').addEventListener('click', cycleTheme);
document.getElementById('theme-toggle-mobile').addEventListener('click', cycleTheme);
applyTheme(currentTheme);


/* ============================================
   타이핑 효과
   ============================================ */
const TYPING_TEXTS = ['프론트엔드 개발자', 'Vue.js 개발자', 'UI/UX 구현가', '웹 퍼블리셔'];
const typingEl = document.getElementById('typing-text');
let textIdx = 0, charIdx = 0, isDeleting = false;

function runTyping() {
  const cur = TYPING_TEXTS[textIdx];
  typingEl.textContent = isDeleting
    ? cur.substring(0, charIdx - 1)
    : cur.substring(0, charIdx + 1);
  isDeleting ? charIdx-- : charIdx++;

  let delay = isDeleting ? 65 : 110;
  if (!isDeleting && charIdx === cur.length) { delay = 2200; isDeleting = true; }
  else if (isDeleting && charIdx === 0) {
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
function handleNavScroll() {
  navbar.classList.toggle('nav-scrolled', window.scrollY > 60);
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();


/* ============================================
   모바일 메뉴 토글
   ============================================ */
const menuToggle = document.getElementById('menu-toggle');
const menuIcon   = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  const hidden = mobileMenu.classList.toggle('hidden');
  menuIcon.className = hidden ? 'fas fa-bars text-xl' : 'fas fa-times text-xl';
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuIcon.className = 'fas fa-bars text-xl';
  });
});


/* ============================================
   스무스 스크롤 (nav 높이 보정)
   ============================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.pageYOffset - navbar.offsetHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ============================================
   스크롤 페이드인 (IntersectionObserver)
   ============================================ */
const scrollObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate-in'); }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.scroll-animate').forEach(el => scrollObs.observe(el));


/* ============================================
   스킬 바 애니메이션
   ============================================ */
const skillObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => { e.target.style.width = e.target.dataset.width + '%'; }, 150);
      skillObs.unobserve(e.target);
    }
  }),
  { threshold: 0.5 }
);
document.querySelectorAll('.skill-bar').forEach(bar => skillObs.observe(bar));


/* ============================================
   현재 연도
   ============================================ */
document.getElementById('current-year').textContent = new Date().getFullYear();


/* ============================================
   연락 폼
   ============================================ */
function handleFormSubmit(event) {
  event.preventDefault();
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`포트폴리오 문의 - ${name}`);
  const body    = encodeURIComponent(`이름: ${name}\n이메일: ${email}\n\n메시지:\n${message}`);
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
      this.x       = this.originX;
      this.y       = this.originY;
      this.vx      = (Math.random() - 0.5) * 0.45;
      this.vy      = (Math.random() - 0.5) * 0.45;
      // 원점이 천천히 부유
      this.driftX  = (Math.random() - 0.5) * 0.12;
      this.driftY  = (Math.random() - 0.5) * 0.12;
      this.radius  = Math.random() * 1.6 + 0.4;
      this.alpha   = Math.random() * 0.45 + 0.1;
    }

    update() {
      // 마우스 반발
      if (mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const R  = 170;
        if (d2 < R * R && d2 > 0) {
          const dist  = Math.sqrt(d2);
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
      if (this.originX < 0 || this.originX > canvas.width)  this.driftX *= -1;
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
    const count = Math.min(
      Math.floor((canvas.width * canvas.height) / 10000),
      110
    );
    particles = Array.from({ length: count }, () => new Particle());
  }

  /* ---- 연결선 ---- */
  function drawConnections(isDark) {
    const MAX_PP    = 120; // 파티클 간 최대 거리
    const MAX_MOUSE = 190; // 마우스 연결 최대 거리
    const pColor = isDark ? '99,102,241' : '67,56,202';
    const mColor = isDark ? '6,182,212'  : '8,145,178';
    const pMult  = isDark ? 0.20 : 0.45;
    const mMult  = isDark ? 0.50 : 0.65;

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
          ctx.lineWidth   = 0.7;
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
          ctx.lineWidth   = 0.9;
          ctx.stroke();
        }
      }
    }
  }

  /* ---- 캔버스 크기 = 뷰포트 ---- */
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  /* ---- 전역 마우스 추적 ---- */
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

  // 모바일 터치
  document.addEventListener('touchmove', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', () => { mouse.x = null; mouse.y = null; });

  /* ---- 탭 비활성화 시 절전 ---- */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(rafId);
    else animate();
  });

  /* ---- 애니메이션 루프 ---- */
  function animate() {
    const isDark = document.documentElement.classList.contains('dark');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(isDark); });
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

// ── PROJECT DATA ──────────────────────────────────────────────
const projects = [
  {
    icon: './images/fkl/fkl.png',
    title: 'FKL Info Data',
    playStore: 'https://play.google.com/store/apps/details?id=com.fkl_serbia',
    appStore: 'https://apps.apple.com/kz/app/fkl-info-data/id6749833270',
    description: `The FKL Info Data App is an official mobile tool from FKL factory for agriculture and industrial professionals to access a bearing cross-reference database, available on Android and iOS. It enables quick identification of bearings by product designation or application, helps manage product lists, and offers direct contact with FKL support.
    
    The company proudly presented the app at AGRITECHNICA fair in Hanover, Germany.`,
    tech: ['Flutter', 'PHP'],
    images: [
      { src: './images/fkl/fklcover.png' },
      { src: './images/fkl/3.webp' },
      { src: './images/fkl/4.webp' },
    ],
  },
  {
    icon: './images/travel-vista/icon.svg',
    title: 'Travel Vista',
    githubFrontend: 'https://github.com/kzi-nastava/psw-fe-ra-2025-group-3',
    githubBackend: 'https://github.com/kzi-nastava/psw-be-ra-2025-group-3',
    description: `Tourist guide replacement platform made as a university project for the Software design course. The platform was selected as the best among all teams by a panel of professors.
    
    Teams were made out of at least 12 members all working on the same project.
    
    Course was focused on monolithic `,
    tech: ['.NET', 'Angular', 'TypeScript'],
    images: [
      { src: './images/travel-vista/1.png' },
      { src: './images/travel-vista/2.png' },
      { src: './images/travel-vista/3.png' },
      { src: './images/travel-vista/4.png' },
      { src: './images/travel-vista/5.png' },
    ],
  },
  {
    icon: './images/jutjubic/icon.png',
    title: 'Jutjubic',
    githubFrontend: 'https://github.com/velimirovic/isa-frontend',
    githubBackend: 'https://github.com/velimirovic/isa-backend',
    description: `YouTube clone platform with geographically mapped uploaded videos made as a university project for the Internet-software architectures course.`,
    tech: ['Java SpringBoot', 'Angular', 'RabbitMQ', 'Docker', 'NGINX Load Balancer'],
    images: [
      { src: './images/jutjubic/1.png'  },
      { src: './images/jutjubic/2.jpeg' },
      { src: './images/jutjubic/3.png'  },
      { src: './images/jutjubic/4.png'  },
    ],
  },
  {
    icon: './images/grafika/3d1.png',
    title: '3D Aquarium',
    github: 'https://github.com/petarsipka/3d-aquarium',
    description: `3D Aquarium made as a university project for the Computer Graphics course.`,
    tech: ['OpenGL', 'Glew', 'C++'],
    images: [
      { src: './images/grafika/3d1.png' },
      { src: './images/grafika/3d2.png' },
    ],
  },
  {
    icon: './images/1.png',
    title: 'Smaller for-fun projects',
    githubCompressor: 'https://github.com/petarsipka/video-compressor',
    githubNotifier: 'https://github.com/petarsipka/commit-notifier',
    description: `A collection of smaller personal projects built for fun and learning, using Go and Python.
    Video compressor is a project made for my needs to gain disk space by compressing groups of videos arranged into directories and their subdirectories.
    
    Commit notifier is a project made as a Go learning project and also because I couldn't find anything similar on the internet.`,
    tech: ['Go', 'Python'],
    images: [
      { src: './images/1.png' },
    ],
  },
];

// ── NAV: shadow on scroll ──────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── SCROLL REVEAL ─────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  }),
  { threshold: 0.15 }
);
reveals.forEach(el => revealObserver.observe(el));

// ── NAV: active link highlight ────────────────────────────────
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    const active = a.getAttribute('href') === `#${current}`;
    a.style.opacity = active ? '1' : '';
    a.style.color   = active ? 'var(--accent)' : '';
  });
});

// ── MODAL ─────────────────────────────────────────────────────
const overlay    = document.getElementById('modal-overlay');
const modalClose = document.getElementById('modal-close');
const slidesTrack = document.getElementById('slides-track');
const dotsContainer = document.getElementById('slide-dots');
const slidePrev  = document.getElementById('slide-prev');
const slideNext  = document.getElementById('slide-next');
const modalIcon  = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalLinks = document.getElementById('modal-links');
const modalDesc  = document.getElementById('modal-description');
const modalTech  = document.getElementById('modal-tech');
const modalPrev  = document.getElementById('modal-prev');
const modalNext  = document.getElementById('modal-next');
const modalCounter = document.getElementById('modal-counter');
const modalPrevOut = document.getElementById('modal-prev-out');
const modalNextOut = document.getElementById('modal-next-out');

let currentProject = 0;
let currentSlide   = 0;

function buildSlides(project) {
  slidesTrack.innerHTML = '';
  dotsContainer.innerHTML = '';

  project.images.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide';

    if (img.src) {
      const imgEl = document.createElement('img');
      imgEl.className = 'slide-img';
      imgEl.src = img.src;
      imgEl.alt = project.title;
      slide.appendChild(imgEl);
    } else {
      slide.style.background = img.bg;
      const icon = document.createElement('img');
      icon.className = 'slide-placeholder-icon';
      icon.src = project.icon;
      icon.alt = project.title;
      const label = document.createElement('div');
      label.className = 'slide-placeholder-label';
      label.textContent = img.label;
      slide.appendChild(icon);
      slide.appendChild(label);
    }

    slidesTrack.appendChild(slide);

    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to image ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
}

function goToSlide(index) {
  const total = projects[currentProject].images.length;
  currentSlide = (index + total) % total;
  slidesTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === currentSlide);
  });
}

function populateModal(index) {
  const project = projects[index];
  currentSlide  = 0;

  buildSlides(project);
  slidesTrack.style.transform = 'translateX(0)';

  modalIcon.innerHTML = `<img src="${project.icon}" alt="${project.title}">`;
  modalTitle.textContent = project.title;
  modalDesc.textContent  = project.description;

  const linkDefs = [
    { key: 'github',           label: 'GitHub ↗',           cls: 'link-github'    },
    { key: 'githubFrontend',   label: 'Frontend ↗',         cls: 'link-github'    },
    { key: 'githubBackend',    label: 'Backend ↗',          cls: 'link-github'    },
    { key: 'githubCompressor', label: 'Video compressor ↗', cls: 'link-github'    },
    { key: 'githubNotifier',   label: 'Commit notifier ↗',  cls: 'link-github'    },
    { key: 'playStore',        label: 'Play Store ↗',       cls: 'link-playstore' },
    { key: 'appStore',         label: 'App Store ↗',        cls: 'link-appstore'  },
  ];
  modalLinks.innerHTML = linkDefs
    .filter(l => project[l.key] && project[l.key] !== '#')
    .map(l => `<a class="modal-link ${l.cls}" href="${project[l.key]}" target="_blank" rel="noopener noreferrer">${l.label}</a>`)
    .join('');

  modalTech.innerHTML = project.tech
    .map(t => `<span class="tag">${t}</span>`)
    .join('');

  modalCounter.textContent = `${index + 1} / ${projects.length}`;
  modalPrev.disabled = index === 0;
  modalNext.disabled = index === projects.length - 1;
  modalPrevOut.disabled = index === 0;
  modalNextOut.disabled = index === projects.length - 1;
}

function openModal(index) {
  currentProject = index;
  populateModal(index);
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
}

function closeModal() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// Card "View project" buttons
document.querySelectorAll('.card-link').forEach(btn => {
  btn.addEventListener('click', () => openModal(Number(btn.dataset.project)));
});

// Close
modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Slideshow arrows
slidePrev.addEventListener('click', () => goToSlide(currentSlide - 1));
slideNext.addEventListener('click', () => goToSlide(currentSlide + 1));

// Project prev / next
function prevProject() {
  if (currentProject > 0) { currentProject--; populateModal(currentProject); }
}
function nextProject() {
  if (currentProject < projects.length - 1) { currentProject++; populateModal(currentProject); }
}
modalPrev.addEventListener('click', prevProject);
modalNext.addEventListener('click', nextProject);
modalPrevOut.addEventListener('click', prevProject);
modalNextOut.addEventListener('click', nextProject);

// ── HERO NETWORK ANIMATION ─────────────────────────────────
(function () {
  const canvas = document.getElementById('hero-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const ACCENT        = '#00e5a0';
  const CONNECT_DIST  = 155;
  const MOUSE_RADIUS  = 140;
  const NODE_COUNT    = 24;
  const MAX_SPEED     = 0.7;

  const CS_TERMS = [
    'Algorithm', 'O(n log n)', 'Recursion', 'Binary Tree',
    'Hash Map', 'TCP/IP', 'Compiler', 'Neural Net',
    'async/await', 'REST API', 'Docker', 'Git',
    'SQL', 'λ Lambda', 'Regex', 'Mutex',
  ];

  let W, H;
  let nodes = [];
  let mouse = { x: -9999, y: -9999 };
  let animId = null;

  // ── sizing ──────────────────────────────────────────────
  function resize() {
    const dpr = window.devicePixelRatio || 1;
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    if (nodes.length === 0) {
      initNodes();
    } else {
      nodes.forEach(n => {
        n.x = Math.min(Math.max(n.x, n.r + 1), W - n.r - 1);
        n.y = Math.min(Math.max(n.y, n.r + 1), H - n.r - 1);
      });
    }
  }

  // ── init ────────────────────────────────────────────────
  function initNodes() {
    nodes = [];
    // Shuffle terms and assign to first ~half of nodes
    const shuffled = [...CS_TERMS].sort(() => Math.random() - 0.5);
    const labelCount = Math.round(NODE_COUNT * 0.55);

    for (let i = 0; i < NODE_COUNT; i++) {
      const r = 2.5 + Math.random() * 2;
      nodes.push({
        x:  r + Math.random() * (W - 2 * r),
        y:  r + Math.random() * (H - 2 * r),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r,
        label: i < labelCount ? shuffled[i] : null,
      });
    }
  }

  // ── update ──────────────────────────────────────────────
  function update() {
    nodes.forEach(n => {
      // Mouse attraction
      const mdx  = mouse.x - n.x;
      const mdy  = mouse.y - n.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < MOUSE_RADIUS && mdist > 1) {
        const pull = ((MOUSE_RADIUS - mdist) / MOUSE_RADIUS) * 0.014;
        n.vx += (mdx / mdist) * pull;
        n.vy += (mdy / mdist) * pull;
      }

      // Gentle random drift
      n.vx += (Math.random() - 0.5) * 0.025;
      n.vy += (Math.random() - 0.5) * 0.025;

      // Damping
      n.vx *= 0.985;
      n.vy *= 0.985;

      // Speed cap
      const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (spd > MAX_SPEED) { n.vx = (n.vx / spd) * MAX_SPEED; n.vy = (n.vy / spd) * MAX_SPEED; }

      n.x += n.vx;
      n.y += n.vy;

      // Soft bounce
      if (n.x < n.r)      { n.x = n.r;      n.vx = Math.abs(n.vx) * 0.6; }
      if (n.x > W - n.r)  { n.x = W - n.r;  n.vx = -Math.abs(n.vx) * 0.6; }
      if (n.y < n.r)      { n.y = n.r;      n.vy = Math.abs(n.vy) * 0.6; }
      if (n.y > H - n.r)  { n.y = H - n.r;  n.vy = -Math.abs(n.vy) * 0.6; }
    });
  }

  // ── draw ────────────────────────────────────────────────
  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Find nearest neighbour for each node (guarantees every dot has a line)
    const nearest = nodes.map((a, i) => {
      let minDist = Infinity, minJ = -1;
      nodes.forEach((b, j) => {
        if (j === i) return;
        const d = Math.hypot(b.x - a.x, b.y - a.y);
        if (d < minDist) { minDist = d; minJ = j; }
      });
      return minJ;
    });

    // Lines between close nodes + guaranteed nearest-neighbour lines
    const drawnPairs = new Set();
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dist = Math.hypot(b.x - a.x, b.y - a.y);
        const isNearest = nearest[i] === j || nearest[j] === i;
        if (dist > CONNECT_DIST && !isNearest) continue;

        const pairKey = `${i}-${j}`;
        if (drawnPairs.has(pairKey)) continue;
        drawnPairs.add(pairKey);

        const t = isNearest && dist > CONNECT_DIST
          ? 0.15                        // faint but visible for far nearest lines
          : 1 - dist / CONNECT_DIST;
        const aNear = Math.hypot(mouse.x - a.x, mouse.y - a.y) < MOUSE_RADIUS;
        const bNear = Math.hypot(mouse.x - b.x, mouse.y - b.y) < MOUSE_RADIUS;

        if (aNear || bNear) {
          ctx.strokeStyle = `rgba(0,229,160,${(t * 0.65).toFixed(2)})`;
          ctx.lineWidth   = 1.1;
        } else {
          ctx.strokeStyle = `rgba(255,255,255,${(t * 0.11).toFixed(2)})`;
          ctx.lineWidth   = 0.8;
        }

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // Nodes and labels
    nodes.forEach(n => {
      const distM = Math.hypot(mouse.x - n.x, mouse.y - n.y);
      const near  = distM < MOUSE_RADIUS;
      const ratio = near ? Math.max(0, 1 - distM / MOUSE_RADIUS) : 0;

      // Glow for near-mouse nodes
      if (near) {
        const gr = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        gr.addColorStop(0, `rgba(0,229,160,${(ratio * 0.28).toFixed(2)})`);
        gr.addColorStop(1, 'rgba(0,229,160,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = gr;
        ctx.fill();
      }

      // Dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r + (near ? ratio * 1.2 : 0), 0, Math.PI * 2);
      ctx.fillStyle = near
        ? `rgba(0,229,160,${(0.55 + ratio * 0.45).toFixed(2)})`
        : 'rgba(255,255,255,0.5)';
      ctx.fill();

      // Label
      if (n.label) {
        ctx.font         = '10.5px system-ui, -apple-system, sans-serif';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = near
          ? `rgba(0,229,160,${(0.6 + ratio * 0.4).toFixed(2)})`
          : 'rgba(255,255,255,0.28)';
        ctx.fillText(n.label, n.x, n.y - n.r - 7);
      }
    });
  }

  // ── loop ────────────────────────────────────────────────
  function tick() {
    update();
    draw();
    animId = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { cancelAnimationFrame(animId); animId = null; }
    else if (!animId)    { tick(); }
  });

  // ── mouse tracking (section-level so pointer-events:none works) ──
  const heroSection = document.getElementById('hero');
  heroSection.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  heroSection.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  // ── kick off ────────────────────────────────────────────
  resize();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    animId = null;
    resize();
    tick();
  });
  tick();
}());

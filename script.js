

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Scroll progress bar ---------- */
  const progressBar = document.getElementById('scrollProgress');
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  document.querySelectorAll('[data-nav-mobile]').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('[data-nav]');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(sec => navObserver.observe(sec));

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Project modal ---------- */
  const projectData = {
    'resume-analyzer': {
      tag: 'AI / Backend',
      title: 'AI Resume Analyzer',
      problem: 'Job seekers often don\u2019t know how their resume will perform against automated screening (ATS) systems, or what to improve before applying.',
      solution: 'A web platform that accepts a resume, runs it through an AI API for analysis, and returns structured, ATS-style feedback on content and structure.',
      features: [
        'AI-powered resume parsing and analysis',
        'Automated feedback generation via an AI API',
        'Responsive frontend for uploading and reviewing results'
      ],
      stack: ['Python', 'FastAPI', 'AI API', 'HTML', 'CSS', 'JavaScript'],
      contribution: 'Built the backend logic end-to-end with FastAPI and integrated the AI API for feedback generation, alongside the responsive frontend.',
      github: 'https://github.com/balamuruganganesan77-coder',
      demo: null
    },
    'store-system': {
      tag: 'Full-Stack',
      title: 'Low Cost Store Management System',
      problem: 'Small stores often manage product and inventory data manually, making it hard to track stock accurately.',
      solution: 'A store management web application that centralizes product and inventory handling through a REST API backed by an SQL database.',
      features: [
        'Product and inventory management',
        'REST APIs built with FastAPI for backend operations',
        'SQL database integration',
        'Responsive frontend pages'
      ],
      stack: ['Python', 'FastAPI', 'SQL', 'HTML', 'CSS'],
      contribution: 'Designed and built the REST API layer with FastAPI, connected the SQL database, and built the responsive frontend pages.',
      github: 'https://github.com/balamuruganganesan77-coder',
      demo: null
    }
  };

  const modalOverlay = document.getElementById('modalOverlay');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');

  function renderModal(key){
    const data = projectData[key];
    if (!data) return;

    const demoBtn = data.demo
      ? `<a href="${data.demo}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Live Demo</a>`
      : '';

    modalContent.innerHTML = `
      <button class="modal-close" id="modalClose" aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="project-tag">${data.tag}</div>
      <h3>${data.title}</h3>
      <div class="modal-section">
        <h5>Problem</h5>
        <p>${data.problem}</p>
      </div>
      <div class="modal-section">
        <h5>Solution</h5>
        <p>${data.solution}</p>
      </div>
      <div class="modal-section">
        <h5>Key Features</h5>
        <ul>${data.features.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>
      <div class="modal-section">
        <h5>Tech Stack</h5>
        <div class="pin-row">${data.stack.map(s => `<span class="pin">${s}</span>`).join('')}</div>
      </div>
      <div class="modal-section">
        <h5>My Contribution</h5>
        <p>${data.contribution}</p>
      </div>
      <div class="modal-actions">
        <a href="${data.github}" target="_blank" rel="noopener" class="btn btn-ghost btn-sm">GitHub</a>
        ${demoBtn}
      </div>
    `;
    // re-bind the freshly-injected close button
    modalContent.querySelector('.modal-close').addEventListener('click', closeModal);
  }

  function openModal(key){
    renderModal(key);
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-modal]').forEach(card => {
    card.addEventListener('click', () => openModal(card.getAttribute('data-modal')));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.getAttribute('data-modal'));
      }
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) closeModal();
  });

  /* ---------- Contact form (frontend-only) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'This form isn\u2019t connected to a backend yet — please email me directly for now.';
  });

});

/* ========== Certificate Lightbox ========== */
function openCertLightbox(src, caption) {
  const lb     = document.getElementById('certLightbox');
  const img    = document.getElementById('certLightboxImg');
  const cap    = document.getElementById('certLightboxCaption');
  img.src      = src;
  cap.textContent = caption;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCertLightbox() {
  document.getElementById('certLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.getElementById('certLightboxClose');
  const lightbox = document.getElementById('certLightbox');
  if (closeBtn) closeBtn.addEventListener('click', closeCertLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeCertLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertLightbox();
  });
});
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
const navLinks  = document.querySelectorAll('.nav__link');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  const isOpen = navMenu.classList.contains('open');
  navToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const sections = document.querySelectorAll('section[id]');

function activateLink() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
}

window.addEventListener('scroll', activateLink);

const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);

    if (v.length <= 10) {
      v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
      v = v.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }
    e.target.value = v;
  });
}

const form       = document.getElementById('contact-form');
const submitBtn  = document.getElementById('submit-btn');
const btnText    = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const feedback   = document.getElementById('form-feedback');

form.addEventListener('submit', async (e) => {
  e.preventDefault();


  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showFeedback('Por favor, preencha os campos obrigatórios: nome, e-mail e mensagem.', 'error');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showFeedback('Informe um e-mail válido.', 'error');
    return;
  }

  setLoading(true);
  hideFeedback();

  try {
    const response = await fetch('/.netlify/functions/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone: document.getElementById('phone').value.trim(),
        message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      showFeedback('✅ Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      form.reset();
    } else {
      showFeedback(data.error || '❌ Ocorreu um erro. Tente novamente.', 'error');
    }
  } catch (err) {
    showFeedback('❌ Erro de conexão. Verifique sua internet e tente novamente.', 'error');
    console.error(err);
  } finally {
    setLoading(false);
  }
});

function setLoading(loading) {
  submitBtn.disabled = loading;
  btnText.style.display    = loading ? 'none'         : 'flex';
  btnLoading.style.display = loading ? 'inline-flex'  : 'none';
}

function showFeedback(msg, type) {
  feedback.textContent  = msg;
  feedback.className    = `form-feedback ${type}`;
  feedback.style.display = 'block';
  feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideFeedback() {
  feedback.style.display = 'none';
  feedback.className = 'form-feedback';
}

const animatedEls = document.querySelectorAll(
  '.service-card, .testimonial-card, .plan-card, .hero__content, .hero__image'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.style.transform
        .replace('translateY(30px)', 'translateY(0)');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animatedEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  el.style.transform += ' translateY(30px)';
  observer.observe(el);
});
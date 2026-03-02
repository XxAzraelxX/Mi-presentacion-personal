// Desplazamiento suave al hacer clic en los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevenir comportamiento predeterminado del enlace
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
  });
});

// Navbar Responsive
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
}

// Animación de entrada
function animateOnScroll() {
  const elements = document.querySelectorAll('.animate');
  const triggerBottom = window.innerHeight * 0.85;
  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;
    if (boxTop < triggerBottom) el.classList.add('show');
  });
}
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('DOMContentLoaded', animateOnScroll);

// Volver arriba y Header glass effect
const scrollBtn = document.getElementById('scrollTopBtn');
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (scrollBtn) {
    scrollBtn.style.display = (document.documentElement.scrollTop > 300) ? "block" : "none";
  }
  if (header) {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
});

if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({top: 0, behavior: 'smooth'});
    });
}

// Modo oscuro
const themeBtn = document.getElementById('toggle-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function setDark(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  if (themeBtn) {
      themeBtn.innerHTML = enabled ? '☀️' : '🌙';
      themeBtn.title = enabled ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }
  localStorage.setItem('darkMode', enabled ? '1' : '0');
}

if (themeBtn) {
    themeBtn.addEventListener('click', () =>
      setDark(!document.body.classList.contains('dark-mode'))
    );
}

window.addEventListener('DOMContentLoaded', () => {
  const dark = localStorage.getItem('darkMode');
  setDark(dark ? dark === '1' : prefersDark);
});

// Validación de formulario
document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (form && status) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        status.textContent = '';
        // Validación local
        form.querySelectorAll('.form-group').forEach(group => {
          const input = group.querySelector('input, textarea');
          const error = group.querySelector('.error-message');
          if (!input.value.trim()) {
            error.textContent = 'Este campo es obligatorio';
            valid = false;
          } else if (input.type === 'email' && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.value)) {
            error.textContent = 'Correo electrónico inválido';
            valid = false;
          } else {
            error.textContent = '';
          }
        });
        // Si todo es válido, enviamos a Formspree
        if (valid) {
          status.textContent = 'Enviando...';
          status.style.color = '#2563eb';
          const data = new FormData(form);
          fetch(form.action, {
            method: form.method,
            body: data,
            headers: { 'Accept': 'application/json' }
          }).then(response => {
            if (response.ok) {
              status.textContent = '¡Mensaje enviado correctamente!';
              status.style.color = '#16a34a';
              form.reset();
            } else {
              response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                  status.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                  status.textContent = "Error al enviar, intenta de nuevo.";
                }
                status.style.color = "#dc2626";
              });
            }
          }).catch(() => {
            status.textContent = "Error al enviar, verifica tu conexión.";
            status.style.color = "#dc2626";
          });
        } else {
          status.textContent = 'Por favor corrige los errores.';
          status.style.color = '#dc2626';
        }
      });
  }
});

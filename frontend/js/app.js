/* ===== UI UTILITIES ===== */
class UI {
  static showAlert(message, type = 'info', duration = 5000) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} show`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);

    if (duration > 0) {
      setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 300);
      }, duration);
    }

    return alertDiv;
  }

  static showSpinner(element) {
    element.innerHTML = '<div class="spinner"></div>';
  }

  static clearErrors() {
    document.querySelectorAll('.form-control.error').forEach(el => {
      el.classList.remove('error');
    });
  }

  static showError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.classList.add('error');
      const errorDiv = field.parentElement.querySelector('.form-error');
      if (errorDiv) {
        errorDiv.textContent = message;
      }
    }
  }

  static openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  }

  static closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  }

  static toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    }
  }

  static formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  static formatTime(time) {
    return time.substring(0, 5);
  }

  static formatDateTime(datetime) {
    return new Date(datetime).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

/* ===== FORM VALIDATION ===== */
class FormValidator {
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validatePassword(password) {
    return password.length >= 6;
  }

  static validateForm(fields) {
    UI.clearErrors();
    let isValid = true;

    for (const [fieldName, rules] of Object.entries(fields)) {
      const field = document.querySelector(`[name="${fieldName}"]`);
      if (!field) continue;

      const value = field.value.trim();

      if (rules.required && !value) {
        UI.showError(fieldName, 'Este campo es requerido');
        isValid = false;
        continue;
      }

      if (rules.email && !this.validateEmail(value)) {
        UI.showError(fieldName, 'Email inválido');
        isValid = false;
      }

      if (rules.minLength && value.length < rules.minLength) {
        UI.showError(fieldName, `Mínimo ${rules.minLength} caracteres`);
        isValid = false;
      }

      if (rules.match) {
        const matchField = document.querySelector(`[name="${rules.match}"]`);
        if (matchField && value !== matchField.value) {
          UI.showError(fieldName, 'Las contraseñas no coinciden');
          isValid = false;
        }
      }
    }

    return isValid;
  }
}

/* ===== EVENT LISTENERS ===== */
document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', () => UI.toggleMenu());
  }

  // Modal close buttons
  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('show');
      }
    });
  });

  // Close modal on outside click
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
      }
    });
  });
});

/* ===== UTILITIES ===== */
function getFormData(formId) {
  const form = document.getElementById(formId);
  if (!form) return null;
  
  const formData = new FormData(form);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  return data;
}

function resetForm(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.reset();
    UI.clearErrors();
  }
}

/* ===== AUTH UTILITIES ===== */
class Auth {
  static isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  static getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    api.logout();
    window.location.href = 'index.html';
  }

  static requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }

  static updateNavBar() {
    const navAuth = document.querySelector('.nav-auth');
    if (!navAuth) return;

    if (this.isAuthenticated()) {
      const user = this.getUser();
      navAuth.innerHTML = `
        <span class="user-info">Hola, <strong>${user?.nombre || 'Usuario'}</strong></span>
        <button class="btn btn-secondary btn-small" onclick="Auth.logout()">Cerrar Sesión</button>
      `;
    } else {
      navAuth.innerHTML = `
        <a href="login.html" class="btn btn-primary btn-small">Iniciar Sesión</a>
        <a href="register.html" class="btn btn-secondary btn-small">Registrarse</a>
      `;
    }
  }
}

// Actualizar navbar al cargar
document.addEventListener('DOMContentLoaded', () => {
  Auth.updateNavBar();
});

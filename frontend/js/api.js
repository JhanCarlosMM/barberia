/* ===== API SERVICE ===== */
const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json'
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async handleResponse(response) {
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Error en la solicitud');
    }
    return data;
  }

  // ===== AUTH =====
  async register(nombre, email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ nombre, email, password })
    });
    return this.handleResponse(response);
  }

  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password })
    });
    const data = await this.handleResponse(response);
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // ===== BARBEROS =====
  async getBarbers() {
    const response = await fetch(`${API_BASE_URL}/barbers`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ===== CORTES =====
  async getHaircuts() {
    const response = await fetch(`${API_BASE_URL}/haircuts`, {
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }

  // ===== DISPONIBILIDAD =====
  async getAvailableSlots(barberoId, fecha, duracion = 30) {
    const params = new URLSearchParams({
      barbero_id: barberoId,
      fecha: fecha,
      duracion_minutos: duracion
    });
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
    
    try {
      const response = await fetch(`${API_BASE_URL}/availability?${params}`, {
        headers: this.getHeaders(),
        signal: controller.signal
      });
      return this.handleResponse(response);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // ===== CITAS =====
  async createAppointment(barberoId, tipoCorteId, inicioTime) {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        barbero_id: barberoId,
        tipo_corte_id: tipoCorteId,
        inicio_time: inicioTime
      })
    });
    return this.handleResponse(response);
  }

  async getUserAppointments() {
    const response = await fetch(`${API_BASE_URL}/appointments`, {
      method: 'GET',
      headers: this.getHeaders()
    });
    return this.handleResponse(response);
  }
}

// Instancia global
const api = new ApiService();

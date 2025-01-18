// src/services/api.js
import axios from 'axios';

// Configuração global do Axios
const api = axios.create({
  baseURL: 'http://localhost:5117/api', // URL base da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

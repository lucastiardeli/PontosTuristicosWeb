import api from './api';

const login = async (email, password) => {
  try {
    const response = await api.post('/Auth/login', {
      email,
      senha: password,
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Erro ao tentar fazer login.';
  }
};

const getUserData = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    throw error;
  }
};

const getTiposUsuarios = async () => {
  try {
    const response = await api.get('/TiposUsuarios');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar os tipos de usuários');
  }
};

const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post('/Usuarios', usuarioData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao cadastrar usuário');
  }
};

const getPontosTuristicos = async (page = 1, limit = 5, search = '') => {
  try {
    const response = await api.get('/PontosTuristicos', {
      params: {
        _page: page,
        _limit: limit,
        q: search,
      },
    });
    console.log('teste', response);
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Erro ao buscar pontos turísticos.';
  }
};

export { login, getUserData, getTiposUsuarios, createUsuario, getPontosTuristicos };
// Export default como objeto
export default {
  login,
  getUserData,
  getTiposUsuarios,
  createUsuario,
  getPontosTuristicos,
};

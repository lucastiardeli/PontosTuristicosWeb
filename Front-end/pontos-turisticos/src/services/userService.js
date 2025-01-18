import api from './api';

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
    const response = await axios.get(`${API_URL}/TiposUsuarios`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao buscar os tipos de usuários');
  }
};

const createUsuario = async (usuarioData) => {
  try {
    const response = await axios.post(`${API_URL}/Usuarios`, usuarioData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao cadastrar usuário');
  }
};

export { getUserData, getTiposUsuarios, createUsuario };

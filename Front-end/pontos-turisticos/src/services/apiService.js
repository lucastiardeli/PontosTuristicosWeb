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
    throw new Error('Erro ao buscar os tipos de usuários', error);
  }
};

const createPontoTuristico = async (pontoTuristicoData) => {
  console.log('pontoTuristicoData ', pontoTuristicoData);
  try {
    const response = await api.post('/PontosTuristicos', pontoTuristicoData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao cadastrar o Ponto Turístico', error);
  }
};

const createUsuario = async (usuarioData) => {
  try {
    const response = await api.post('/Usuarios', usuarioData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao cadastrar usuário', error);
  }
};

const updatePontoTuristico = async (idPontoTuristico, pontoTuristicoData) => {
  console.log(idPontoTuristico);
  console.log(pontoTuristicoData);
  try {
    const response = await api.put(`/PontosTuristicos/${idPontoTuristico}`, pontoTuristicoData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar o ponto turístico', error);
  }
};

const deletePontoTuristico = async (idPontoTuristico) => {
  try {
    const response = await api.delete(`/PontosTuristicos/${idPontoTuristico}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao excluir o ponto turístico', error);
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
    console.log('testee ', response);
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Erro ao buscar pontos turísticos.';
  }
};

const getPontosTuristicosUsuario = async (idUsuario, page = 1, limit = 5, search = '') => {
  console.log(idUsuario);

  try {
    const response = await api.get(`/PontosTuristicos/usuario/${idUsuario}`, {
      params: {
        _page: page,
        _limit: limit,
        q: search,
      },
    });
    console.log('Pontos turísticos do usuário:', response);
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Erro ao buscar pontos turísticos do usuário.';
  }
};

export {
  login,
  getUserData,
  getTiposUsuarios,
  createUsuario,
  getPontosTuristicos,
  createPontoTuristico,
  getPontosTuristicosUsuario,
  updatePontoTuristico,
  deletePontoTuristico,
};
// Export default como objeto
export default {
  login,
  getUserData,
  getTiposUsuarios,
  createUsuario,
  getPontosTuristicos,
  createPontoTuristico,
  getPontosTuristicosUsuario,
  updatePontoTuristico,
  deletePontoTuristico,
};

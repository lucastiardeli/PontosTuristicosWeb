import api from './api';

// TODOS OS GETS
const getUserData = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter dados do usuário:', error);
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
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Erro ao buscar pontos turísticos.';
  }
};

const getPontosTuristicosUsuario = async (idUsuario, page = 1, limit = 5, search = '') => {
  try {
    const response = await api.get(`/PontosTuristicos/usuario/${idUsuario}`, {
      params: {
        _page: page,
        _limit: limit,
        q: search,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Erro ao buscar pontos turísticos do usuário.';
  }
};

const getPerfilUsuario = async (idUsuario) => {
  try {
    const response = await api.get(`/Usuarios/${idUsuario}`);
    return response.data;
  } catch (err) {
    throw err.response?.data || 'Erro ao buscar dados do usuário.';
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

// TODOS OS POSTS
const createPontoTuristico = async (pontoTuristicoData) => {
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
    if (error.response) {
      if (error.response.status === 409) {
        alert('Usuário já cadastrado!');
        throw new Error('Erro ao cadastrar o Ponto Turístico', error);
      }
    }
  }
};

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

// TODOS OS UPDATES
const updatePontoTuristico = async (idPontoTuristico, pontoTuristicoData) => {
  try {
    const response = await api.put(`/PontosTuristicos/${idPontoTuristico}`, pontoTuristicoData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar o ponto turístico', error);
  }
};

const updateTipoUsuario = async (idPontoTuristico) => {
  try {
    const response = await api.put(`/Usuarios/${idPontoTuristico}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar o Tipo do Usuário', error);
  }
};

const updateFoto = async (idPontoTuristico) => {
  try {
    const response = await api.put(`/PontosTuristicos/${idPontoTuristico}/remover-foto`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao excluir foto', error);
  }
};

// TODOS OS DELETES
const deletePontoTuristico = async (idPontoTuristico) => {
  try {
    const response = await api.delete(`/PontosTuristicos/${idPontoTuristico}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao excluir o ponto turístico', error);
  }
};

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
  getPerfilUsuario,
  updateTipoUsuario,
  updateFoto,
};

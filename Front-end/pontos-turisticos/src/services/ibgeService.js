import axios from 'axios';

const API_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades/';

// Função para obter os estados, ordenados pela sigla
const getEstados = async () => {
  try {
    const response = await axios.get(`${API_URL}estados/`);
    const estadosOrdenados = response.data.sort((a, b) => a.sigla.localeCompare(b.sigla));
    return estadosOrdenados;
  } catch (error) {
    throw new Error('Erro ao carregar os estados');
  }
};

// Função para obter os municípios de um estado, ordenados pelo nome
const getMunicipios = async (uf) => {
  try {
    const response = await axios.get(`${API_URL}estados/${uf}/municipios`);
    const municipiosOrdenados = response.data.sort((a, b) => a.nome.localeCompare(b.nome));
    return municipiosOrdenados;
  } catch (error) {
    throw new Error('Erro ao carregar os municípios');
  }
};

export { getEstados, getMunicipios };

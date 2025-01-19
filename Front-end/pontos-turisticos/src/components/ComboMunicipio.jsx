import React, { useState, useEffect } from 'react';
import { getMunicipios } from '../services/ibgeService';
import '../styles/Combo.css';

const ComboMunicipio = ({ uf, onMunicipioChange, municipioSelecionado }) => {
    const [municipios, setMunicipios] = useState([]);
    const [erro, setErro] = useState(null);
    const [inputMunicipio, setInputMunicipio] = useState('');
    const [filtrados, setFiltrados] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false); // Nova flag

    useEffect(() => {
        if (uf) {
            const fetchMunicipios = async () => {
                try {
                    const data = await getMunicipios(uf);
                    setMunicipios(data);
                    setFiltrados(data);
                } catch (error) {
                    setErro('Erro ao carregar os municípios');
                }
            };
            fetchMunicipios();
        }
    }, [uf]);

    useEffect(() => {
        if (municipioSelecionado) {
            setInputMunicipio(municipioSelecionado); // Atualiza o valor do input
        }
    }, [municipioSelecionado]);

    const handleInputChange = (event) => {
        const valor = event.target.value;
        setInputMunicipio(valor);

        // Exibe sugestões quando o usuário digita
        setShowSuggestions(true);

        // Filtra os municípios com base no valor do input
        const municipiosFiltrados = municipios.filter((municipio) =>
            municipio.nome.toLowerCase().includes(valor.toLowerCase())
        );
        setFiltrados(municipiosFiltrados);
    };

    const handleMunicipioSelect = (municipioNome) => {
        setInputMunicipio(municipioNome); // Atualiza o input com o município selecionado
        setFiltrados([]); // Limpa a lista de sugestões
        setShowSuggestions(false); // Oculta as sugestões
        onMunicipioChange(municipioNome); // Notifica o componente pai
    };

    const handleInputBlur = () => {
        // Aguarda um pequeno intervalo antes de ocultar as sugestões
        setTimeout(() => setShowSuggestions(false), 100);
    };

    const handleInputFocus = () => {
        // Mostra sugestões somente se o input já tiver texto
        if (inputMunicipio) {
            setShowSuggestions(true);
        }
    };

    return (
        <div className="col-12">
            <input
                type="text"
                className="form-control"
                id="municipio"
                name="municipio"
                value={inputMunicipio}
                onChange={handleInputChange}
                onBlur={handleInputBlur} // Oculta sugestões ao perder o foco
                onFocus={handleInputFocus} // Mostra sugestões ao focar, se necessário
                placeholder="Digite a cidade"
            />
            {showSuggestions && filtrados.length > 0 && (
                <ul className="suggestions">
                    {filtrados.map((municipio) => (
                        <li
                            key={municipio.id}
                            onClick={() => handleMunicipioSelect(municipio.nome)}
                        >
                            {municipio.nome}
                        </li>
                    ))}
                </ul>
            )}
            {erro && <div className="text-danger">{erro}</div>}
        </div>
    );
};

export default ComboMunicipio;

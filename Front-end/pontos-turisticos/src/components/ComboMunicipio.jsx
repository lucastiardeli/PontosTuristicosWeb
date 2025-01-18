import React, { useState, useEffect } from 'react';
import { getMunicipios } from '../services/ibgeService';
import '../styles/Combo.css';

const ComboMunicipio = ({ uf, onMunicipioChange }) => {
    const [municipios, setMunicipios] = useState([]);
    const [erro, setErro] = useState(null);
    const [inputMunicipio, setInputMunicipio] = useState('');
    const [filtrados, setFiltrados] = useState([]);

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

    const handleInputChange = (event) => {
        const valor = event.target.value;
        setInputMunicipio(valor);

        // Filtrando os municipios
        const municipiosFiltrados = municipios.filter((municipio) =>
            municipio.nome.toLowerCase().includes(valor.toLowerCase())
        );
        setFiltrados(municipiosFiltrados);
    };

    const handleMunicipioSelect = (municipioNome) => {
        setInputMunicipio(municipioNome);
        setFiltrados([]);
        onMunicipioChange(municipioNome);
    };

    return (
        <div className="col-12">
            <input type="text" className="form-control" id="municipio" name="municipio" value={inputMunicipio} onChange={handleInputChange} placeholder="Digite a cidade" />
            {filtrados.length > 0 && inputMunicipio && (
                <ul className="suggestions">
                    {filtrados.map((municipio) => (
                        <li key={municipio.id} onClick={() => handleMunicipioSelect(municipio.nome)}>
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
import React, { useState, useEffect } from 'react';
import { getEstados } from '../services/ibgeService';
import '../styles/Combo.css';

const ComboEstado = ({ onEstadoChange, estadoSelecionado }) => {
    const [estados, setEstados] = useState([]);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const fetchEstados = async () => {
            try {
                const data = await getEstados();
                setEstados(data);
            } catch (error) {
                setErro('Erro ao carregar os estados');
            }
        };

        fetchEstados();
    }, []);

    return (
        <div className="form-group col-12">
            <select
                id="estado"
                className="form-control"
                name="estado"
                onChange={(e) => onEstadoChange(e.target.value)}
                value={estadoSelecionado} // Passa o valor selecionado
            >
                <option value="">...</option>
                {erro ? (
                    <option value="">{erro}</option>
                ) : (
                    estados.map((estado) => (
                        <option key={estado.id} value={estado.sigla}>
                            {estado.sigla}
                        </option>
                    ))
                )}
            </select>
        </div>
    );
};

export default ComboEstado;

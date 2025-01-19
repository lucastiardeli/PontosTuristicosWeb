import React from 'react';
import '../styles/CardPontoTuristico.css';

const CardTuristico = ({ tourist, verDetalhes }) => {
    return (
        <div className="card-turistico col-12">
            <h5 className="card-title">{tourist.nome}</h5>
            <p className="card-description">{tourist.referencia}</p>
            <button onClick={() => verDetalhes(tourist)}>Ver Detalhes</button>
        </div>
    );
};

export default CardTuristico;
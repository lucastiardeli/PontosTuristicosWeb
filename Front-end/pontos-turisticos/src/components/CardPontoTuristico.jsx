import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CardPontoTuristico.css';

const CardTuristico = ({ tourist }) => {
    console.log('tourist ', tourist);
    return (
        <div className="card-turistico col-12">
            <h5 className="card-title">{tourist.nome}</h5>
            <p className="card-description">{tourist.referencia}</p>
            <a href={`/detalhes/${tourist.id}`} >
                Ver detalhes
            </a>
        </div>
    );
};

export default CardTuristico;
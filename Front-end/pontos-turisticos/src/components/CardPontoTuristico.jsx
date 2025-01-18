import React from 'react';
import PropTypes from 'prop-types';
import '../styles/CardPontoTuristico.css'; // Certifique-se de criar ou ajustar o estilo conforme necessário

const CardTuristico = ({ tourist }) => {
    return (
        <div className="card-turistico">
            <div className="card">
                <img src={tourist.imagemUrl || 'default-image.jpg'} alt={tourist.nome} className="card-img" />
                <div className="card-body">
                    <h5 className="card-title">{tourist.nome}</h5>
                    <p className="card-description">{tourist.descricao}</p>
                    <a href={`/detalhes/${tourist.id}`} className="btn btn-primary">
                        Ver detalhes
                    </a>
                </div>
            </div>
        </div>
    );
};

// Definir tipos de dados esperados para a propriedade `tourist`
CardTuristico.propTypes = {
    tourist: PropTypes.shape({
        id: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        imagemUrl: PropTypes.string,
    }).isRequired,
};

export default CardTuristico;

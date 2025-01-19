import React from 'react';
import Modal from 'react-bootstrap/Modal';
import '../styles/ModalDetalhesPonto.css';

const ModalDetalhesPonto = ({ showModal, hideModel, pontoData }) => {
    return (
        <Modal show={showModal} onHide={hideModel} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Detalhes do Ponto Turístico</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='col-12'>
                    <div className='row'>
                        <div className='col-6 pr-5'>

                            <div className="form-group">
                                <label><strong>Nome</strong></label>
                                <p>{pontoData.nome}</p>
                            </div>

                            <div className="form-group col-12">
                                <div className="row">
                                    <div className="col-2">
                                        <label><strong>Estado</strong></label>
                                        <p>{pontoData.estado}</p>
                                    </div>

                                    <div className="col-10">
                                        <label><strong>Cidade</strong></label>
                                        <p>{pontoData.cidade}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label><strong>Referência</strong></label>
                                <p>{pontoData.referencia}</p>
                            </div>

                            <div className="form-group">
                                <label><strong>Descrição</strong></label>
                                <p>{pontoData.descricao}</p>
                            </div>
                        </div>

                        <div className='col-6'>
                            <div className="form-group">
                                <img src={`http://localhost:5117/imagens/${pontoData.foto}`} alt='SEM IMAGEM' width="100%" />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ModalDetalhesPonto;

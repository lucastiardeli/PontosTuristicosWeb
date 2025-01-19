import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ComboEstado from '../components/ComboEstado';
import ComboMunicipio from '../components/ComboMunicipio';
import '../styles/ModalEditarPonto.css';

const ModalEditarPonto = ({ showModal, pontoEdit, handleImageChange, handleInputChange, handleSaveEdit, handleCloseModal }) => {
    const [erroGeral, setErroGeral] = useState('');

    const handleSave = () => {
        const { nome, estado, cidade, descricao } = pontoEdit;

        // Validação dos campos obrigatórios
        if (!nome || !estado || !cidade || !descricao) {
            setErroGeral('Preencha todos os campos obrigatórios!');
            return;
        }

        setErroGeral('');
        handleSaveEdit();
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Ponto Turístico</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {erroGeral && <div className="alert alert-danger">{erroGeral}</div>}

                {pontoEdit && (
                    <div>
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={pontoEdit.nome}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group col-12">
                            <div className="row">
                                <div className="col-2">
                                    <label>Estado</label>
                                    <ComboEstado
                                        estadoSelecionado={pontoEdit.estado}
                                        onEstadoChange={(e) => {
                                            handleInputChange({
                                                target: { name: 'estado', value: e },
                                            });
                                        }}
                                    />
                                </div>

                                <div className="col-10">
                                    <label>Cidade</label>
                                    <ComboMunicipio
                                        uf={pontoEdit.estado}
                                        municipioSelecionado={pontoEdit.cidade}
                                        onMunicipioChange={(municipio) => {
                                            handleInputChange({
                                                target: { name: 'cidade', value: municipio },
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Referência</label>
                            <input
                                type="text"
                                className="form-control"
                                name="referencia"
                                value={pontoEdit.referencia}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea
                                className="form-control"
                                name="descricao"
                                value={pontoEdit.descricao}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nova foto</label>
                            <input
                                type="file"
                                className="form-control"
                                name="foto"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <div className="col-12">
                    <button
                        id="btnConfirmar"
                        className="col-6"
                        type="button"
                        onClick={handleSave}
                    >
                        Salvar alterações
                    </button>
                    <button
                        id="btnCancelar"
                        className="col-6"
                        type="button"
                        onClick={handleCloseModal}
                    >
                        Cancelar
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarPonto;

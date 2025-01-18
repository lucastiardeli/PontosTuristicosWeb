import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ComboEstado from '../components/ComboEstado'; // Importe o componente ComboEstado
import ComboMunicipio from '../components/ComboMunicipio'; // Importe o componente ComboMunicipio

const ModalEditarPonto = ({ showModal, pontoEdit, handleInputChange, handleSaveEdit, handleCloseModal }) => {
    return (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Ponto Turístico</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                            <label>Imagem URL</label>
                            <input
                                type="text"
                                className="form-control"
                                name="imagemUrl"
                                value={pontoEdit.imagemUrl}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Usando o ComboEstado para selecionar o estado */}
                        <div className="form-group">
                            <label>Estado</label>
                            <ComboEstado
                                estadoSelecionado={pontoEdit.estado}  // Passando o estado selecionado
                                onEstadoChange={(e) => {
                                    handleInputChange({
                                        target: { name: 'estado', value: e }
                                    });
                                }}
                            />

                        </div>

                        {/* Usando o ComboMunicipio para selecionar a cidade */}
                        <div className="form-group">
                            <label>Cidade</label>
                            <ComboMunicipio
                                uf={pontoEdit.estado}  // Passando a UF selecionada (estado)
                                municipioSelecionado={pontoEdit.cidade}  // Passando o município selecionado
                                onMunicipioChange={(municipio) => {
                                    handleInputChange({
                                        target: { name: 'municipio', value: municipio }
                                    });
                                }}
                            />
                        </div>

                        {/* Campo de Referência */}
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
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSaveEdit}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalEditarPonto;

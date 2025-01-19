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
                            <input type="text" className="form-control" name="nome" value={pontoEdit.nome} onChange={handleInputChange} />
                        </div>

                        <div className="form-group col-12">
                            <div className="row">
                                <div className="col-2">
                                    <label>Estado</label>
                                    <ComboEstado
                                        estadoSelecionado={pontoEdit.estado}
                                        onEstadoChange={(e) => {
                                            handleInputChange({
                                                target: { name: 'estado', value: e }
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
                                                target: { name: 'municipio', value: municipio }
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Referência</label>
                            <input type="text" className="form-control" name="referencia" value={pontoEdit.referencia} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Descrição</label>
                            <textarea className="form-control" name="descricao" value={pontoEdit.descricao} onChange={handleInputChange} />
                        </div>

                        <div className="form-group">
                            <label>Imagem URL</label>
                            <input type="text" className="form-control" name="imagemUrl" value={pontoEdit.imagemUrl} onChange={handleInputChange} />
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
        </Modal >
    );
};

export default ModalEditarPonto;

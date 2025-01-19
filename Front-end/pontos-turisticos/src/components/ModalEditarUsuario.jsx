import React, { Component } from 'react';
import '../styles/ModalEditarUsuario.css'; // Opcional: Adicione estilos para o modal

class ModalEditarUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.usuario, // Inicializa os campos com os valores recebidos via props
        };
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSave = () => {
        this.props.onSave(this.state); // Passa os dados atualizados para o componente pai
    };

    render() {
        const { nome, email, dataNascimento, celular, cpf } = this.state;
        const { onClose } = this.props;

        return (
            <div className="modal-container">
                <div className="modal-content">
                    <h2>Editar Usuário</h2>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={nome}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dataNascimento">Data de Nascimento</label>
                            <input
                                type="date"
                                id="dataNascimento"
                                name="dataNascimento"
                                value={dataNascimento}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="celular">Celular</label>
                            <input
                                type="text"
                                id="celular"
                                name="celular"
                                value={celular}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input
                                type="text"
                                id="cpf"
                                name="cpf"
                                value={cpf}
                                onChange={this.handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleSave} className="btn btn-primary">Salvar</button>
                        <button onClick={onClose} className="btn btn-secondary">Cancelar</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModalEditarUsuario;

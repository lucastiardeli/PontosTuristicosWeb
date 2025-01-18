import React, { Component } from 'react';
import apiService from '../services/apiService';
import ModalEditarPonto from '../components/ModalEditarPonto';

class PontosTuristicosUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pontos: [],
            error: null,
            page: 1,
            totalPages: 1,
            search: '',
            showModal: false,
            pontoEdit: null,
        };
    }

    componentDidMount() {
        const idUsuario = localStorage.getItem('idUsuario');
        if (!idUsuario) {
            this.setState({ error: 'Usuário não está logado.' });
            return;
        }
        this.fetchPontosTuristicos(idUsuario);
    }

    fetchPontosTuristicos = async (idUsuario) => {
        const { page, search } = this.state;

        try {
            const response = await apiService.getPontosTuristicosUsuario(idUsuario, page, 5, search);
            this.setState({
                pontos: response.pontosTuristicos,
                totalPages: Math.ceil(response.totalCount / 5),
            });
        } catch (error) {
            this.setState({ error: 'Erro ao buscar pontos turísticos.' });
        }
    };

    handleEdit = (idPontoTuristico) => {
        console.log('idPontoTuristico', idPontoTuristico);
        const ponto = this.state.pontos.find((p) => p.idPontoTuristico === idPontoTuristico);
        this.setState({ showModal: true, pontoEdit: ponto });
    };

    handleSaveEdit = async () => {
        const { pontoEdit } = this.state;
        if (!pontoEdit) return;

        try {
            console.log('pontoEdit ', pontoEdit)
            const updatedPonto = await apiService.updatePontoTuristico(pontoEdit.idPontoTuristico, pontoEdit);
            console.log('Ponto turístico atualizado:', updatedPonto);

            // Atualiza a lista de pontos turísticos após a edição
            const idUsuario = localStorage.getItem('idUsuario');
            this.fetchPontosTuristicos(idUsuario);

            // Fecha o modal
            this.setState({ showModal: false, pontoEdit: null });
        } catch (error) {
            console.error('Erro ao salvar edição:', error);
        }
    };

    handleDelete = async (idPontoTuristico) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este ponto turístico?');
        if (confirmDelete) {
            try {
                await apiService.deletePontoTuristico(idPontoTuristico);
                this.setState((prevState) => ({
                    pontos: prevState.pontos.filter((ponto) => ponto.idPontoTuristico !== idPontoTuristico), // Atualiza a lista removendo o ponto excluído
                }));
            } catch (error) {
                console.error('Erro ao excluir ponto turístico:', error);
                alert('Erro ao excluir o ponto turístico.'); // Mensagem de erro
            }
        }
    };

    handlePageChange = (newPage) => {
        this.setState({ page: newPage }, () => {
            const idUsuario = localStorage.getItem('idUsuario');
            this.fetchPontosTuristicos(idUsuario);
        });
    };

    handleSearchChange = (event) => {
        this.setState({ search: event.target.value, page: 1 }, () => {
            const idUsuario = localStorage.getItem('idUsuario');
            this.fetchPontosTuristicos(idUsuario);
        });
    };

    handleInputChange = (e) => {
        const { pontoEdit } = this.state;
        this.setState({
            pontoEdit: {
                ...pontoEdit,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, pontoEdit: null });
    };

    render() {
        const { pontos, error, page, totalPages, search, showModal, pontoEdit } = this.state;

        if (error) {
            return <p style={{ color: 'red' }}>{error}</p>;
        }

        return (
            <div className="container">
                <h1>Meus Pontos Turísticos</h1>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar ponto turístico"
                    value={search}
                    onChange={this.handleSearchChange}
                />

                {pontos.length > 0 ? (
                    <>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Imagem</th>
                                    <th>Estado</th>
                                    <th>Cidade</th>
                                    <th>Referência</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pontos.map((ponto) => (
                                    <tr key={ponto.id}>
                                        <td>{ponto.nome}</td>
                                        <td>{ponto.descricao}</td>
                                        <td>
                                            <img
                                                src={ponto.imagemUrl || 'default-image.jpg'}
                                                alt={ponto.nome}
                                                width="100"
                                            />
                                        </td>
                                        <td>{ponto.estado}</td> {/* Exibindo o Estado */}
                                        <td>{ponto.cidade}</td> {/* Exibindo a Cidade */}
                                        <td>{ponto.referencia}</td> {/* Exibindo a Referência */}
                                        <td>
                                            <button
                                                onClick={() => this.handleEdit(ponto.idPontoTuristico)}
                                                className="btn btn-warning"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => this.handleDelete(ponto.idPontoTuristico)}
                                                className="btn btn-danger ml-2"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Paginação */}
                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-secondary"
                                onClick={() => this.handlePageChange(page - 1)}
                                disabled={page === 1}
                            >
                                Anterior
                            </button>
                            <span>
                                Página {page} de {totalPages}
                            </span>
                            <button
                                className="btn btn-secondary"
                                onClick={() => this.handlePageChange(page + 1)}
                                disabled={page === totalPages}
                            >
                                Próxima
                            </button>
                        </div>

                        {/* Modal para editar ponto turístico */}
                        <ModalEditarPonto
                            showModal={showModal}
                            pontoEdit={pontoEdit}
                            handleInputChange={this.handleInputChange}
                            handleSaveEdit={this.handleSaveEdit}
                            handleCloseModal={this.handleCloseModal}
                        />
                    </>
                ) : (
                    <p>Você ainda não cadastrou nenhum ponto turístico.</p>
                )}
            </div>
        );
    }
}

export default PontosTuristicosUsuario;

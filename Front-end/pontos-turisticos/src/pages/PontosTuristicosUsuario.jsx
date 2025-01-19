import React, { Component } from 'react';
import apiService from '../services/apiService';
import ModalEditarPonto from '../components/ModalEditarPonto';
import '../styles/PontosTuristicosUsuario.css'

class PontosTuristicosUsuario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pontos: [],
            error: null,
            page: 1,
            totalPages: 1,
            limit: 10,
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
        const { page, limit, search } = this.state;

        try {
            const response = await apiService.getPontosTuristicosUsuario(idUsuario, page, limit, search);
            this.setState({
                pontos: response.pontosTuristicos,
                totalPages: Math.ceil(response.totalCount / limit),
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

        if (error) return <p style={{ color: 'red' }}>{error}</p>;

        return (
            <div className="container">

                <h1>Meus Pontos Turísticos</h1>

                <input type="text" className="form-control" placeholder="Buscar ponto turístico" value={search} onChange={this.handleSearchChange} />

                {pontos.length > 0 ? (
                    <>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th>Imagem</th>
                                    <th>Nome</th>
                                    <th>Referência</th>
                                    <th>Descrição</th>
                                    <th>Estado</th>
                                    <th>Cidade</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pontos.map((ponto) => (
                                    <tr key={ponto.id}>
                                        <td>
                                            <img src={`http://localhost:5117/imagens/${ponto.foto}`} alt='SEM IMAGEM' width="75" />
                                        </td>
                                        <td>{ponto.nome}</td>
                                        <td>{ponto.referencia}</td>
                                        <td>{ponto.descricao}</td>
                                        <td>{ponto.estado}</td>
                                        <td>{ponto.cidade}</td>
                                        <td>
                                            <button onClick={() => this.handleEdit(ponto.idPontoTuristico)} id="btnEditar">
                                                Editar
                                            </button>
                                            <button onClick={() => this.handleDelete(ponto.idPontoTuristico)} id="btnExcluir">
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="pagination d-flex justify-content-between">
                            <button onClick={() => this.handlePageChange(page - 1)} disabled={page === 1}>Voltar</button>
                            <span className='pt-2'> Página {page} de {totalPages} </span>
                            <button onClick={() => this.handlePageChange(page + 1)} disabled={page === totalPages}>Avançar</button>
                        </div>

                        <ModalEditarPonto showModal={showModal} pontoEdit={pontoEdit} handleInputChange={this.handleInputChange} handleSaveEdit={this.handleSaveEdit} handleCloseModal={this.handleCloseModal} />
                    </>) : (<p>Você ainda não cadastrou nenhum ponto turístico.</p>)}
            </div>
        );
    }
}

export default PontosTuristicosUsuario;

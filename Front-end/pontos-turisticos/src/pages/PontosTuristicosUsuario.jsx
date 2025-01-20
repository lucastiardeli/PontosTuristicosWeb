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
            limit: 5,
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
        const ponto = this.state.pontos.find((p) => p.idPontoTuristico === idPontoTuristico);
        this.setState({
            showModal: true,
            pontoEdit: {
                ...ponto,
                fotoOriginal: ponto.foto,
            }
        });
    };

    handleSaveEdit = async () => {
        const { pontoEdit } = this.state;
        if (!pontoEdit) return;

        const pontoParaSalvar = {
            ...pontoEdit,
            foto: pontoEdit.foto && pontoEdit.foto !== pontoEdit.fotoOriginal ? pontoEdit.foto : pontoEdit.fotoOriginal,
        };
        try {
            const updatedPonto = await apiService.updatePontoTuristico(pontoEdit.idPontoTuristico, pontoParaSalvar);

            const idUsuario = localStorage.getItem('idUsuario');
            this.fetchPontosTuristicos(idUsuario);
            this.setState({ showModal: false, pontoEdit: null });

        } catch (error) {
            console.error('Erro ao salvar edição:', error);
        }
    };

    // Realizar exclusão e atualizar paginação
    handleDelete = async (idPontoTuristico) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir este ponto turístico?');
        if (confirmDelete) {
            try {
                await apiService.deletePontoTuristico(idPontoTuristico);

                const idUsuario = localStorage.getItem('idUsuario');

                const { page, limit } = this.state;
                const response = await apiService.getPontosTuristicosUsuario(idUsuario, page, limit, this.state.search);
                const totalPages = Math.ceil(response.totalCount / limit);

                const newPage = page > totalPages ? totalPages : page;

                this.setState({
                    pontos: response.pontosTuristicos,
                    totalPages,
                    page: newPage,
                });
            } catch (error) {
                console.error('Erro ao excluir ponto turístico:', error);
            }
        }
    };

    // Realizar exclusão da foto
    handleDeleteFoto = async (idPontoTuristico) => {
        const confirmDelete = window.confirm('Tem certeza que deseja excluir a foto?');
        if (confirmDelete) {
            try {
                await apiService.updateFoto(idPontoTuristico);

                const idUsuario = localStorage.getItem('idUsuario');
                this.fetchPontosTuristicos(idUsuario);
            } catch (error) {
                console.error('Erro ao excluir foto:', error);
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

    handleImageChange = (event) => {
        const { pontoEdit } = this.state;
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                this.setState({
                    pontoEdit: {
                        ...pontoEdit,
                        foto: base64String,
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, pontoEdit: null });
    };

    render() {
        const { pontos, error, page, totalPages, search, showModal, pontoEdit } = this.state;

        if (error) return <p style={{ color: 'red' }}>{error}</p>;

        return (
            <div className="container">

                <h1 className='logo'>Meus Pontos Turísticos</h1>

                <div className='offset-3 col-6'>
                    <input type="text" className="form-control" placeholder="Buscar ponto turístico" value={search} onChange={this.handleSearchChange} />
                </div>

                {pontos.length > 0 ? (
                    <>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th>Foto</th>
                                    <th>Nome</th>
                                    <th>Referência</th>
                                    <th>Descrição</th>
                                    <th>Estado</th>
                                    <th>Cidade</th>
                                    <th>Data/Hora inclusão</th>
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
                                        <td>{new Date(ponto.inclusaoDataHora).toLocaleString('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                        })}</td>
                                        <td className="custom-width">
                                            <button onClick={() => this.handleEdit(ponto.idPontoTuristico)} id="btnEditar">
                                                Editar
                                            </button>
                                            <button onClick={() => this.handleDelete(ponto.idPontoTuristico)} id="btnExcluir">
                                                Excluir
                                            </button>
                                            <button onClick={() => this.handleDeleteFoto(ponto.idPontoTuristico)} id="btnExcluir">
                                                Excluir Foto
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

                        <ModalEditarPonto showModal={showModal} pontoEdit={pontoEdit} handleImageChange={this.handleImageChange} handleInputChange={this.handleInputChange} handleSaveEdit={this.handleSaveEdit} handleCloseModal={this.handleCloseModal} />
                    </>) : (<p className='text-center text-white pt-5 '>Nenhum Ponto Turístico encontrado.</p>)}
            </div>
        );
    }
}

export default PontosTuristicosUsuario;

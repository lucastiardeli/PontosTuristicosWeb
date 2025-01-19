import React, { Component } from 'react';
import apiService from '../services/apiService';
import CardPontoTuristico from '../components/CardPontoTuristico';
import '../styles/Home.css';
import ModalDetalhesPonto from '../components/ModalDetalhesPonto';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourists: [],
            search: '',
            currentPage: 1,
            totalPages: 1,
            limit: 5,
            hasSearched: false,
            showModal: false, // Controle do modal
            selectedTourist: null, // Dados do ponto turístico selecionado
        };
    }

    componentDidMount() { }

    fetchTourists = async () => {
        const { currentPage, limit, search } = this.state;

        try {
            const response = await apiService.getPontosTuristicos(currentPage, limit, search);
            const { pontosTuristicos, totalCount } = response;

            this.setState({
                tourists: pontosTuristicos,
                totalPages: Math.ceil(totalCount / limit),
                hasSearched: true,
            });
        } catch (error) {
            console.error('Erro ao buscar pontos turísticos:', error);
        }
    };

    handleSearchChange = (e) => {
        const searchValue = e.target.value;
        this.setState({ search: searchValue }, () => {
            if (searchValue === '') {
                this.setState({ tourists: [], hasSearched: false });
            }
        });
    };

    handleSearchClick = () => {
        this.setState({ currentPage: 1, hasSearched: false }, this.fetchTourists);
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSearchClick();
        }
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage }, this.fetchTourists);
    };

    openModal = (tourist) => {
        this.setState({ showModal: true, selectedTourist: tourist });
    };

    closeModal = () => {
        this.setState({ showModal: false, selectedTourist: null });
    };

    render() {
        const { tourists, search, currentPage, totalPages, hasSearched, showModal, selectedTourist } = this.state;

        return (
            <div className="container">
                <div className="home col-12">
                    <div className="busca offset-3 col-9">
                        <div className='row'>
                            <div className='col-6'>
                                <input className="form-control search-input col-12" type="text" placeholder="Digite para buscar..." value={search} onChange={this.handleSearchChange} onKeyPress={this.handleKeyPress} />
                            </div>
                            <div className='col-2'>
                                <button onClick={this.handleSearchClick} className="col-12">Buscar</button>
                            </div>
                        </div>
                    </div>

                    {hasSearched && (
                        <div className="row offset-3 col-6 mt-5">
                            {Array.isArray(tourists) && tourists.length > 0 ? (
                                tourists.map((tourist) => (
                                    <CardPontoTuristico key={tourist.id} tourist={tourist} verDetalhes={this.openModal} />
                                ))
                            ) : (
                                <p>Nenhum ponto turístico encontrado.</p>
                            )}

                            {tourists.length > 0 && (
                                <div className="pagination">
                                    <div className="col-2">
                                        <button disabled={currentPage === 1} onClick={() => this.handlePageChange(currentPage - 1)}>
                                            Voltar
                                        </button>
                                    </div>
                                    <div className="col-10 text-center pt-2">
                                        <span> Página {currentPage} de {totalPages} </span>
                                    </div>
                                    <div className="col-2">
                                        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => this.handlePageChange(currentPage + 1)}>
                                            Avançar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {selectedTourist && (<ModalDetalhesPonto showModal={showModal} hideModel={this.closeModal} pontoData={selectedTourist} />)}
                </div>
            </div>
        );
    }
}

export default Home;

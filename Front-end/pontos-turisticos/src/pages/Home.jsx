import React, { Component } from 'react';
import apiService from '../services/apiService';
import CardPontoTuristico from '../components/CardPontoTuristico';
import '../styles/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourists: [],           // Lista de pontos turísticos
            search: '',             // Termo de busca
            currentPage: 1,         // Página atual
            totalPages: 1,          // Total de páginas
            limit: 5,               // Limite de pontos turísticos por página
            hasSearched: false,     // Flag para verificar se a busca foi realizada
        };
    }

    // Não realizar busca no componentDidMount
    componentDidMount() {
        // Não chamar a fetchTourists aqui, pois queremos esperar o clique no botão
    }

    fetchTourists = async () => {
        const { currentPage, limit, search } = this.state;

        try {
            const response = await apiService.getPontosTuristicos(currentPage, limit, search);
            const { pontosTuristicos, totalCount } = response;

            console.log('response teste ', response);
            this.setState({
                tourists: pontosTuristicos,
                totalPages: Math.ceil(totalCount / limit),
                hasSearched: true, // Marca que a busca foi realizada
            });
        } catch (error) {
            console.error('Erro ao buscar pontos turísticos:', error);
        }
    };

    handleSearchChange = (e) => {
        const searchValue = e.target.value;
        this.setState({ search: searchValue }, () => {
            // Se o campo de busca estiver vazio, não exibe os pontos turísticos
            if (searchValue === '') {
                this.setState({ tourists: [], hasSearched: false });
            }
        });
    };

    handleSearchClick = () => {
        this.setState({ currentPage: 1, hasSearched: false }, this.fetchTourists); // Reinicia a busca e flag
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleSearchClick(); // Realiza a busca ao pressionar Enter
        }
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage }, this.fetchTourists);
    };

    render() {
        const { tourists, search, currentPage, totalPages, hasSearched } = this.state;

        return (
            <div className="container">
                <div className="home">
                    <div className="offset-3 col-4">
                        <h1>Pontos Turísticos</h1>
                        <div className='row'>
                            <input type="text" placeholder="Digite para buscar..." value={search} onChange={this.handleSearchChange} onKeyPress={this.handleKeyPress} className="form-control search-input col-10" />
                            <button onClick={this.handleSearchClick} className="btn btn-primary mt-2 col-2">Buscar</button>
                        </div>
                    </div>

                    {/* Renderiza os pontos turísticos após a busca */}
                    {hasSearched && (
                        <div className="row offset-3 col-6 mt-5">
                            {Array.isArray(tourists) && tourists.length > 0 ? (
                                tourists.map((tourist) => (
                                    <CardPontoTuristico key={tourist.id} tourist={tourist} />
                                ))
                            ) : (
                                <p>Nenhum ponto turístico encontrado.</p>
                            )}

                            {/* Renderização condicional da paginação */}
                            {tourists.length > 0 && (
                                <div className="pagination">
                                    <div className="col-2">
                                        <button
                                            disabled={currentPage === 1}
                                            onClick={() => this.handlePageChange(currentPage - 1)}
                                        >
                                            Anterior
                                        </button>
                                    </div>
                                    <div className="col-10 text-center pt-2">
                                        <span> Página {currentPage} de {totalPages} </span>
                                    </div>
                                    <div className="col-2">
                                        <button
                                            disabled={currentPage === totalPages || totalPages === 0}
                                            onClick={() => this.handlePageChange(currentPage + 1)}
                                        >
                                            Próxima
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Home;

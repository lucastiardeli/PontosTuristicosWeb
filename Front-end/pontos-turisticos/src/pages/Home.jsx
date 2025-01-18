import React, { Component } from 'react';
import apiService from '../services/apiService';
import CardPontoTuristico from '../components/CardPontoTuristico';
import '../styles/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourists: [],
            search: '',           // Termo de busca
            currentPage: 1,       // Página atual
            totalPages: 1,        // Total de páginas
            limit: 5,             // Limite de pontos turísticos por página
        };
    }

    componentDidMount() {
        this.fetchTourists();
    }

    fetchTourists = async () => {
        const { currentPage, limit, search } = this.state;

        try {
            const response = await apiService.getPontosTuristicos(currentPage, limit, search);
            const { data, totalRecords } = response; // Certifique-se de que sua API retorna `totalRecords`.

            this.setState({
                tourists: data,
                totalPages: Math.ceil(totalRecords / limit),
            });
        } catch (error) {
            console.error('Erro ao buscar pontos turísticos:', error);
        }
    };

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value, currentPage: 1 }, this.fetchTourists);
    };

    handlePageChange = (newPage) => {
        this.setState({ currentPage: newPage }, this.fetchTourists);
    };

    render() {
        const { tourists, search, currentPage, totalPages } = this.state;

        return (
            <div className="container">
                <div className="home">
                    <div className="col-12">
                        <h1>Pontos Turísticos</h1>
                        <input type="text" placeholder="Digite para buscar..." value={search} onChange={this.handleSearchChange} className="form-control search-input" />
                    </div>

                    <div className="tourist-list">
                        {Array.isArray(tourists) && tourists.length > 0 ? (
                            tourists.map((tourist) => (
                                <CardPontoTuristico key={tourist.id} tourist={tourist} />
                            ))
                        ) : (
                            <p>Nenhum ponto turístico encontrado.</p>
                        )}
                    </div>
                    <div className="pagination">
                        <button disabled={currentPage === 1} onClick={() => this.handlePageChange(currentPage - 1)}>
                            Anterior
                        </button>
                        <span>
                            Página {currentPage} de {totalPages}
                        </span>
                        <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => this.handlePageChange(currentPage + 1)}>
                            Próxima
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;

import React, { Component } from 'react';
import apiService from '../services/apiService';
import ComboEstado from '../components/ComboEstado';
import ComboMunicipo from '../components/ComboMunicipio';
import '../styles/AddPontoTuristico.css';

class AddTourist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            descricao: '',
            referencia: '',
            estadoSelecionado: '',
            municipioSelecionado: ''
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { nome, descricao, referencia, estadoSelecionado, municipioSelecionado } = this.state;

        try {
            const response = await apiService.createPontoTuristico({
                nome,
                descricao,
                referencia,
                estado: estadoSelecionado,
                cidade: municipioSelecionado,
                inclusaoDataHora: new Date().toISOString(),
                idUsuario: localStorage.getItem("idUsuario")
            });

            console.log('Resposta da API:', response);
            alert('Ponto turístico adicionado com sucesso!');
            this.setState({ nome: '', descricao: '', referencia: '', estadoSelecionado: '', municipioSelecionado: '' });
        } catch (error) {
            console.error('Erro ao adicionar ponto turístico:', error);
            alert('Erro ao adicionar ponto turístico. Por favor, tente novamente.');
        }
    };

    handleEstadoChange = (uf) => {
        this.setState({ estadoSelecionado: uf, municipioSelecionado: '' });
    };

    handleMunicipioChange = (municipio) => {
        this.setState({ municipioSelecionado: municipio });
    };

    render() {
        const { nome, descricao, referencia, estadoSelecionado } = this.state;

        return (
            <div className="add-tourist">
                <div className="container col-6">
                    <h1>Adicionar Ponto Turístico</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group col-12">
                            <label className="col-12 form-label required" htmlFor="nome">Nome</label>
                            <input className="col-12 form-control" type="text" name="nome" placeholder="Nome" value={nome} onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-12">
                            <label className="col-12 form-label required" htmlFor="uf/cidade">UF/Cidade</label>
                            <div className="col-12">
                                <div class='row'>
                                    <ComboEstado onEstadoChange={this.handleEstadoChange} />
                                    <ComboMunicipo uf={estadoSelecionado} onMunicipioChange={this.handleMunicipioChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-12">
                            <label className="col-12" htmlFor="referencia">Referência</label>
                            <input className="col-12" type="text" name="referencia" placeholder="Referência" value={referencia} onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-12">
                            <label className="col-12 form-label required" htmlFor="descricao">Descrição</label>
                            <textarea className="col-12 form-control" name="descricao" placeholder="Descrição" value={descricao} onChange={this.handleChange} />
                        </div>

                        <div className="col-lg-12">
                            <button id="btnConfirmar" className="col-12" type="submit">Adicionar</button>
                        </div>
                    </form>
                </div >
            </div >
        );
    }
}

export default AddTourist;

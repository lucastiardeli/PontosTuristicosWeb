import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
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
            municipioSelecionado: '',
            imagem: null,
            errors: {}
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1];
                this.setState({ imagem: base64String });
            };
            reader.readAsDataURL(file);
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { nome, descricao, referencia, estadoSelecionado, municipioSelecionado, imagem } = this.state;

        if (!nome || !descricao || !estadoSelecionado || !municipioSelecionado) {
            this.setState({ errors: { geral: 'Preencha todos os campos obrigatórios!' } });
            return;
        }

        try {
            const response = await apiService.createPontoTuristico({
                nome,
                descricao,
                referencia,
                estado: estadoSelecionado,
                cidade: municipioSelecionado,
                idUsuario: localStorage.getItem("idUsuario"),
                foto: imagem
            });

            this.props.navigate('/my-ponto-turistico');
            this.setState({ nome: '', descricao: '', referencia: '', estadoSelecionado: '', municipioSelecionado: '', imagem: null });
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
        const { nome, descricao, referencia, estadoSelecionado, errors } = this.state;

        return (
            <div className="add-tourist">
                <div className="container col-6">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className='text-center'>Adicionar Ponto Turístico</h1>

                        {errors.geral && <div className="alert alert-danger m-2">{errors.geral}</div>}

                        <div className="form-group col-12">
                            <label className="col-12 form-label required" htmlFor="nome">Nome</label>
                            <input className="col-12 form-control" type="text" name="nome" placeholder="Nome" maxLength="50" value={nome} onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-12">
                            <div className='row'>
                                <div className="col-2">
                                    <label className="col-12 form-label required" htmlFor="uf">UF</label>
                                    <ComboEstado onEstadoChange={this.handleEstadoChange} />
                                </div>
                                <div className="col-10">
                                    <label className="col-12 form-label required" htmlFor="cidade">Cidade</label>
                                    <ComboMunicipo uf={estadoSelecionado} onMunicipioChange={this.handleMunicipioChange} />
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-12">
                            <label className="col-12" htmlFor="referencia">Referência</label>
                            <input className="col-12" type="text" name="referencia" placeholder="Referência" maxLength="100" value={referencia} onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-12">
                            <label className="col-12 form-label required" htmlFor="descricao">Descrição</label>
                            <textarea className="col-12 form-control" name="descricao" placeholder="Descrição" maxLength="100" value={descricao} onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-12">
                            <label className="col-12" htmlFor="imagem">Imagem</label>
                            <input className="col-12" type="file" name="imagem" onChange={this.handleImageChange} />
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

function AddTouristWrapper(props) {
    const navigate = useNavigate();
    return <AddTourist {...props} navigate={navigate} />;
}

export default AddTouristWrapper;
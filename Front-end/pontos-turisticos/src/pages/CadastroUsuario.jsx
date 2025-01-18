import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComboEstado from '../componentes/ComboEstado';
import ComboMunicipo from '../componentes/ComboMunicipio';
import '../componentesCSS/ComboMunicipio.css';
import { getTiposUsuarios, createUsuario } from '../services/apiService';

class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            senha: '',
            dataNascimento: '',
            celular: '',
            cpf: '',
            estadoSelecionado: '',
            municipioSelecionado: '',
            foto: null,
            idTipoUsuario: '',
            tiposUsuarios: []
        };
    }

    componentDidMount() {
        // Usando o serviço para obter os tipos de usuários
        getTiposUsuarios()
            .then(tiposUsuarios => {
                this.setState({ tiposUsuarios });
            })
            .catch(error => {
                console.error('Erro ao buscar os Tipos de Usuários:', error);
            });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        this.setState({ foto: e.target.files[0] });
    };

    handleEstadoChange = (uf) => {
        this.setState({ estadoSelecionado: uf, municipioSelecionado: '' });
    };

    handleMunicipioChange = (municipio) => {
        this.setState({ municipioSelecionado: municipio });
    };

    handleTest = () => {
        const navigate = useNavigate();
        navigate("/login");
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { idTipoUsuario, nome, email, senha, dataNascimento, celular, cpf, estadoSelecionado, municipioSelecionado, foto } = this.state;

        if (foto) {
            // Renomear a imagem com um nome aleatório
            const novoNome = `${Date.now()}-${Math.random().toString(36).substring(7)}.${foto.name.split('.').pop()}`;
            const renamedFile = new File([foto], novoNome, { type: foto.type });

            // Simular envio ao backend
            // console.log('FormData:', { ...formData, foto: renamedFile });
            alert('Cadastro realizado com sucesso!');
        } else {
            //  console.log('FormData:', formData);
            alert('Cadastro realizado com sucesso!');
        }

        // Usando o serviço para criar o usuário
        createUsuario({
            idTipoUsuario, nome, email, senha, dataNascimento, celular, cpf, estado: estadoSelecionado, cidade: municipioSelecionado, ativo, foto, inclusaoDataHora: new Date().toISOString()
        })
            .then(response => {
                console.log('Resposta da API:', response);
                alert('Cadastro realizado com sucesso');
                const navigate = useNavigate();
                navigate("/login");
                this.setState({
                    nome: '',
                    email: '',
                    senha: '',
                    dataNascimento: '',
                    celular: '',
                    cpf: '',
                    estadoSelecionado: '',
                    municipioSelecionado: '',
                    foto: null,
                    idTipoUsuario: '',
                    tiposUsuarios: []
                });
            })
            .catch(error => {
                console.error('Erro ao cadastrar usuário:', error);
            });
    };

    render() {
        const {
            nome,
            email,
            senha,
            dataNascimento,
            celular,
            cpf,
            estadoSelecionado,
            foto,
            tiposUsuarios
        } = this.state;

        return (
            <div className="container col-4 mt-4">
                <h2>Cadastro de Usuário</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="mb-3 col-12">
                        <label htmlFor="nome" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={this.handleInputChange} maxLength="50" />
                    </div>

                    <div className="mb-3 col-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={this.handleInputChange} maxLength="40" />
                    </div>

                    <div className="mb-3 col-6">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="senha" name="senha" value={senha} onChange={this.handleInputChange} />
                    </div>

                    <div className="row">
                        <div className="mb-3 col-4">
                            <label htmlFor="dataNascimento" className="form-label">Data de Nascimento</label>
                            <input type="date" className="form-control" id="dataNascimento" name="dataNascimento" value={dataNascimento} onChange={this.handleInputChange} />
                        </div>

                        <div className="mb-3 col-4">
                            <label htmlFor="celular" className="form-label">Celular</label>
                            <input type="text" className="form-control" id="celular" name="celular" value={celular} onChange={this.handleInputChange} maxLength="11" placeholder="Somente números" />
                        </div>

                        <div className="mb-3 col-4">
                            <label htmlFor="cpf" className="form-label">CPF</label>
                            <input type="text" className="form-control" id="cpf" name="cpf" value={cpf} onChange={this.handleInputChange} maxLength="11" placeholder="Somente números" />
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            <div className='col-2'>
                                <label className="col-12" htmlFor="UF"> UF </label>
                                <ComboEstado onEstadoChange={this.handleEstadoChange} />
                            </div>
                            <div className='col-10'>
                                <label className="col-12" htmlFor="Cidade"> Cidade </label>
                                <ComboMunicipo uf={estadoSelecionado} onMunicipioChange={this.handleMunicipioChange} />
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            <label className="col-12" htmlFor="idTipoUsuario"> Tipo de Usuário </label>
                            <div className="col-12">
                                <select id="idTipoUsuario" className="form-control" name="idTipoUsuario" onChange={this.handleInputChange}>
                                    <option value="">Selecione...</option>
                                    {tiposUsuarios.map(tipo => (
                                        <option key={tipo.idTipoUsuario} value={tipo.idTipoUsuario}>
                                            {tipo.descricao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="foto" className="form-label">Foto</label>
                        <input type="file" className="form-control" id="foto" name="foto" accept="image/*" onChange={this.handleFileChange} />
                    </div>

                    <button type="submit" className="btn btn-success">Cadastrar</button>
                    <button type="button" onClick={this.handleTest} className="btn btn-danger">Cancelar</button>
                </form>
            </div>
        );
    }
}

export default Cadastro;
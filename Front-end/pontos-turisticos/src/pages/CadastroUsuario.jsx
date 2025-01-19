import React, { Component } from 'react';
import ComboEstado from '../components/ComboEstado';
import ComboMunicipo from '../components/ComboMunicipio';
import '../styles/CadastroUsuario.css';
import { getTiposUsuarios, createUsuario } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

class Cadastro extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            email: '',
            senha: '',
            confirmarSenha: '',
            dataNascimento: '',
            celular: '',
            cpf: '',
            estadoSelecionado: '',
            municipioSelecionado: '',
            idTipoUsuario: '',
            tiposUsuarios: [],
            errors: {}
        };
    }

    componentDidMount() {
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

    handleEstadoChange = (uf) => {
        this.setState({ estadoSelecionado: uf, municipioSelecionado: '' });
    };

    handleMunicipioChange = (municipio) => {
        this.setState({ municipioSelecionado: municipio });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { idTipoUsuario, nome, email, senha, confirmarSenha, dataNascimento, celular, cpf, estadoSelecionado, municipioSelecionado } = this.state;

        // Validação de senha
        if (senha !== confirmarSenha) {
            this.setState({ errors: { senha: 'As senhas não coincidem' } });
            return;
        }

        // Validação de CPF e celular
        const cpfValido = this.validarCPF(cpf);
        const celularValido = this.validarCelular(celular);

        if (!cpfValido) {
            this.setState({ errors: { cpf: 'CPF inválido' } });
            return;
        }

        if (!celularValido) {
            this.setState({ errors: { celular: 'Celular inválido' } });
            return;
        }

        // Realizar a criação do usuário
        createUsuario({
            idTipoUsuario,
            nome,
            email,
            senha,
            dataNascimento,
            celular: celular.replace(/\D/g, ''),
            cpf: cpf.replace(/\D/g, ''),
            estado: estadoSelecionado,
            cidade: municipioSelecionado,
            inclusaoDataHora: new Date().toISOString(),
        })
            .then(() => {
                alert('Cadastro realizado com sucesso!');
                this.setState({
                    idTipoUsuario: '',
                    nome: '',
                    email: '',
                    senha: '',
                    confirmarSenha: '',
                    dataNascimento: '',
                    celular: '',
                    cpf: '',
                    estadoSelecionado: '',
                    municipioSelecionado: '',
                    errors: {},
                });
                this.props.navigate('/login'); // Navegar para a página de login
            })
            .catch((error) => {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Erro ao realizar cadastro. Tente novamente.');
            });
    };


    handleDataNascimentoChange = (e) => {
        const { value } = e.target;
        // Verifica se o valor está no formato correto (yyyy-mm-dd)
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (regex.test(value)) {
            this.setState({ dataNascimento: value });
        } else {
            // Se o formato não for correto, você pode mostrar um erro ou apenas não permitir a mudança
            this.setState({ errors: { dataNascimento: 'Data de nascimento inválida' } });
        }
    };

    handleEmailChange = (e) => {
        const { value } = e.target;
        // Expressão regular para validar o formato de email
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (regex.test(value)) {
            this.setState({ email: value, errors: {} });
        } else {
            this.setState({ email: value, errors: { email: 'Email inválido' } });
        }
    };

    validarCPF(cpf) {
        cpf = cpf.replace(/\D/g, '');
        const regex = /^\d{11}$/;
        return regex.test(cpf);
    }


    validarCelular(celular) {
        celular = celular.replace(/\D/g, '');
        const regex = /^\d{11}$/;
        return regex.test(celular);
    }


    formatarCelular = (e) => {
        let celular = e.target.value.replace(/\D/g, '');
        if (celular.length > 10) {
            celular = celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (celular.length > 5) {
            celular = celular.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
        } else if (celular.length > 2) {
            celular = celular.replace(/(\d{2})(\d{0,5})/, '($1) $2');
        }
        this.setState({ celular });
    };

    formatarCPF = (e) => {
        let cpf = e.target.value.replace(/\D/g, '');
        if (cpf.length > 9) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        } else if (cpf.length > 5) {
            cpf = cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
        } else if (cpf.length > 2) {
            cpf = cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
        }
        this.setState({ cpf });
    };

    render() {
        const {
            nome,
            email,
            senha,
            confirmarSenha,
            dataNascimento,
            celular,
            cpf,
            estadoSelecionado,
            tiposUsuarios,
            errors
        } = this.state;

        return (
            <div className="add-user container col-5 mt-4">
                <form onSubmit={this.handleSubmit}>
                    <h1>Cadastro de Usuário</h1>

                    <div className="mb-3 col-12">
                        <label htmlFor="nome" className="form-label required">Nome</label>
                        <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={this.handleInputChange} maxLength="50" />
                    </div>

                    <div className="mb-3 col-12">
                        <label htmlFor="email" className="form-label required">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={this.handleEmailChange} maxLength="40" />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>

                    <div className='row'>

                        <div className="mb-3 col-6">
                            <label htmlFor="senha" className="form-label required">Senha</label>
                            <input type="password" className="form-control" id="senha" name="senha" value={senha} onChange={this.handleInputChange} />
                        </div>

                        <div className="mb-3 col-6">
                            <label htmlFor="confirmarSenha" className="form-label required">Confirmar Senha</label>
                            <input type="password" className="form-control" id="confirmarSenha" name="confirmarSenha" value={confirmarSenha} onChange={this.handleInputChange} />
                            {errors.senha && <small className="text-danger">{errors.senha}</small>}
                        </div>
                    </div>

                    <div className="row">
                        <div className="mb-3 col-6">
                            <label htmlFor="dataNascimento" className="form-label required">Dt. Nascimento</label>
                            <input type="date" className="form-control" id="dataNascimento" name="dataNascimento" value={dataNascimento} onChange={this.handleDataNascimentoChange} />
                            {errors.dataNascimento && <small className="text-danger">{errors.dataNascimento}</small>}
                        </div>

                        <div className="mb-3 col-6">
                            <label htmlFor="celular" className="form-label required">Celular</label>
                            <input type="text" className="form-control" id="celular" name="celular" value={celular} onChange={this.formatarCelular} maxLength="15" />
                            {errors.celular && <small className="text-danger">{errors.celular}</small>}
                        </div>

                        <div className="mb-3 col-6">
                            <label htmlFor="cpf" className="form-label required">CPF</label>
                            <input type="text" className="form-control" id="cpf" name="cpf" value={cpf} onChange={this.formatarCPF} maxLength="14" />
                            {errors.cpf && <small className="text-danger">{errors.cpf}</small>}
                        </div>

                        <div className="mb-3 col-6">
                            <label className="col-12 form-label required" htmlFor="idTipoUsuario">Tipo de Usuário</label>
                            <div className="col-12">
                                <select id="idTipoUsuario" className="form-control" name="idTipoUsuario" onChange={this.handleInputChange}>
                                    <option value="">...</option>
                                    {tiposUsuarios.map(tipo => (
                                        <option key={tipo.idTipoUsuario} value={tipo.idTipoUsuario}>
                                            {tipo.descricao}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            <div className='col-2'>
                                <label className="col-12 form-label required" htmlFor="UF">UF</label>
                                <ComboEstado onEstadoChange={this.handleEstadoChange} />
                            </div>
                            <div className='col-10'>
                                <label className="col-12 form-label required" htmlFor="Cidade">Cidade</label>
                                <ComboMunicipo uf={estadoSelecionado} onMunicipioChange={this.handleMunicipioChange} />
                            </div>
                        </div>
                    </div>

                    <button id="btnConfirmar" className="col-6" type="submit">Cadastrar</button>
                    <button id="btnTenhoLogin" className="col-6" type="button" onClick={() => this.props.navigate('/login')}>Já tenho login</button>
                </form>
            </div>
        );
    }
}

// Envolva o componente com o hook useNavigate
function CadastroWrapper(props) {
    const navigate = useNavigate();
    return <Cadastro {...props} navigate={navigate} />;
}

export default CadastroWrapper;

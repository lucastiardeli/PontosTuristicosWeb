import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import '../styles/Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleLogin = async (event) => {
        event.preventDefault();

        const { email, password } = this.state;
        const { setUser } = this.props;

        try {
            const { token, tipoUsuario, idUsuario, validade } = await apiService.login(email, password);

            localStorage.setItem("authToken", token);
            localStorage.setItem("tipoUsuario", tipoUsuario);
            localStorage.setItem("idUsuario", idUsuario);
            localStorage.setItem("tokenExpiration", validade);

            setUser(tipoUsuario);

            // Redirecionar o usuário com base no tipo de usuário
            if (tipoUsuario === "guia") {
                this.props.navigate("/add");
            } else {
                this.props.navigate("/");
            }
        } catch (err) {
            this.setState({
                error: err || "Erro ao tentar fazer login.",
            });
        }
    };

    render() {
        const { email, password, error } = this.state;

        return (
            <div className='login-user container col-4'>
                <form onSubmit={this.handleLogin}>
                    <h1>LOGIN</h1>

                    {error && <div className="alert alert-danger m-2">{error}</div>}

                    <div className="mb-3 col-12">
                        <label htmlFor="email" className="form-label required">E-mail</label>
                        <input className='form-control' type="text" name="email" placeholder="E-mail" maxLength={40} value={email} onChange={this.handleInputChange} />
                    </div>

                    <div className="mb-3 col-12">
                        <label htmlFor="password" className="form-label required">Senha</label>
                        <input className='form-control' type="password" name="password" placeholder="Senha" maxLength={10} value={password} onChange={this.handleInputChange} />
                    </div>

                    <div className="col-12">
                        <button id='btnLogar' className="col-6" type="submit">Logar</button>
                        <button id="btnSemCadastro" className="col-6" onClick={() => this.props.navigate('/cadastro-usuario')} type="button">Não possuo cadastro</button>
                    </div>

                </form>
            </div>
        );
    }
}

function LoginWrapper(props) {
    const navigate = useNavigate();
    return <Login {...props} navigate={navigate} />;
}

export default LoginWrapper;
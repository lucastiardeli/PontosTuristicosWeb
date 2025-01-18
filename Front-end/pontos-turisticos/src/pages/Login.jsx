import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';  // Se estiver usando React Router v6
import apiService from '../services/apiService';  // Importando o apiService

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

    handleLogin = async () => {
        const { email, password } = this.state;
        const { setUser } = this.props;

        try {
            const { token, tipoUsuario, validade } = await apiService.login(email, password);

            localStorage.setItem("authToken", token);
            localStorage.setItem("tipoUsuario", tipoUsuario);
            localStorage.setItem("tokenExpiration", validade);

            setUser(tipoUsuario);

            // Redirecionar o usuário com base no tipo de usuário
            if (tipoUsuario === "guia") {
                this.props.navigate("/add");  // Redireciona para admin
            } else {
                this.props.navigate("/");  // Redireciona para pontos turísticos
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
            <div>
                <h2>Login</h2>
                <input type="text" name="email" placeholder="E-mail" value={email} onChange={this.handleInputChange} />
                <input type="password" name="password" placeholder="Senha" value={password} onChange={this.handleInputChange} />
                <button onClick={this.handleLogin}>Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
        );
    }
}

export default Login;
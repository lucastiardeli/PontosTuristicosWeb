import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

class Header extends Component {

    handleLogout = () => {

        localStorage.removeItem("authToken");
        localStorage.removeItem("tipoUsuario");
        localStorage.removeItem("idUsuario");
        localStorage.removeItem("tokenExpiration");

        // Atualizar o estado do usuário para refletir o logout
        this.props.setUser(null);
    }

    render() {

        const { user } = this.props

        // Variavel em lower case para o código não se perder em caixa alta/baixa
        const userLowerCase = user ? user.toLowerCase() : "";

        const handleLinkClick = (event) => {
            if (userLowerCase !== 'guia') {
                event.preventDefault(); // Impede a navegação
                alert('Somente usuários do tipo Guia podem cadastrar Pontos Turísticos, cadastre-se ou faça login!');
            }
        };

        return (
            <header className="header">
                <h1>Essência do Brasil</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/add-ponto-turistico" onClick={handleLinkClick}> Adicionar Ponto </Link>
                    {!userLowerCase && <Link to="/login">Login</Link>}
                    {!userLowerCase && <Link to="/cadastro-usuario">Cadastro</Link>}
                    {userLowerCase === 'guia' && <Link to="/my-ponto-turistico">Meus Pontos Turísticos</Link>}
                    {userLowerCase && <Link to="/meu-perfil">Meu Perfil</Link>}

                    {userLowerCase && <Link to="/login" onClick={this.handleLogout} className="logout-link"> Log out </Link>}
                </nav>
            </header >
        );
    }
}

export default Header;
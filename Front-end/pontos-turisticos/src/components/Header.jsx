import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../componentesCSS/Header.css';

class Header extends Component {

    render() {
        const { user } = this.props
        console.log(user)

        return (
            <header className="header">
                <h1>Pontos Turísticos</h1>
                <nav>
                    <Link to="/pontos-turisticos">Ponto Turisticos</Link>
                    {user && (user === 'admin' || user === 'guia') && <Link to="/add">Adicionar Ponto</Link>}
                    <Link to="/add">Adicionar Ponto</Link>
                    {!user && <Link to="/login">Login</Link>}
                    {!user && <Link to="/cadastro">Cadastro</Link>}
                    {user === 'admin' && <Link to="/admin">Admin</Link>}
                </nav>
            </header >
        );
    }
}

export default Header;
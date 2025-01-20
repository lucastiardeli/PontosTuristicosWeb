import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CadastroUsuario from './pages/CadastroUsuario';
import Login from './pages/Login';
import Home from './pages/Home';
import AddPontoTuristico from './pages/AddPontoTuristico';
import PontosTuristicosUsuario from './pages/PontosTuristicosUsuario';
import PerfilUsuario from './pages/PerfilUsuario';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  setUser = (user) => {
    this.setState({ user });
  };

  componentDidMount() {
    const dataExpiracao = localStorage.getItem('tokenExpiration');

    if (dataExpiracao) {
      const dataExpiracaoDate = new Date(dataExpiracao);
      const dataAtual = new Date();

      if (dataExpiracaoDate < dataAtual) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('tipoUsuario');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('tokenExpiration');
        this.setState({ user: null });
      } else {
        this.setState({ user: localStorage.getItem('tipoUsuario') });
      }
    }
  }

  render() {
    const { user } = this.state;

    return (
      <Router>
        <Header user={user} setUser={this.setUser} />
        <div style={{ padding: '20px', background: '#0e355fbf', height: '25vh' }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/add-ponto-turistico' element={<AddPontoTuristico />} />
            <Route path='/login' element={<Login setUser={this.setUser} />} />
            <Route path='/cadastro-usuario' element={<CadastroUsuario />} />
            <Route path='/my-ponto-turistico' element={<PontosTuristicosUsuario />} />
            <Route path='/meu-perfil' element={<PerfilUsuario atualizarUsuario={this.setUser} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

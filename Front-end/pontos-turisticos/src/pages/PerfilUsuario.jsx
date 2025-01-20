import { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import '../styles/PerfilUsuario.css';

const PerfilUsuario = ({ atualizarUsuario }) => {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState(null);

    const carregarUsuario = async () => {
        const idUsuario = localStorage.getItem('idUsuario');

        if (!idUsuario) {
            setErro('Sessão expirada, faça login novamente.');
            return;
        }

        try {
            const dadosUsuario = await apiService.getPerfilUsuario(idUsuario);
            setUsuario(dadosUsuario);
        } catch (err) {
            setErro(err);
        }
    };

    const alterarTipoUsuario = async () => {
        try {

            await apiService.updateTipoUsuario(localStorage.getItem("idUsuario"));
            const tipoAtual = localStorage.getItem("tipoUsuario");
            const novoTipo = tipoAtual === 'Guia' ? 'Visitante' : 'Guia';
            localStorage.setItem("tipoUsuario", novoTipo);
            carregarUsuario();
            atualizarUsuario(novoTipo);

        } catch (error) {
            setErro("Erro ao alterar o tipo de usuário.");
        }
    };

    useEffect(() => {
        carregarUsuario();
    }, []);

    if (erro) {
        return <div className="alert alert-danger">{erro}</div>;
    }

    if (!usuario) {
        return <div>Carregando dados...</div>;
    }

    function formatarCPF(cpf) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    function formatarCelular(celular) {
        return celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    function formatarDataNascimento(data) {
        const [ano, mes, dia] = data.split('T')[0].split('-');
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <div className='card-perfil offset-3 col-6'>
            <div className="row">

                <h1 className='col-12 text-center pb-5'>PERFIL</h1>

                <div className='offset-1 col-4'>
                    <label htmlFor="nome">Nome</label>
                    <p id="nome">{usuario.nome}</p>
                </div>

                <div className='col-6'>
                    <label htmlFor="email">Email</label>
                    <p id="email">{usuario.email}</p>
                </div>

                <div className='offset-1 col-4'>
                    <label htmlFor="cpf">CPF</label>
                    <p id="cpf">{formatarCPF(usuario.cpf)}</p>
                </div>

                <div className='col-4'>
                    <label htmlFor="dataNascimento">Data de Nascimento</label>
                    <p id="dataNascimento">{formatarDataNascimento(usuario.dataNascimento)}</p>
                </div>

                <div className='col-3'>
                    <label htmlFor="celular">Celular</label>
                    <p id="celular">{formatarCelular(usuario.celular)}</p>
                </div>

                <div className='offset-1 col-4'>
                    <label htmlFor="idTipoUsuario">Tipo de Usuário</label>
                    <p id="idTipoUsuario">{localStorage.getItem("tipoUsuario")}</p>
                </div>

                <div className='col-4'>
                    <label htmlFor="estado">Estado</label>
                    <p id="estado">{usuario.estado}</p>
                </div>

                <div className='col-3'>
                    <label htmlFor="cidade">Cidade</label>
                    <p id="cidade">{usuario.cidade}</p>
                </div>

                <button className='col-12' onClick={alterarTipoUsuario}>
                    {localStorage.getItem("tipoUsuario") === 'Guia' ? 'Mudar o Tipo de Usuário para "VISITANTE"' : 'Mudar o Tipo de Usuário para "GUIA"'}
                </button>
            </div>

        </div>
    );
};

export default PerfilUsuario;

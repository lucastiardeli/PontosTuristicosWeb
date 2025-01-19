import { useEffect, useState } from 'react';
import { getPerfilUsuario } from '../services/apiService';

const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState(null);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const carregarUsuario = async () => {
            const idUsuario = localStorage.getItem('idUsuario');
            if (!idUsuario) {
                setErro('ID do usuário não encontrado no localStorage.');
                return;
            }

            try {
                const dadosUsuario = await getPerfilUsuario(idUsuario);
                setUsuario(dadosUsuario);
            } catch (err) {
                setErro(err);
            }
        };

        carregarUsuario();
    }, []);

    if (erro) {
        return <div className="alert alert-danger">{erro}</div>;
    }

    if (!usuario) {
        return <div>Carregando dados...</div>;
    }

    return (
        <div>
            <h1>Bem-vindo, {usuario.nome}</h1>
            <p>Email: {usuario.email}</p>
            <p>Idade: {usuario.idade}</p>
        </div>
    );
};

export default PerfilUsuario;

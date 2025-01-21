# PontosTuristicosWeb

Teste para desenvolvedor WEB

Como compilar o projeto:

SQL Server:

Primeiramente execute no SQL Server 'CREATE DATABASE PontosTuristicos' para criar o banco de dados, importante ressaltar que o banco deve ser criado no localhost, ou seja, instalado na máquina. O login precisa ser na opção Autenticação com Windows

C#:

Use o Visual Studio Code. Abra o terminal na pasta 'PontosTuristicosAPI' e execute:

dotnet restore
dotnet tool install --global dotnet-ef --version 8.0.0
dotnet build
dotnet ef database update

Após isso execute a API com 'dotnet watch run'.

React:

Use o Visual Studio Code. Abra o terminal na pasta 'pontos-turisticos' e execute:

npm install --legacy-peer-deps
npm install @testing-library/react@latest
npm install
npm update

Após isso use o 'npm start' para iniciar a aplicação, importante ressaltar que a aplicação necessita estar iniciada na porta 3000 do localhost e ela já está configurada para isso.

Explicação do projeto:

Projeto feito com SQL Server, C# asp.net core e React js.

Projeto desenvolvido em 3 camadas, juntamente com Git para controle de versionamento. Na aplicação foi desenvolvido o CRUD proposto no teste, voltado para pontos turísticos mas também foi adicionado outras funcionalidades como o Cadastro e Login de Usuário.

A aplicação utiliza axios, desse modo não atualiza a página desnecessariamente.

Uso do JWT para login, desse modo gerenciando melhor os estados de login. O token gerado expira a cada 1 hora.

A navegação do sistema é totalmente baseado no Header da aplicação, podendo trocar de página através dele. Algumas páginas só podem ser acessadas com o Tipo de Usuário 'Guia' e estar logado na aplicação.

Só poderá cadastrar pontos turísticos usuários logados que possuem o tipo de usuário como 'Guia', é possível alterar o tipo de usuário no perfil do usuário.

Na tela home é possível listar e visualizar detalhes dos pontos turísticos, para isso use a barra de pesquisa com o termo desejado, seja ele, Nome, Referência ou Descrição e clique no botão Buscar ou pressione Enter. A paginação foi aplicada a cada 5 registros.

Também é possível editar e excluir os registros incluídos na opção de 'Meus Pontos Turísticos', também foi implementado a paginação a cada 5 registros. Campo de busca por Nome, Referência ou Descrição.

Quando estiver logado, é possível fazer o 'Log out' na barra de navegação. Ao fazer logout o token JWT é automaticamente expirado.

Foi um prazer desenvolver a aplicação com as tecnologias acima, aprendi bastante com o processo, obrigado pela oportunidade!

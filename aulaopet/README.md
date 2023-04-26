Explicação da estrutura de pastas:

package.json e package-lock.json: arquivos de configuração e dependências do Node.js.
node_modules/: pasta que contém as dependências instaladas pelo npm.
public/: pasta que contém os arquivos estáticos (CSS, JS, imagens, etc.) do site.
views/: pasta que contém os arquivos de visualização (templates) do site, escritos em Handlebars (com extensão .hbs).
data/: pasta que contém os arquivos JSON onde os dados serão salvos.
routes/: pasta que contém os arquivos de rotas do site. O index.js será responsável por rotear as requisições para as outras rotas. O auth.js irá conter as rotas para autenticação e autorização, como login e logout. O dashboard.js irá conter as rotas para a área restrita do site.
middleware/: pasta que contém os middlewares do site, como o middleware de autenticação (authMiddleware.js) e o middleware de tratamento de erros (errorHandler.js).
app.js: arquivo principal do site, onde o Express será configurado e as rotas e middlewares serão adicionados.
server.js: arquivo que irá iniciar o servidor Express.

Esse projeto foi gerado com [Create React App](https://github.com/facebook/create-react-app).

## Scripts disponíves

No diretórrio do projeto execute:

### `npm install`
Instala as dependências do projeto

### `npm start`

Executa a aplicação em modo desenvolvimento.<br />
Abra [http://localhost:3000](http://localhost:3000) para ver no browser.

A página recarrega autometicamente quando editar arquivos do projeto.<br />
Você também pode ver os erros no console.

### `npm test`

Executa no modo de teste.<br />
Veja [running tests](https://facebook.github.io/create-react-app/docs/running-tests) para mais informações.

### `npm run build`

Faz o build da aplicação para produção na pasta `build`.<br />

## Backend

Back-end foi feito em Go. Para subir o serviço é necessário instalar o Go na máquina.

Para subir o serviço navegue até a pasta ~/go/src/github.com/davifelipems/restapi
e execute o comando 
### `go run main.go`
O serviço responde na porta 8000

## API

Só existe um endpoint no projeto. De acordo com parâmetro passado o serviço retorna os dados de maneira diferente:
(s - busca vários registros pelo título)
(t - um registro pelo título)
(i - um registro pelo id)

Exemplo: http://localhost:8000/itens?i=tt7908628
## Sobre o desafio

Este é um simples teste para o qual você desenvolverá uma aplicação de acordo com os requisitos e orientações neste documento.

Você pode utilizar qualquer boilerplate/CRA que você preferir, mas tente realizar de forma simples. É um plus caso você queira efetuar o seu próprio boilerplate para buildar suas aplicações. Você também é livre em utilizar as ferramentas que desejar.

## Como funciona?

1.  Crie um branch com seu nome;
2.  Resolva o desafio da melhor forma que conseguir;
3.  Utilize os commits como se estivesse em um projeto colaborativo, pois isso fará parte do processo de avaliação;
4.  Quando terminar abra um Pull Request para o branch `master` deste repositório, dessa forma que saberemos que você concluiu o desafio e podemos iniciar a revisão do código;
5.  Entraremos em contato com você para dar um feedback.

## A solução a ser desenvolvida

### A aplicação web (frontend)

##### Home 
- Página inicial da aplicação que contém um campo de pesquisa;
- A aplicação não deve ter nenhum tipo de controle de acesso
- O resultado da pesquisa será uma lista de filmes que devem ser exibidos para o usuário nessa mesma página Home
- Exibir na listagem de filmes apenas a foto, o título, o ano de lançamento, gênero, nota imdb e a descrição dos filmes
- A lista deve estar ordenada por filmes mais recentes, mas você também deve permitir que o usuário ordene por "mais recentes" ou "maior nota"
- Pense em estado vazio para os filmes, loading e filmes não encontrados

##### Página do filme
- Exibe os detalhes do filme selecionado. Além do que já era exibido na tela Home, exibir também elenco, direção, premiações e língua original.
- Ao voltar para a página Home, devemos ter a mesma ordenação e a mesma pesquisa anteriores à "Página do filme"
- Permite que o usuário marque um filme como "Gostei" para ser exibido na listagem com esse símbolo (apesar de não te controle de acesso, pense em alguma forma da aplicação saber quem é o usuário, mas foque em soluções simples e funcionais)
- O símbolo de "Gostei" só é exibido para o usuário que marcou o filme
- Pense sobre loading e detalhes não encontrados
  
### API (backend)
Você deverá desenvolver uma API que será consultada pela aplicação web para receber os dados necessários para as telas

Fique à vontade na construção dessa API para usar a linguagem que você quiser e construir quantos endpoints achar necessário.

Esse serviço deve se comunicar com a API [OMDb API](http://www.omdbapi.com/) para fornecer os dados para o frontend, você também pode optar por utilizar a API de filmes que preferir.

## Avaliação
A proposta deste desafio é para avaliar seu HTML, CSS, Javascript, construção da API, boas práticas de programação, uso do GIT, conhecimento da linguagem e lib/framework utilizados, entre outras skills que serão demonstradas ao decorrer do projeto.

### Dicas

* Escreva um bom README com informações que auxiliem quem for ler o código (ex: funcionamento da API, como startar o projeto e como buildar);
* Será ótimo poder executar a aplicação com apenas um comando; =)
* Sinta-se a vontade em usar a linguagem de backend que você quiser para a API (escrever em Go seria um bônus);
* Para o frontend utilize React e qualquer lib que desejar, mas lembre-se que, muitas vezes, "menos é mais";
* Sinta-se a vontade para definir o layout das páginas web;
* Fazer perguntas é bom. Não vamos te penalizar por perguntar;
* A API externa às vezes pode demorar em nos responder, pense em loading e estado vazio da sua aplicação;
* Estamos procurando por sinais do seu entendimento de alguns conceitos como eventos, promises, ciclos de vida e como você aplica e implementa isto com a linguagem utilizada. 
* Testes unitários serão bem valorizados;
* Uso do git será bem valorizado;
* Seu código será avaliado por: semântica, estrutura, legibilidade, tamanho, elegância (entre outros fatores);
* Não existe a necessidade de fazer deploy CI/CD da aplicação. Mas se feito, será um bônus.

#### Telas:

Não temos o layout das telas definido, fique à vontade para usar a sua criatividade.
Uma ideia seria algo assim: [Marvel Prototype](https://marvelapp.com/3cj0i64/screen/52947277)  

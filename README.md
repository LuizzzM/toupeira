Luiz Augusto Mendes Barbosa
# Relatório de Implementação – Jogo **Acerta a Toupeira**

## 1. Introdução

O projeto consiste na implementação de um jogo eletrônico desenvolvido utilizando **HTML5**, **CSS3** e **JavaScript**, executado diretamente no navegador, sem a necessidade de bibliotecas ou frameworks externos.

O objetivo do jogo é testar os reflexos do jogador, que deve clicar rapidamente sobre a toupeira sempre que ela aparecer em um dos buracos disponíveis antes que ela desapareça.

A pontuação simples torna o jogo fácil de entender, talvez com mais tempo seriam adicionados ranking, animações, novos tipos de toupeira e armazenamento da melhor pontuação.

O desenvolvimento priorizou simplicidade, boa organização do código, acessibilidade e facilidade de manutenção, separando o projeto em três arquivos independentes:

- **index.html** – estrutura da página;
- **css/estilos.css** – aparência e estilização;
- **js/script.js** – lógica do jogo.

---

# 2. Mecânica escolhida e tema

## Tema

O tema escolhido foi o clássico **Acerta a Toupeira (Whac-a-Mole)**.

Neste jogo, toupeiras aparecem aleatoriamente em diversos buracos, cabendo ao jogador acertá-las antes que desapareçam.

Optou-se por uma representação simples da toupeira utilizando uma esfera colorida, privilegiando a jogabilidade em vez de elementos gráficos complexos.

## Mecânica

A mecânica principal do jogo consiste no surgimento aleatório da toupeira em diferentes buracos do tabuleiro, exigindo que o jogador reaja rapidamente para acertá-la antes que desapareça. A pontuação é baseada na quantidade de acertos realizados durante uma partida com duração de 30 segundos, controlada por um cronômetro regressivo. Além disso, o jogo possui níveis de dificuldade que alteram o tempo de permanência da toupeira na tela, tornando a experiência mais desafiadora conforme a dificuldade selecionada. Essa mecânica exige rapidez, coordenação motora e atenção constante.



# 3. Briefing do cliente

## Objetivo

Desenvolver um jogo simples, divertido e acessível, capaz de ser executado diretamente no navegador sem instalação.

## Público-alvo

O jogo foi desenvolvido para atender a um público amplo, incluindo crianças acima de 8 anos, adolescentes, adultos que desejam partidas rápidas e usuários iniciantes em jogos digitais. Como sua interação é bastante simples, exigindo apenas cliques do jogador, o jogo também pode ser utilizado como uma forma de estimular e desenvolver o tempo de reação e a coordenação motora.


---

# 4. Regras do jogo

O jogador inicia uma partida pressionando o botão **Iniciar**.

Durante 30 segundos:

- apenas uma toupeira aparece por vez;
- ela surge em um buraco aleatório;
- ao clicar na toupeira o jogador ganha **1 ponto**;
- caso ela desapareça antes do clique, nenhum ponto é perdido;
- ao terminar o tempo, a partida encerra automaticamente.

## Restrições implementadas

Foram adicionadas algumas variações em relação ao jogo tradicional.

### Escolha da dificuldade

Existem três níveis:

- Fácil
- Normal
- Difícil

Cada dificuldade altera o tempo em que a toupeira permanece visível.

### Quantidade de buracos

O usuário pode escolher entre:

- 6
- 8
- 12
- 16 buracos

Todos os buracos são criados dinamicamente.

### Apenas uma toupeira ativa

Nunca existem duas toupeiras simultaneamente.

Isso evita conflitos de clique e mantém a jogabilidade simples.

### Buraco aleatório

A toupeira nunca reaparece imediatamente no mesmo buraco quando existem outros disponíveis.

### Pontuação

Cada acerto vale exatamente:

**1 ponto**

### Tempo fixo

Todas as partidas possuem duração de:

**30 segundos**

---

# 5. Diferencial do projeto

Além da mecânica tradicional, o jogo conta com um sistema de efeitos sonoros desenvolvido utilizando a **Web Audio API**. Em vez de utilizar arquivos de áudio, como MP3 ou WAV, todos os sons são sintetizados em tempo real pelo próprio navegador. Foram implementados três efeitos sonoros distintos: um reproduzido no início da partida, outro quando o jogador acerta a toupeira e um terceiro ao término do jogo, proporcionando uma experiência mais dinâmica e imersiva. 



# 6. Como jogar

1. Escolha a dificuldade.
2. Escolha a quantidade de buracos.
3. Clique em **Iniciar**.
4. Observe em qual buraco a toupeira aparece.
5. Clique rapidamente nela.
6. Continue acumulando pontos até o tempo acabar.
7. Ao final será exibida a pontuação obtida.



# 7. Como executar

Não é necessário instalar nenhum software.

Basta:

1. Baixar os arquivos do projeto.
2. Manter a estrutura:

```text
projeto/
│── index.html
│
├── css/
│   └── estilos.css
│
└── js/
    └── script.js
```

3. Abrir o arquivo **index.html** em qualquer navegador moderno.

### Navegadores compatíveis

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Opera


# 8. Estrutura do projeto

```text
index.html
│
├── css
│     estilos.css
│
└── js
      script.js
```

---

# 9. JavaScript

## Variáveis

### `boardEl`

Armazena o elemento HTML que representa o tabuleiro do jogo.

O nome vem de **board** (tabuleiro) e **El** (elemento).



### `scoreEl`

Representa o elemento HTML onde a pontuação é exibida.

**score** significa pontuação e **El** significa elemento.



### `timeEl`

Representa o elemento HTML responsável por mostrar o tempo restante da partida.



### `startBtn`

Armazena o botão responsável por iniciar uma partida.

**Btn** é abreviação de *Button*.



### `difficultySel`

Guarda o elemento `<select>` da dificuldade.

**Sel** significa *Select*.



### `holesCountSel`

Representa o seletor da quantidade de buracos.

O nome significa literalmente "Hole Count Select".



### `score`

Variável numérica que armazena a pontuação do jogador.

Inicialmente:

```javascript
let score = 0;
```



### `timeLeft`

Representa o tempo restante da partida.

Inicialmente:

```javascript
let timeLeft = 30;
```



### `gameInterval`

Armazena o identificador retornado pelo `setInterval()` responsável pelo cronômetro.

Isso permite interromper a contagem quando a partida termina.



### `moleTimeout`

Guarda o identificador do `setTimeout()` responsável pelo desaparecimento da toupeira.



### `activeHole`

Armazena o buraco onde a toupeira está atualmente.

Essa variável evita que a toupeira apareça duas vezes seguidas no mesmo local.



### `running`

Variável booleana que informa se existe uma partida em andamento.

Valores possíveis:

```javascript
true
false
```



### `difficultySettings`

Objeto que reúne as configurações de velocidade de cada nível de dificuldade.

Cada dificuldade possui:

- `minUp`
- `maxUp`

Esses valores determinam o intervalo de tempo que a toupeira permanece visível.



### `audioContext`

Representa o contexto de áudio criado pela **Web Audio API**.

É o componente responsável por sintetizar todos os sons do jogo.



# 10. Explicação das funções

## `playSound(type)`

Responsável por sintetizar todos os efeitos sonoros.

Recebe como parâmetro:

```javascript
type
```

Valores possíveis:

- `"start"`
- `"hit"`
- `"end"`

Internamente cria um:

- `OscillatorNode`, responsável pela frequência do som;
- `GainNode`, responsável pelo volume.

Cada tipo de evento utiliza frequências diferentes para produzir efeitos distintos.



## `createBoard(count)`

Cria dinamicamente todos os buracos do jogo.

Recebe:

```javascript
count
```

que representa a quantidade de buracos.

A função:

- limpa o tabuleiro;
- cria os buracos;
- cria uma toupeira para cada buraco;
- adiciona os eventos de clique e toque.



## `randomHole()`

Escolhe aleatoriamente um dos buracos disponíveis.

Seu principal objetivo é impedir que a toupeira apareça duas vezes consecutivas no mesmo local.

Retorna um elemento HTML correspondente ao buraco escolhido.



## `showMole()`

Responsável por controlar a aparição da toupeira.

Ela:

- escolhe um buraco aleatório;
- calcula quanto tempo a toupeira ficará visível;
- mostra a toupeira;
- agenda seu desaparecimento.

Se a partida ainda estiver ativa, agenda automaticamente a próxima aparição.



## `hit(event)`

Executada quando o jogador clica em um buraco.

Ela verifica:

- se o jogo está em execução;
- se realmente existe uma toupeira visível naquele buraco.

Caso positivo:

- incrementa a pontuação;
- atualiza a interface;
- reproduz o som de acerto;
- remove a toupeira;
- faz outra surgir rapidamente.


## `startGame()`

Responsável por iniciar uma nova partida.

Ela:

- zera a pontuação;
- reinicia o cronômetro;
- bloqueia o botão **Iniciar**;
- recria o tabuleiro;
- reproduz o som inicial;
- faz surgir a primeira toupeira;
- inicia o cronômetro da partida.



## `endGame()`

Executada automaticamente quando o tempo chega a zero.

Ela:

- encerra o cronômetro;
- interrompe todos os temporizadores;
- remove qualquer toupeira visível;
- reproduz o som de encerramento;
- reativa o botão **Iniciar**;
- exibe a pontuação final do jogador.



## `init()`

Função executada automaticamente quando a página é carregada.

Sua finalidade é inicializar toda a aplicação.

Ela:

- cria o tabuleiro inicial;
- registra todos os eventos da interface;
- configura os controles do jogo.

Essa função evita deixar código solto no arquivo JavaScript e melhora a organização do projeto.

---

# 11. Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- DOM API
- Web Audio API



## Declaração de uso de IA

Foram utilizadas os modelos de inteligência artificial generativa ChatGPT e Copilot como ferramenta de apoio para organização do código, implementação de funcionalidades, documentação e revisão.


# 12. Créditos

- **HTML5** — estrutura da interface do jogo.
- **CSS3** — estilização e layout responsivo.
- **JavaScript (ECMAScript 6)** — implementação da lógica do jogo.
- **DOM API** — manipulação dinâmica dos elementos HTML.
- **Web Audio API** — geração dos efeitos sonoros diretamente pelo navegador, sem necessidade de arquivos de áudio externos.
- **MDN Web Docs** — documentação oficial utilizada como referência para implementação da Web Audio API e demais recursos JavaScript.
import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: 'kFQigMYaiQyp4TKAPxL2DQmhsDq0lVRAJLGxr7xv',//colocar sua key aq
});

let novaparada = "";
let arrayAleatoria = []; // Definir fora da função para acesso global.
let palavra = ""; // A palavra correta será definida aqui.

// Função para buscar palavras da API
async function buscarPalavras() {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content:
            'Gerar 4 palavras em português o mais aleatorio possivel com no máximo, 5 letras, sem nenhum tipo de acento e colocar elas em uma array e retornar somente a array '+ novaparada,
        },
      ],
    });

    //console.log(response);  Verifique o formato da resposta.

    // Extraindo a string de conteúdo e corrigindo formato.
    let mensagemRaw = response.message.content[0].text;
    mensagemRaw = mensagemRaw.replace(/'/g, '"').trim();

    // Convertendo a string JSON para um array real.
    const mensagem = JSON.parse(mensagemRaw);

    if (Array.isArray(mensagem)) {
      arrayAleatoria = mensagem; // Atualiza as palavras geradas.
      palavra = arrayAleatoria[Math.floor(Math.random() * arrayAleatoria.length)]; // Define a nova palavra correta.
      iniciando(); // Atualiza o jogo com as novas palavras.
    } else {
      console.error('A mensagem retornada não é uma array válida:', mensagem);
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

// Função para atualizar o jogo com as palavras
async function iniciando() {
  if (arrayAleatoria.length > 0) {
    for (let i = 0; i < arrayAleatoria.length; i++) {
      let pergunta = `pergunta${i}`;
      let resposta = arrayAleatoria[i];

      const elemento = document.getElementById(pergunta);
      if (elemento) {
        elemento.innerHTML = resposta;
      }
    }
  } else {
    console.error('arrayAleatoria não está preenchida!');
  }
}

let contagem = 0
let Formes; 
// Função para verificar a resposta
function Verificando(resposta) {
  if (resposta !== "") {
    if (resposta === palavra) {
      //console.log("Correto");  terminar de colocar as funções de vida
      BarraProgresso();
      resetarJogo();
      
    } else {
      console.log("errou")
      Formes = document.querySelectorAll(".coracao")[contagem];
      Formes.style.opacity = "0";
      contagem++
      if(contagem === 3){
        window.location.href = "estatisticasMorreu.html";
      }
    }
  } else {
    console.log("Nada foi selecionado.");
  }
}

// Variáveis e função para barra de progresso
let progressoAtual = parseFloat(localStorage.getItem("progressoAtual")) || 0;
let rodadasCompletas = parseInt(localStorage.getItem("rodadasCompletas")) || 0;

function BarraProgresso() {
  let barra = document.querySelector(".progresso-verde");

  if (barra) {
    progressoAtual += 33.3; // Incrementa o progresso
    if (progressoAtual > 100) progressoAtual = 100;
    barra.style.width = `${progressoAtual}%`;
    localStorage.setItem("progressoAtual", progressoAtual);

    // Incrementa o contador de rodadas
    rodadasCompletas++;
    localStorage.setItem("rodadasCompletas", rodadasCompletas);
    
    // Verifica se 3 rodadas foram concluídas
    if (rodadasCompletas === 3) {
      window.location.href = "estatisticas.html";
    }
  } else {
    console.error("Elemento .progresso-verde não encontrado!");
  }
}


let anti = [];
let antiga 
// Função para resetar o jogo
async function resetarJogo() {
  antiga = arrayAleatoria + anti;
  novaparada = ", e não pode ser igual a " + antiga
  await buscarPalavras(); // Gera novas palavras e reinicia o jogo.
}

// Função para reiniciar tudo (barra de progresso e rodadas)
function ReiniciarTudo() {
  progressoAtual = 0;
  rodadasCompletas = 0;
  novaparada = ""; 
  localStorage.setItem("progressoAtual", progressoAtual);
  localStorage.setItem("rodadasCompletas", rodadasCompletas);

  let barra = document.querySelector(".progresso-verde");
  if (barra) {
    barra.style.width = "0%";
  }
}

// Inicialização ao carregar a página
window.addEventListener("load", async function () {
  ReiniciarTudo()
  await buscarPalavras(); // Busca as palavras ao carregar o jogo.
});

// Configuração de reconhecimento de fala
const recognition =
  window.webkitSpeechRecognition || window.SpeechRecognition;

if (recognition) {
  const recognizer = new recognition();
  recognizer.lang = 'pt-br';
  recognizer.maxAlternatives = 1;

  recognizer.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
  };

  recognizer.onerror = (event) => {
    console.error('Erro:', event);
  };
} else {
  console.error('A API de reconhecimento de fala não é suportada neste navegador.');
}

// Configuração de síntese de fala
document.getElementById('start-synthesis').addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(palavra);
  utterance.voice = speechSynthesis.getVoices()[0];
  utterance.pitch = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
});

// Expondo a função para uso em botões HTML
window.Verificando = Verificando;

import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: 'kFQigMYaiQyp4TKAPxL2DQmhsDq0lVRAJLGxr7xv',
});

let mensagemRaw;

// Função para buscar palavras da API
async function buscarMensagem() {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content: 'Gere uma resposta curta para um aluno da EJA que incentive-o a estudar mais',
        },
      ],
    });

    // Log completo para verificar a resposta
    console.log("Resposta completa da API:", response);

    // Verifique se response.message.content é um array
    if (response.message && response.message.content && Array.isArray(response.message.content)) {
      const firstMessage = response.message.content[0];
      console.log("Primeiro item de response.message.content:", firstMessage);

      // Verificar se o primeiro item tem a propriedade "text"
      if (firstMessage && firstMessage.text) {
        mensagemRaw = firstMessage.text.trim();
        console.log("Mensagem extraída:", mensagemRaw); // Log para confirmar
      } else {
        console.error("O primeiro item não contém o campo 'text':", firstMessage);
      }
    } else {
      console.error("Formato inesperado de response.message.content:", response.message.content);
    }
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}


// Configuração de reconhecimento de fala
const recognition = window.webkitSpeechRecognition || window.SpeechRecognition;

if (recognition) {
  const recognizer = new recognition();
  recognizer.lang = 'pt-br';
  recognizer.maxAlternatives = 1;

  recognizer.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript);
  };

  recognizer.onerror = (event) => {
    console.error('Erro no reconhecimento de fala:', event);
  };

} else {
  console.error('A API de reconhecimento de fala não é suportada neste navegador.');
}

// Configuração de síntese de fala
document.getElementById('Melhore').addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(mensagemRaw);
  utterance.voice = speechSynthesis.getVoices()[0];
  utterance.pitch = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
});

// Chamar a função ao carregar a página
window.addEventListener("load", buscarMensagem);

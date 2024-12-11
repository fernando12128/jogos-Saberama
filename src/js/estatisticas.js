import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: 'kFQigMYaiQyp4TKAPxL2DQmhsDq0lVRAJLGxr7xv',
});

// Função para buscar palavras da API
async function buscarPalavras() {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'user',
          content:
            'Gerar 4 palavras em português o mais aleatorio possivel com no máximo, 5 letras, sem nenhum tipo de acento e colocar elas em uma array e retornar somente a array',
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
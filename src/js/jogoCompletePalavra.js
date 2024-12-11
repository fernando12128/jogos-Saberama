let palavras = [
    "livro", "ruina", "flore", "porta", "mundo", "piano", "vidro", "vento", "carta", 
    "chave", "limpo", "dente", "reino", "perda", "pedra", "sorte", "cedro", "carro", 
    "nuvem", "fosco", "sutil", "largo", "troca", "plano", "nobre", "amigo", "calma", 
    "tempo", "claro", "roubo", "prato", "justo", "feroz", "movel", "uniao", "clima", 
    "bravo", "grupo", "fases", "astro", "jovem"
  ];
  
  let nmr = Math.floor(Math.random() * 40)
  let palavra = palavras[nmr];
  let letras = palavra.toLowerCase().split('');
  
  
  let pegandoPalavras = letras[0]+ letras[1] + letras[2]

function iniciando(){

    document.getElementById("palavra").innerHTML = pegandoPalavras
}
iniciando()




function Verificando() {
    let barraVida;

    document.getElementById("resposta1").addEventListener("keyup", function() {
        const resposta = this.value.trim(); // Remove espaços e captura o valor do input
        
        // Verifica se a resposta não está vazia e exibe no console
        if (resposta !== "") {
            const verdadeiro = pegandoPalavras + resposta
            if(verdadeiro === palavra){
                BarraProgresso();
                resetarJogo();
            }
        } else {
            console.log("Campo vazio");
        }
    });
}
Verificando()


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
        if (rodadasCompletas >= 3) {
            ReiniciarTudo();
        }
    } else {
        console.error("Elemento .progresso-verde não encontrado!");
    }
}


window.addEventListener("load", function() {
    let barra = document.querySelector(".progresso-verde");
    if (barra) {
        barra.style.width = `${progressoAtual}%`;
    }
});

function resetarJogo() {

    // Escolhe uma nova palavra aleatória
    nmr = Math.floor(Math.random() * palavras.length);
    palavra = palavras[nmr];
    letras = palavra.toLowerCase().split('');
    pegandoPalavras = letras[0] + letras[1] + letras[2];

    // Atualiza o elemento na página
    document.getElementById("palavra").innerHTML = pegandoPalavras;

    // Limpa o campo de entrada
    document.getElementById("resposta1").value = "";
}


function ReiniciarTudo(){
        // Reinicia o progresso e o contador de rodadas
        progressoAtual = 0;
        rodadasCompletas = 0;
        localStorage.setItem("progressoAtual", progressoAtual);
        localStorage.setItem("rodadasCompletas", rodadasCompletas);

            // Atualiza visualmente a barra de progresso
        let barra = document.querySelector(".progresso-verde");
    if (barra) {
        barra.style.width = "0%";
    }
}



/*Aqui está o reconhecimento da voz*/
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
recognition.lang = 'pt-br';
recognition.maxAlternatives = 1;

const speechSynthesis = window.speechSynthesis;

recognition.onresult = event => {
  const transcript = event.results[0][0].transcript;    
  console.log(transcript);
 
};



document.getElementById('start-synthesis').addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(palavra); // para alterar oq vai falar trocar essa variavel
  utterance.voice = speechSynthesis.getVoices()[0];
  utterance.pitch = 1;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
});



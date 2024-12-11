
function aleatorio(){
    const nmrAleatorios = []

for(let i = 0; i < 6; i++){
    const nmr = Math.floor(Math.random() * 100)
    nmrAleatorios.push(nmr)
}
 return nmrAleatorios
}
const arrayDeNumeros = aleatorio(); // aqui está saindo a array com os 6 numeros



//aqui estão algumas const
const nmr1 = arrayDeNumeros[0]
const nmr2 = arrayDeNumeros[1]
const nmr3 = arrayDeNumeros[2]
const nmr4 = arrayDeNumeros[3]
const nmr5 = arrayDeNumeros[4]
const nmr6 = arrayDeNumeros[5]

const correto01 = nmr1 + nmr2
const correto02 = nmr3 + nmr4
const correto03 = nmr5 + nmr6
function trocandoValores(){
    
    document.getElementById("numero1").innerHTML = nmr1
    document.getElementById("numero2").innerHTML = nmr2
    
    document.getElementById("numero3").innerHTML = nmr3
    document.getElementById("numero4").innerHTML = nmr4

    document.getElementById("numero5").innerHTML = nmr5
    document.getElementById("numero6").innerHTML = nmr6
}
trocandoValores()


function verificando(event) {
    const inputId = event.target.id;  // Pega o ID do campo que foi alterado (resposta1, resposta2, resposta3)
    const resposta = parseFloat(event.target.value); // Pega o valor digitado

    let correto;  // Vai armazenar a resposta correta dependendo do campo
    let box;      // Vai armazenar a box do campo
    let PergBox;  // Vai armazenar a lista de elementos .perg dentro da box
    let Formes;   // Vai armazenar a div do formulário

    // Definindo as variáveis corretas de acordo com o campo alterado
    if (inputId === "resposta1") {
        correto = correto01;
        box = document.querySelectorAll(".box")[0];
        PergBox = box.querySelectorAll(".perg");
        Formes = document.querySelector(".Formes1");
    } else if (inputId === "resposta2") {
        correto = correto02;
        box = document.querySelectorAll(".box")[1];
        PergBox = box.querySelectorAll(".perg");
        Formes = document.querySelector(".Formes2");
    } else if (inputId === "resposta3") {
        correto = correto03;
        box = document.querySelectorAll(".box")[2];
        PergBox = box.querySelectorAll(".perg");
        Formes = document.querySelector(".Formes3");
    }

    // Verifica se a resposta é válida (não NaN)
    if (isNaN(resposta)) {
        return;
    }

    // Comparando as respostas e fazendo as alterações de estilo
    if (Math.abs(resposta - correto) < 0.001) {  // Comparação com uma margem de erro
        box.style.backgroundColor = "green";
        box.style.border = "5px solid green";
        Formes.style.opacity = "0";

        PergBox.forEach(elemento => {
            elemento.style.color = "green";
        });
        BarraProgresso()
        console.log("Correto");
    } else {
        box.style.border = "5px solid red";
        Formes.style.opacity = "1"; // Caso não esteja correto, o formulário volta a aparecer

        console.log("Errado");
    }
}

// Adiciona o evento de "input" para cada campo de resposta
document.getElementById("resposta1").addEventListener("input", verificando);
document.getElementById("resposta2").addEventListener("input", verificando);
document.getElementById("resposta3").addEventListener("input", verificando);

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




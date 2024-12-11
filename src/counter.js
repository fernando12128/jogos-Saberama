let caminhos = ["adicao.html" , "completePalavra.html", "multiplaEscolha.html" , "jogoSoma.html"]


        export function Iniciar(){

            let nmr = Math.floor(Math.random() * caminhos.length)
            let caminho = caminhos[nmr]

            window.location.href = caminho
        }
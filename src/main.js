import './css/style.css';
import { Iniciar } from './counter.js';

document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelector('#app').innerHTML = `
    <div class="content">
      <button class="iniciarJogo">Iniciar Jogo Random</button>
    </div>
  `;

  // Adiciona o evento após o DOM estar pronto
  document.querySelector('.iniciarJogo').addEventListener('click', Iniciar);
});
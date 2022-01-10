let corFundo = 'lightgray';
let tela = document.querySelector('canvas');
let pincel = tela.getContext('2d');

function limpaTela() {
    pincel.fillStyle = '#eee';
    pincel.fillRect(0, 0, tela.width, tela.height);
}
limpaTela();

let alvo = {
    x : undefined,
    y : undefined,
    raio : 20,
    acertos : 0
}

function circulo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}


function desenhaAlvo() {
    let x = Math.round(Math.random() * 600) % 600;
    let y = Math.round(Math.random() * 400) % 400;
    limpaTela();

    alvo.x= x;
    alvo.y = y;

    circulo(x, y, alvo.raio * 2, 'red');
    circulo(x, y, alvo.raio * 1.5, 'white');
    circulo(x, y, alvo.raio, 'red');
}

function dispara(evento) {
    let x = evento.pageX - tela.offsetLeft;
    let y = evento.pageY - tela.offsetTop;

    // Checagem de colisão
    let colisaoX = x <= alvo.x + alvo.raio && x >= alvo.x- alvo.raio;
    let colisaoY = y <= alvo.y + alvo.raio && y >= alvo.y - alvo.raio;

    if (colisaoX && colisaoY) atualizaAcertos();
}

function atualizaAcertos() {
    alvo.acertos++;
    desenhaAlvo();

    let elementoAcertos = document.getElementById('acertos');
    elementoAcertos.innerText = alvo.acertos;
    elementoAcertos.classList.add('acerto');
    setTimeout(() => { // Implementar animação com keyframes no CSS
        elementoAcertos.classList.remove('acerto');
    }, 700);
}

/* Iniciando o jogo */

desenhaAlvo();
let movimento = setInterval(desenhaAlvo, 800);

tela.onclick = dispara;

function mudarIntervalo(tempo){
    clearInterval(movimento);
    movimento = setInterval(desenhaAlvo, tempo);
}

/* Dificuldade do jogo */
document.getElementById('facil').onclick = function() { mudarIntervalo(1200) };
document.getElementById('medio').onclick = function() { mudarIntervalo(800) };
document.getElementById('dificil').onclick = function() { mudarIntervalo(600) };
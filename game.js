let corFundo = 'lightgray';
let tela = document.querySelector('canvas');
let pincel = tela.getContext('2d');

function limpaTela() {
    pincel.fillStyle = '#eee';
    pincel.fillRect(0, 0, 600, 400);
}
limpaTela();


// Raio do círculo
let raio = 20;

// Informações do último alvo criado
let alvo = {};

// Acertos no alvo
let acertos = 0;

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

    alvo['x'] = x;
    alvo['y'] = y;
    alvo['raio'] = raio;
    circulo(x, y, raio * 2, 'red');
    circulo(x, y, raio * 1.5, 'white');
    circulo(x, y, raio, 'red');
}

function dispara(evento) {
    let x = evento.pageX - tela.offsetLeft;
    let y = evento.pageY - tela.offsetTop;

    let colisaoX = x <= alvo['x'] + alvo['raio'] && x >= alvo['x'] - alvo['raio'];
    let colisaoY = y <= alvo['y'] + alvo['raio'] && y >= alvo['y'] - alvo['raio'];

    if (colisaoX && colisaoY) {
        /*
        console.log('Colisão em x=' + x + " y=" + y);
        alert('Acertou!');
        */
       atualizaAcertos();
    }
}

function atualizaAcertos() {
    acertos++;
    desenhaAlvo();
    let elementoAcertos = document.getElementById('acertos');
    elementoAcertos.innerText = acertos;
    elementoAcertos.classList.add('acerto');
    setTimeout(() => {
        elementoAcertos.classList.remove('acerto');
    }, 500);
}

/* Iniciando o jogo */

desenhaAlvo();
let movimento = setInterval(desenhaAlvo, 800);

tela.onclick = dispara;

function mudarIntervalo(tempo){
    clearInterval(movimento);
    movimento = setInterval(desenhaAlvo, tempo);
    console.log('Taxa de atualização para criação aleatória dos alvos: ' + tempo + 'ms');
}

/* Dificuldade do jogo */
document.getElementById('facil').onclick = function() { mudarIntervalo(1200) };
document.getElementById('medio').onclick = function() { mudarIntervalo(800) };
document.getElementById('dificil').onclick = function() { mudarIntervalo(600) };


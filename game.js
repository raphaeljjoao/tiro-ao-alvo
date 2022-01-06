let corFundo = 'lightgray';
let tela = document.querySelector('canvas');
let pincel = tela.getContext('2d');
pincel.fillStyle = corFundo;
pincel.fillRect(0, 0, 600, 400);

function circulo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

let raio = 20;
let alvo = {};
let posicao = []

function desenhaAlvo() {
    let x = Math.round(Math.random() * 600) % 600;
    let y = Math.round(Math.random() * 400) % 400;
    posicao = [x, y];

    if (Object.keys(alvo).length) { // Se houver um alvo na tela
        circulo(alvo['x'], alvo['y'], alvo['raio'] * 2.05, corFundo);
    }

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
    console.log('Clique: ' + [x, y]);
    console.log('Posição: ' + posicao);

    let colisaoX = x <= alvo['x'] + alvo['raio'] && x >= alvo['x'] - alvo['raio'];
    let colisaoY = y <= alvo['y'] + alvo['raio'] && y >= alvo['y'] - alvo['raio'];

    if (colisaoX && colisaoY) {
        console.log('Colisão em x=' + x + " y=" + y);
        alert('Acertou!');
    }
}

desenhaAlvo();
setInterval(desenhaAlvo, 50000);

tela.onclick = dispara;
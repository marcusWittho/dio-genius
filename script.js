/*
  0 - verde
  1 - vermelho
  2 - amarelo
  3 - azul
*/

let order = [];
let clicked = [];
let score = 0;

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const totalScore = document.querySelector('.score');

const lightColor = (element, number) => {
  number *= 500;

  setTimeout(() => {
    element.classList.add('selected');
  }, number - 250);

  setTimeout(() => {
    element.classList.remove('selected');
  }, number);
}

const shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clicked = [];

  for(let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
}

const checkOrder = () => {
  for(let i in clicked) {
    if(clicked[i] !== order[i]) {
      gameOver();
      break;
    }
  }

  if(clicked.length === order.length) {
    totalScore.innerHTML = `Score: ${score}`;
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando o próximo nível.`);
    nextLevel();
  }
}

const click = (color) => {
  clicked[clicked.length] = color;
  createColorElement(color).classList.add('selected');

  setTimeout(() => {
    createColorElement(color).classList.remove('selected');
    checkOrder();
  }, 250);
}

const createColorElement = (color) => {
  switch (true) {
    case (color == 0):
      return green;
    case (color == 1):
      return red;
    case (color == 2):
      return yellow;
    case (color == 3):
      return blue;
    default:
      break;
  }
}

const nextLevel = () => {
  score += 1;
  shuffleOrder();
}

const playGame = () => {
  score = 0;
  totalScore.innerHTML = `Score: ${score}`;
  alert(`Bem vindo ao Genius! Iniciando o jogo.`);

  nextLevel();
}

const gameOver = () => {
  alert(`Você perdeu o jogo.\nClique em 'Ok' para iniciar um novo jogo.`);
  order = [];
  clicked = [];

  playGame();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();

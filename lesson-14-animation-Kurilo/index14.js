'use strict'

function createGame(){
  var body = document.getElementsByTagName('body')
  body.id='Body'
  body[0].appendChild(createButton());
  body[0].appendChild(createScore());
  body[0].appendChild(createField());
  var field = document.getElementsByTagName('div')
  field[0].appendChild(createPlayerOne());
  field[0].appendChild(createPlayerTwo());
  field[0].appendChild(createBall())

}
createGame()
function createField(){
  var field = document.createElement('div')
  field.className = 'field'
  return field
}
function createButton(){
  var button = document.createElement('input')
  button.className = 'button';
  button.setAttribute('value','Start')
  button.setAttribute('onclick','StartGame()')
  button.setAttribute('type','button')
  return button
}
function createScore(){
  var score = document.createElement('span');
  score.className = 'score';
  var scorePlayOne = 0;
  var scorePlayTwo = 0;
  score.textContent = scorePlayOne+':'+scorePlayTwo;
  return score
}
function createPlayerOne(){
  var playerOne = document.createElement('div')
  playerOne.className = 'playerOne'
  return playerOne
}
function createPlayerTwo(){
  var playerTwo = document.createElement('div')
  playerTwo.className = 'playerTwo'
  return playerTwo
}
function createBall(){
  var ball = document.createElement('div')
  ball.className = 'ball'
  return ball
}
function startGame(){

}

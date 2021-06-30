'use strict'

var Ball = {
    PosX: 300,
    PosY: 150,
    SpeedX: 3.5,
    SpeedY: 3.5,
    AcelX: 0.2,
    AcelY: 0.2,
    Elast: 0.9,
    Width: 30,
    Height: 30,
    Update: function () {
        var BallObj = document.getElementById('ball');
        BallObj.style.left = Math.round(this.PosX) + 'px';
        BallObj.style.top = Math.round(this.PosY) + 'px';
    }
}
var Field = {
    Width: 600,
    Height: 300
}
var PlayerOne = {
    Top: 30,
    left: 0,
    Height: 80,
    Speed: 0,
    Score: 0,
    Go: function () {
        var Player = document.getElementById('player1');
        Player.style.top = this.Top + 'px';
    }
}
var PlayerTwo = {
    Top: 30,
    right: 0,
    Height: 80,
    Speed: 0,
    Score: 0,
    Go: function () {
        var Player = document.getElementById('player2');
        Player.style.top = this.Top + 'px';
    }
}


function createGame() {
    var body = document.getElementsByTagName('body')
    body[0].appendChild(createButton());
    body[0].appendChild(createScore());
    body[0].appendChild(createField());
    var field = document.getElementsByTagName('div')
    field[0].appendChild(createPlayerOne());
    field[0].appendChild(createPlayerTwo());
    field[0].appendChild(createBall())
}

createGame()

function createField() {
    var field = document.createElement('div')
    field.className = 'field'
    field.style.width = Field.Width + 'px'
    field.style.height = Field.Height + 'px'
    field.setAttribute('id', 'field')
    return field
}

function createButton() {
    var button = document.createElement('input')
    button.className = 'button';
    button.setAttribute('value', 'Start')
    button.setAttribute('onclick', 'StartGame()')
    button.setAttribute('type', 'button')
    return button
}

function createScore() {
    var score = document.createElement('span');
    score.className = 'score';
    score.textContent = PlayerOne.Score + ':' + PlayerTwo.Score;
    return score
}

function createPlayerOne() {
    var playerOne = document.createElement('a')
    playerOne.className = 'playerOne';
    playerOne.style.top = PlayerOne.Top + 'px'
    playerOne.style.height = PlayerOne.Height + 'px'
    playerOne.setAttribute('id', 'player1')
    return playerOne
}

function createPlayerTwo() {
    var playerTwo = document.createElement('a')
    playerTwo.className = 'playerTwo';
    playerTwo.style.top = PlayerTwo.Top+"px";
    playerTwo.style.height = PlayerTwo.Height + 'px';
    playerTwo.setAttribute('id', 'player2')
    return playerTwo
}

function createBall() {
    var ball = document.createElement('div')
    ball.className = 'ball'
    ball.setAttribute('id', 'ball')
    ball.style.width = Ball.Width + 'px';
    ball.style.height = Ball.Height + 'px';
    return ball
}

function StartGame() {
    setInterval(Tik, 50);
}

function Tik() {
    Ball.PosX += Ball.SpeedX

    if (Ball.PosX + Ball.Width > Field.Width) {
        Ball.SpeedX = -Ball.SpeedX;
        PlayerOne.Score += 1;
    }

    if (Ball.PosX < 0) {
        Ball.SpeedX = -Ball.SpeedX;
        PlayerTwo.Score += 1
    }
    Ball.PosY += Ball.SpeedY
    if (Ball.PosY + Ball.Height > Field.Height) {
        Ball.SpeedY = -Ball.SpeedY;

    }
    if (Ball.PosY <= 0) {
        Ball.SpeedY = -Ball.SpeedY;
    }
    Ball.Update()
    goPlayers()
    console.log(PlayerOne.Top)
}
Ball.Update()

function goPlayers() {
    if (PlayerOne.Top > 0) {
        PlayerOne.Top = PlayerOne.Top - PlayerOne.Speed
    }
    if (PlayerOne.Top + PlayerOne.Height >= Field.Height || PlayerOne.Top === 0) {
        PlayerOne.Top = PlayerOne.Top + PlayerOne.Speed
    }
    if(PlayerTwo.Top > 0){
        PlayerTwo.Top = PlayerTwo.Top - PlayerTwo.Speed;
    }
    if(PlayerTwo.Top + PlayerTwo.Height >= Field.Height || PlayerTwo.Top === 0){
        PlayerTwo.Top = PlayerTwo.Top + PlayerTwo.Speed
    }
    console.log(PlayerOne.Top, PlayerTwo.Top)
    PlayerTwo.Go()
    PlayerOne.Go()
}

document.onkeydown = Down;
document.onkeyup = Up;

function Down(event) {
    if (event.keyCode === 16) {
        PlayerOne.Speed = 3;
    }
    if(event.keyCode ===38){
        PlayerTwo.Speed = 3;
    }
    if ( event.keyCode === 17) {
        PlayerOne.Speed = -3;
    }
    if(event.keyCode === 40){
        PlayerTwo.Speed = -3;
    }
    goPlayers()
}

function Up(event) {
    if (event.keyCode ===17 || 16){
    PlayerOne.Speed = 0;}
    if(event.keyCode === 38||40){
        PlayerTwo.Speed = 0;
    }
}

// Работает поочередно
// document.onkeydown = goPlay;
//
// function goPlay(event) {
//     var player1 = document.getElementById('player1');
//     var topPlayer1 = player1.offsetTop;
//     var player2 = document.getElementById('player2');
//     var topPlayer2 = player2.offsetTop;
//     if (event.keyCode === 16 && topPlayer1 > 0) {
//         player1.style.top = topPlayer1 - PlayerOne.Speed + 'px';
//     }
//     if (event.keyCode === 17 && topPlayer1 + PlayerOne.Height + PlayerOne.Speed < Field.Height) {
//         player1.style.top = topPlayer1 + PlayerOne.Speed + 'px';
//     }
//     createPlayerOne();
//     if (event.keyCode === 38 && topPlayer2 > 0) {
//         player2.style.top = topPlayer2 - PlayerTwo.Speed + 'px';
//     }
//     if (event.keyCode === 40 && topPlayer2 + PlayerTwo.Height + PlayerTwo.Speed < Field.Height) {
//         player2.style.top = topPlayer2 + PlayerTwo.Speed + 'px';
//     }
//     createPlayerTwo();
// }


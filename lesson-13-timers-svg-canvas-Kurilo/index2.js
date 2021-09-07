const baseRadius = 200; //радиус циферблата
const numbersBaseRadius = baseRadius / 1.2; //радиус оси цифр циферблата
const circleRadius = baseRadius / 10; // радиус кружков с цифрами
const SmallSize = baseRadius / 20; //размер точки в центре часов

var Canvas = document.getElementById('Can');

setInterval(createWatch, 1000);

function createWatch() {
  createClockFace()
  createClock()
  createCircleCenter()
  createElWatch()
  createTextElWatch()
  createArrowSec()
  createArrowMin()
  createArrowHour()
  tickTimer()
}
createWatch('source-over',0,0);
function createClockFace() {
  var Face = Canvas.getContext('2d')
  Face.strokeStyle = 'black';
  Face.fillStyle = 'blue';
  Face.beginPath()
  Face.arc(baseRadius + circleRadius, baseRadius + circleRadius, baseRadius, 0, Math.PI * 2, true);
  Face.fill()
  Face.stroke();
}

function createClock() {
  for (var number = 1; number <= 12; number++) {
    var angle = number * 30 / 180 * Math.PI;
    var x = ((baseRadius - circleRadius) + circleRadius) + Math.round(Math.sin(angle) * numbersBaseRadius) + circleRadius
    var y = ((baseRadius - circleRadius) + circleRadius) - Math.round(Math.cos(angle) * numbersBaseRadius) + circleRadius
    createCircleNumber(x, y, number)
    createNumber(x, y, number)
  }
}

function createCircleNumber(circleX, circleY, number) {
  var circleNumber = Canvas.getContext('2d')
  circleNumber.strokeStyle = 'white';
  circleNumber.fillStyle = 'yellow';
  circleNumber.beginPath()
  circleNumber.arc(circleX, circleY, circleRadius, 0, Math.PI * 2, true);
  circleNumber.stroke();
  circleNumber.fill();
  }

function createNumber(circleX, circleY, number) {
  var Number = Canvas.getContext('2d');
  Number.fillStyle = 'black';
  Number.font = 'bold 20px Arial';
  Number.textBaseline = 'middle';
  Number.textAlign = 'center';
  Number.fillText(number, circleX, circleY);
}

function createCircleCenter() {
  var circleCenter = Canvas.getContext('2d');

  circleCenter.fillStyle = 'green';
  circleCenter.beginPath()
  circleCenter.arc(baseRadius + circleRadius, baseRadius + circleRadius, SmallSize, 0, Math.PI * 2, true);
  circleCenter.stroke();
  circleCenter.strokeStyle = 'white';
  circleCenter.fill();
}

function createElWatch() {
  var elWatch = Canvas.getContext('2d');
  elWatch.strokeStyle = 'green'
  elWatch.fillStyle = 'orange'
  elWatch.beginPath();
  elWatch.moveTo(baseRadius - circleRadius * 2, baseRadius - circleRadius * 2);
  elWatch.lineTo(baseRadius + circleRadius * 4, baseRadius - circleRadius * 2);
  elWatch.lineTo(baseRadius + circleRadius * 4, baseRadius);
  elWatch.lineTo(baseRadius - circleRadius * 2, baseRadius);
  elWatch.closePath()
  elWatch.stroke();
  elWatch.fill()
}

function createTextElWatch() {
  var CurrTime = new Date()
  var textElWatch = Canvas.getContext('2d');
  textElWatch.fillStyle = 'blue';
  textElWatch.font = 'bold 30px Arial';
  textElWatch.textBaseline = 'middle';
  textElWatch.textAlign = 'center';
  textElWatch.fillText(CurrTime.toLocaleTimeString(), baseRadius + circleRadius, baseRadius - circleRadius);
}

function createArrowSec(Sec) {
  var ArrowSec = Canvas.getContext('2d');
  ArrowSec.strokeStyle = 'green'
  ArrowSec.lineWidth = 2
  ArrowSec.save()
  ArrowSec.translate(baseRadius + circleRadius, baseRadius + circleRadius)
  ArrowSec.rotate(Sec)
  ArrowSec.beginPath();
  ArrowSec.moveTo(0, 0)
  ArrowSec.lineTo(circleRadius * 9, 0)
  ArrowSec.stroke()
  ArrowSec.restore()
}

function createArrowMin(Min) {
  var ArrowMin = Canvas.getContext('2d');
  ArrowMin.strokeStyle = 'Yellow'
  ArrowMin.lineWidth = 3
  ArrowMin.save()
  ArrowMin.translate(baseRadius + circleRadius, baseRadius + circleRadius)
  ArrowMin.rotate(Min)
  ArrowMin.beginPath();
  ArrowMin.moveTo(0, 0)
  ArrowMin.lineTo(circleRadius * 7, 0)
  ArrowMin.stroke()
  ArrowMin.restore()
}

function createArrowHour(Hour) {
  var ArrowHour = Canvas.getContext('2d');
  ArrowHour.strokeStyle = 'red'
  ArrowHour.lineWidth = 4
  ArrowHour.save()
  ArrowHour.translate(baseRadius + circleRadius, baseRadius + circleRadius)
  ArrowHour.rotate(Hour)
  ArrowHour.beginPath();
  ArrowHour.moveTo(0, 0)
  ArrowHour.lineTo(circleRadius * 5, 0)
  ArrowHour.stroke()
  ArrowHour.restore()
}

// Logic
function tickTimer() {
  var now = new Date();
  var thisSecond = now.getSeconds();
  var thisMinute = now.getMinutes();
  var thisHour = now.getHours();
  updateWatch(thisHour, thisMinute, thisSecond);
}

function updateWatch(hour, minute, second) {
  var Sec = ((second / 60) * 360 - 90) * Math.PI / 180;
  createArrowSec(Sec)
  var Min = ((minute) / 60 * 360 - 90) * Math.PI / 180;
  createArrowMin(Min)
  var Hour = ((hour + minute / 60) / 12 * 360 - 90) * Math.PI / 180;
  createArrowHour(Hour)
  createTextElWatch()
}
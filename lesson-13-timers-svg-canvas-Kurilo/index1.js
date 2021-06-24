"use strict"
const baseRadius = 300; //радиус циферблата
const numbersBaseRadius = baseRadius / 2.5; //радиус оси цифр циферблата
const circleRadius = 30; // радиус кружков с цифрами
const dotSize = 14; //размер точки в центре часов
const wrapper = document.querySelector("body");

const hours = {
  id: 'Hour',
  x: baseRadius / 2,
  y: baseRadius / 2,
  width: baseRadius / 5,
  height: 3,
  rx: dotSize / 4,
  ry: dotSize / 4,
  stroke: 'black',
  'transform-origin': baseRadius / 2
}
const minutes = {
  id: 'Min',
  x: baseRadius / 2,
  y: baseRadius / 2,
  width: baseRadius / 4,
  height: 2,
  rx: dotSize / 4,
  ry: dotSize / 4,
  stroke: 'black',
  'transform-origin': baseRadius / 2
}
const seconds = {
  id: 'Sec',
  x: baseRadius / 2,
  y: baseRadius / 2,
  width: baseRadius / 3,
  height: 1,
  rx: dotSize / 4,
  ry: dotSize / 4,
  stroke: 'red',
  'transform-origin': baseRadius / 2
}

var circleClockFace = {cx: baseRadius / 2, cy: baseRadius / 2, r: baseRadius / 2, fill: 'yellow', stroke: 'black'}


const http = "http://www.w3.org/2000/svg"

wrapper.appendChild(createWatch());

setInterval(tickTimer, 1000);

// setInterval(numberWatch, 1000);

function createWatch() {
  var base = document.createElementNS(http, 'svg');
  base.setAttribute('width', baseRadius);
  base.setAttribute('height', baseRadius);
  base.setAttribute('fill', 'white');
  base.appendChild(createClockFace());
  base.appendChild(createClock());
  base.appendChild(createDigitalWatch());
  base.appendChild(numberWatch());
  base.appendChild(createArrow(hours));
  base.appendChild(createArrow(minutes));
  base.appendChild(createArrow(seconds));
  base.appendChild(createDecorativeDot());
  return base;
}


function createClockFace() {
  var Face = document.createElementNS(http, 'circle');
  for (var k in circleClockFace)
    Face.setAttribute(k, circleClockFace[k])
  return Face
}

function createClock() {
  var clockFace = document.createDocumentFragment();
  for (var number = 1; number <= 12; number++) {
    var angle = number * 30 / 180 * Math.PI;
    var x = ((baseRadius - circleRadius) / 2) + Math.round(Math.sin(angle) * numbersBaseRadius) + circleRadius / 2
    var y = ((baseRadius - circleRadius) / 2) - Math.round(Math.cos(angle) * numbersBaseRadius) + circleRadius / 2
    clockFace.appendChild(createHourCircle(x, y, number));
    clockFace.appendChild(createNumber(x, y, number));
  }
  return clockFace
}

function createHourCircle(circleX, circleY, number) {
  var circleSmall = document.createElementNS(http, 'circle')
  var circleNumber = {cx: circleX, cy: circleY, r: circleRadius / 2, stroke: 'red'}
  for (var k in circleNumber)
    circleSmall.setAttribute(k, circleNumber[k])
  return circleSmall
}

function createNumber(circleX, circleY, number) {
  var Number = document.createElementNS(http, 'text')
  var NumberClock = {
    y: circleY + dotSize / 3,
    x: circleX,
    'font-size': dotSize,
    stroke: 'black',
    fill: 'white',
    'text-anchor': 'middle'
  }
  for (var k in NumberClock)
    Number.setAttribute(k, NumberClock[k])
  Number.appendChild(document.createTextNode(number));
  return Number
}

function createDecorativeDot() {
  var dot = document.createElementNS(http, 'circle')
  var dotClock = {cx: baseRadius / 2, cy: baseRadius / 2, r: dotSize / 2, fill: 'black'}
  for (var k in dotClock)
    dot.setAttribute(k, dotClock[k])
  return dot
}

function createDigitalWatch() {
  var textClock = document.createElementNS(http, 'rect')
  var text = {
    x: baseRadius / 2 - circleRadius * 1.5,
    y: baseRadius / 3,
    width: circleRadius * 3,
    height: circleRadius,
    rx: dotSize,
    ry: dotSize
  }
  for (var k in text)
    textClock.setAttribute(k, text[k])

  return textClock
}

function numberWatch() {
  var CurrTime = new Date();
  var WatchEl = document.createElementNS(http, 'text')
  var watch = {
    x: baseRadius / 2.1 - circleRadius,
    y: baseRadius / 2.5,
    'font-size': circleRadius / 1.5,
    stroke: 'black',
    'text-anchor': 'start',
    fill: 'white'
  }
  for (var k in watch)
    WatchEl.setAttribute(k, watch[k])
  WatchEl.appendChild(document.createTextNode(CurrTime.toLocaleTimeString()));
  return WatchEl
}

function createArrow(type) {
  var arrow = document.createElementNS(http, 'rect')
  for (var k in type)
    arrow.setAttribute(k, type[k])
  return arrow
}

//logic

function tickTimer() {
  var now = new Date();
  var thisSecond = now.getSeconds();
  var thisMinute = now.getMinutes();
  var thisHour = now.getHours();
  updateWatch(thisHour, thisMinute, thisSecond);
  numberWatch()
}

function updateWatch(hour, minute, second) {
  var thisSecondRotate = (second / 60) * 360 - 90;
  var arrowS = document.getElementById('Sec')
  arrowS.setAttribute('transform', 'rotate(' + thisSecondRotate + ')')
  var thisMinuteRotate = (minute) / 60 * 360 - 90;
  var arrowM = document.getElementById('Min')
  arrowM.setAttribute('transform', 'rotate(' + thisMinuteRotate + ')')
  var thisHourRotate = (hour + minute / 60) / 12 * 360 - 90;
  var arrowH = document.getElementById('Hour')
  arrowH.setAttribute('transform', 'rotate(' + thisHourRotate + ')')
}
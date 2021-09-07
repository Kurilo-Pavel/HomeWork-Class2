'use strict'

let animalsContent = []
let content = document.getElementById('content');
let bigLetters = [];
let target = null;

function addHash(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}

function animalTitle() {
  addHash({page: 'second'})

}

function animalText(event) {
  target = event.target.textContent
  addHash({page: 'third'})
  return target
}

let obj = new XMLHttpRequest();
obj.open('GET', 'contentAnimal.json');
obj.send();
obj.onreadystatechange = function () {
  if ((obj.readyState === 4) && (obj.status === 200)) {
    animalsContent = JSON.parse(obj.responseText);


    window.onhashchange = renderNewState;
    let SPAStateH = {};

    function renderNewState() {
      let URLHash = window.location.hash;
      let StateJSON = decodeURIComponent((URLHash.substr(1)));
      if (StateJSON !== "") {
        SPAStateH = JSON.parse(StateJSON);
      } else {
        SPAStateH = {page: 'first'};
      }
      let PageHTML = "";

      switch (SPAStateH.page) {
        case 'first':
          PageHTML += "<h2>Энциклопедия</h2>";
          PageHTML += "<a onclick='animalTitle()'>Список животных</a>"
          break;
        case 'second':
          PageHTML += "<h2>Оглавление</h2>";
          for (let i = 0; i < bigLetters.length; i++) {
            for (let n = 0; n < animalsContent.length; n++) {

              if (animalsContent[n].name.charAt(0) === bigLetters[i]) {
                PageHTML += "<ul>" + bigLetters[i].toUpperCase() +
                  "<li><a onclick = 'animalText(event)'>" + animalsContent[n].name + "</a></li></ul>"
              }
            }
          }
          break;
        case 'third':

        function create() {

          for (let i = 0; i < animalsContent.length; i++) {
            if (animalsContent[i].name.charAt(0) === target.charAt(0)) {
              PageHTML += "<a style='display: block' onclick = 'animalText(event)'>" + animalsContent[i].name + "</a>"

            }
          } return PageHTML
        }

          create()

        function createTitle() {
          PageHTML += "<h2>" + target + "</h2>";
          return PageHTML;
        }

          createTitle()
          let textAnimal;

          let text = new XMLHttpRequest();
          text.open('GET', 'animal/' + target + '.html');
          text.send();
          text.onreadystatechange = function () {
            if ((text.readyState === 4) && (text.status === 200)) {
               textAnimal = text.responseText;
              return textAnimal;
            }
          }


          PageHTML += "<p>"+ textAnimal + "</p>";
          break;
      }

      content.innerHTML = PageHTML;
    }

    renderNewState()


    function sort() {
      for (let i = 0; i < animalsContent.length; i++) {
        let nameAnimal = animalsContent[i].name;
        if (bigLetters.indexOf(nameAnimal.charAt(0)) === -1) {
          bigLetters.push(nameAnimal.charAt(0));
          bigLetters.sort();
        }
      }
    }

    sort()
  }
}


var colors = [];
var numSquares = 6;
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var msgDisplay = document.querySelector("#message")
var h1 = document.querySelector("h1")

var resBut= document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode");


init();




function init() {

  setupModeBtn()
  setupSquares()


  reset()
  resBut.addEventListener("click", function() {
    reset();
  })

  colorDisplay.textContent = pickedColor;
}

function setupSquares() {
  for(var i=0; i<squares.length; i++) {
    squares[i].addEventListener("click", function() {
      clickedColor = this.style.backgroundColor;
      if(clickedColor === pickedColor) {
        msgDisplay.textContent = "Correct!";
        changeColors(clickedColor)
        h1.style.backgroundColor=clickedColor;
        resBut.textContent="Play Again?"
      }
      else {
        this.style.backgroundColor = "#232323";
        msgDisplay.textContent = "Try Again";
      }
      // compare to picked color
    })
  }
}

function setupModeBtn() {
  for(var i=0; i<modeBtns.length; i++) {
    modeBtns[i].addEventListener("click", function() {
      modeBtns[0].classList.remove("selected");
      modeBtns[1].classList.remove("selected");
      this.classList.add("selected");

      this.textContent === "Easy" ? numSquares=3: numSquares=6;
      reset()
    })
  }
}

function reset(){
  colors = genRandColors(numSquares);
  pickedColor = pickColor();
  for(var i=0; i<squares.length; i++) {
    if(colors[i]) {
      squares[i].style.backgroundColor = colors[i];
      squares[i].style.display = "block";
    }
    else {
      squares[i].style.display = "none";
    }
  }
  h1.style.backgroundColor = "steelblue";
  resBut.textContent = "New Colors";
  msgDisplay.textContent = ""
  colorDisplay.textContent = pickedColor;
}






function changeColors(color) {
  for(var i=0; i<squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}


function pickColor() {
  var randColor = Math.floor(Math.random()*colors.length)
  return colors[randColor]
}

function genRandColors(numColors) {
  var arr=[];
  for(var i=0; i<numColors; i++) {
    arr.push(randColor());
  }
  return arr;
}


function randColor() {
  var r = Math.floor(Math.random()*256);
  var g = Math.floor(Math.random()*256);
  var b = Math.floor(Math.random()*256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}


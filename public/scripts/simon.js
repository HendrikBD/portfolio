var on = false, play = false, strict = false, select = false;
var timers=[];

var colors = [], selColors = [], count = 0;
var colorCode = {
"green": ["#080", "#0b0"],
"red": ["#b00", "#f00"],
"yellow": ["#aa0", "#ff0"],
"blue": ["#00b", "#00f"]
}
var colorNums = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue"
}
var audio = {
"green": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
"red": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
"yellow": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
"blue": new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
}
var currAudio = false;


$(".onSwitch").on("click", function(){
  if(!on){
    on = true;
    $(".disp").removeClass("off")
    reset();
    $(".onSwitch div").css("float", "right");
  } else {
    on = false;
    $(".disp").addClass("off")
    reset();
    strict=false;
    $(".strict div:nth-child(1)").css("background", "#555");
    $(".disp div div").html("")
    $(".onSwitch div").css("float", "left");

    if(currAudio){
      currAudio.currentTime=0;
      currAudio.pause();
    }
    turnOffColor("all");
  }
});

$(".start div").on("click", function(){
  if(on && !start){
    start=true;
    addColor();
  } else if(on){
    reset();
    start=true;
    setTimeout(addColor, 1000);
  }
});

$(".strict div:nth-child(2)").on("click", function(){
  if(on && !start){
    strict = !strict;

    if(strict){
      $(".strict div:nth-child(1)").css("background", "red");
    } else {
      $(".strict div:nth-child(1)").css("background", "#555");
    }
  }
});


$(".btn").on("click", function(){
  if(select && !play){
    var corColor = true;
    selColors.push(this.classList[1]);


    for(var i=0; i<selColors.length; i++){
      if(!(selColors[i]==colors[i])){
        corColor = false;
      }
    }

    if(!corColor){
      wrong();
      if(strict){
        timers.push(setTimeout(reset, 3500));
      } else {
        selColors = [];
        play=true;
        timers.push(setTimeout(turnOnColor, 4000, colors[0]));
      }
    }
    if(colors.length == selColors.length && corColor){
      if(colors.length==20){

        win();
      } else {
        select=false;
        setTimeout(addColor, 1000);
      } 
    }
  }
});

$(".btn").on("mousedown", function(){

  if(!play && on){



    if(currAudio && currAudio.attributes.src==audio[this.classList[1]].attributes.src){

      currAudio.currentTime=0;
      currAudio.play();
    } else {
      currAudio = audio[this.classList[1]];
      currAudio.play();
    }


    setTimeout(function(){
    }, 500)

    $("."+this.classList[1]).css("background",colorCode[this.classList[1]][1]);
  }
});

$(".btn").on("mouseup mouseleave", function(){
  if(!play){
    $("."+this.classList[1]).css("background",colorCode[this.classList[1]][0])
  }
})


function reset(){
  play = false;
  start = false;
  select=false;
  count = 0;
  colors = [];
  selColors = [];
  $(".disp div div").html("- -")
  timers.forEach(function(timer){
    clearTimeout(timer)
  })
  timers=[];
}

function addColor(){
  colors.push(colorNums[Math.floor(Math.random()*4)]);
  count = 0;
  play = true;
  turnOnColor(colors[0]);

  $(".disp div div").html(colors.length);
}

function turnOnColor(col){

  audio[col].play();
  switch(col) {
    case "green":
      $(".green").css("background","#0b0")
      break;
    case "red":
      $(".red").css("background","#f00")
      break;
    case "yellow":
      $(".yellow").css("background","#ff0")
      break;
    case "blue":
      $(".blue").css("background","#00f")
      break;
  }

  setTimeout(turnOffColor, 500, col);
}

function turnOffColor(col){
  count++;
  if(on && count==colors.length){

  }
  switch(col) {
    case "green":
      $(".green").css("background","#080")
      break;
    case "red":
      $(".red").css("background","#b00")
      break;
    case "yellow":
      $(".yellow").css("background","#aa0")
      break;
    case "blue":
      $(".blue").css("background","#00b")
      break;
    case "all":
      $(".green").css("background","#080")
      $(".red").css("background","#b00")
      $(".blue").css("background","#00b")
      $(".yellow").css("background","#aa0")
  }
  if(on && count<colors.length){

    setTimeout(turnOnColor, 500, colors[count])
  } else if(on && count==colors.length){
    play=false;
    count=0;

    selColors = [];
    select = true;
  } 
}

function win(){

  setTimeout(flashWin, 500);
  setTimeout(flashWin, 1000);
  setTimeout(flashWin, 1500);
  setTimeout(flashWin, 2000);
  setTimeout(flashWin, 2500);
  setTimeout(flashWin, 3000);
  setTimeout(flashWin, 3500);
  setTimeout(flashWin, 4000);
  setTimeout(reset, 5000)
}

function flashWin(){


  if(!$(".disp div div").html()){
    $(".disp div div").html("win")
  } else {
    $(".disp div div").html("")
  }
}

function wrong(){
  timers.push(setTimeout(flashWrong, 400));
  timers.push(setTimeout(flashWrong, 800));
  timers.push(setTimeout(flashWrong, 1200));
  timers.push(setTimeout(flashWrong, 1600));
  timers.push(setTimeout(flashWrong, 2000));
  timers.push(setTimeout(flashWrong, 2400));
  if(!strict){
    timers.push(setTimeout(function(){
      $(".disp div div").html(colors.length)
    }, 3200));
  }

}

function flashWrong(){
  if(on && !$(".disp div div").html()){
    $(".disp div div").html("X")
  } else {
    $(".disp div div").html("")
  }
}




let nextdelay = [3000, 5000];
let timerreduce = 1.09;
let listchoice = "English 200";

let timerstart;
let timerlength;
let timerreaction;
let timerrunning;
let deathtimer;
let currentword;
let levelscreen;
let readyscreen;
let currentlevel;

let bonusimage = document.createElement("img");
bonusimage.src = "./assets/images/bonusimage.png";

let gunshotaudio = new Audio("./assets/sounds/gunshot.wav")
let bonusmusicsound = new Audio("./assets/sounds/bonusmusic.wav");
bonusmusicsound.volume = 0.1;
let correctsound = new Audio("./assets/sounds/correct.wav");

function quicktypeinit(){

  timerstart = 1750;
  timerlength = timerstart;
  timerreaction = "false";
  timerrunning = "false";
  currentword = "ready";
  levelscreen = "false";
  readyscreen = true;
  currentlevel = 0;
  playertyped = "";
  musicsound = bonusmusicsound;


}

function quicktypedraw(deltatime){


  console.log(pressedspace);

  context.fillStyle = "rgba(64, 90, 255,1)"
  context.fillRect(0, 0, canvas.width, canvas.height)
  let imagesize = 200;
  context.drawImage(bonusimage, canvas.width/2 - imagesize/2, canvas.height/2 - imagesize/2, imagesize, imagesize);


  if(readyscreen && !gamepaused){

    if(playertyped == "ready" && pressedspace){

      playertyped = "";
      readyscreen = false;
      levelscreen = 2000;
      currentlevel++;

    }

    drawcurrent();
    drawtyped();


  }

  if(levelscreen != "false" && !gamepaused){

    if(!gamepaused) levelscreen -= deltatime;

    if(levelscreen > 0){
      drawlevel();
    }

    if(levelscreen < 0){

      timerrunning = (nextdelay[1] - nextdelay[0])*Math.random() + nextdelay[0]
      levelscreen = "false";

    }

  }

  if(timerrunning != "false" && !gamepaused){

    if(!gamepaused) timerrunning -= deltatime;

    if(timerrunning > 0){
      drawtimerrunning();
    }

    if(timerrunning < 0){
      console.log("time window: " + timerlength)
      timerlength /= timerreduce;
      timerreaction = timerlength;
      setword();
      timerrunning = "false";
      playertyped = "";

      let gunsoundclone = gunshotaudio.cloneNode(true)
      gunsoundclone.volume = gunsoundclone.volume;
      gunsoundclone.play();
      console.log("play sound");
    }

  }


  if(timerreaction != "false"){

    if(!gamepaused){

      timerreaction -= deltatime;

      if(timerreaction > 0){
        if(pressedspace){
          if(playertyped == currentword){

            currentlevel++;
            levelscreen = 2000;

            timerreaction = "false";

            let correctsoundclone = correctsound.cloneNode(true);
            correctsoundclone.volume = correctsound.volume;
            correctsoundclone.play();

          }
          else{
            playertyped = "";
            let deadsoundclone = deadsound.cloneNode(true)
            deadsoundclone.volume = deadsound.volume;
            deadsoundclone.play();
            diedmenu();
          }

        }

      }

      if(timerreaction < 0){
        let deadsoundclone = deadsound.cloneNode(true)
        deadsoundclone.volume = deadsound.volume;
        deadsoundclone.play();
        diedmenu();
      }
    }

    drawcurrent();
    drawtyped();
    drawtimeleft();
    if(gamepaused) drawlevel();
  }

  drawlistchoice();

  pressedspace = false;



}

function drawtimeleft(){

  let thetime = timerreaction < 0 ? 0 : timerreaction;
  let portion = thetime / timerlength;
  let fullsize = 200;
  let height = 5;

  context.fillStyle = "rgba(255,255,255,1)";
  context.fillRect(canvas.width/2 - fullsize/2, 200, fullsize * portion, height);

  context.fillStyle = "rgba(255,255,255,0.3)";
  context.fillRect(canvas.width/2 - fullsize/2 + fullsize * portion, 200, fullsize * (1 - portion), height)


}

function drawlistchoice(){
  let mcx = canvas.width/2;
  let mcy = 100;

  context.font = "50px Arial";
  context.textAlign = "center";
  context.fillStyle = "rgba(255,255,255,0.5)"

  context.fillText(listchoice, mcx, mcy);
}

function drawtimerrunning(){
  let mcx = canvas.width/2;
  let mcy = canvas.height/2;

  context.font = "30px Arial";
  context.textAlign = "center";
  context.fillStyle = "rgba(255,255,255,1)"

  context.fillText("Wait for it...", mcx, mcy);
}

function drawlevel(){
  let mcx = canvas.width/2;
  let mcy = 250;

  context.font = "30px Arial";
  context.textAlign = "center";
  context.fillStyle = "rgba(255,255,255,1)"
  context.fillText("Level " + currentlevel, mcx, mcy);
}

function drawcurrent(){
  let mcx = canvas.width/2;
  let mcy = canvas.height/2;

  context.font = "30px Arial";
  context.textAlign = "center";
  context.fillStyle = "rgba(255,255,255,1)"
  context.fillText(currentword, mcx, mcy);
}

function drawtyped(){
  let mcx = canvas.width/2;
  let mcy = canvas.height/2;

  context.font = "30px Arial";
  context.textAlign = "center";
  context.fillStyle = "rgba(255,255,255,1)"

  context.fillText(playertyped, mcx, mcy + 30);
}

function setword(){

  currentword = wordlists[listchoice][Math.floor(wordlists[listchoice].length*Math.random())];

}

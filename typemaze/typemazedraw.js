


function showgame(){

  gamestarted = true;
  init();

}

function unpausegame(){
  gamepaused = false;

  menumusicsound.pause();
  musicsound.play();

  lasttime = new Date().getTime();
}

function startgame(){

  init();
  gamepaused = false;
  musicsound.currentTime = 0;
  hidetimer = false;
  if(musicsound.paused) musicsound.play();

}

function stopgame(){

  init();
  initwords();
  gamestarted = false;
  musicsound.pause();


}

function pausegame(){

  gamepaused = true;

  musicsound.pause();

  console.log(musicsound);
  console.log("pausing music");

  if(menumusicsound.paused){
    menumusicsound.currentTime = 0;
    menumusicsound.play();
  }



}

let globaldeltatime = 0;

function typemazedraw(deltatime){

  globaldeltatime = deltatime;
  if(!gamestarted) return;

  if(mouseisdown){
    sandbox();
  }

  fontplus = basefontplus + Math.sin(new Date().getTime() * fontsizewigglespeed) * fontsizewiggle

  let cx = canvas.width/2;
  let cy = canvas.height/2;

  context.fillStyle = "white";
  context.fillRect(0,0, canvas.width, canvas.height)

  let corner = getXY(0,0,player[2],player[3]);
  let cornerx = corner[0] - (squaresize + squareplus) / 2;
  let cornery = corner[1] - (squaresize + squareplus) / 2;

  context.drawImage(backgroundimage,cornerx,cornery, (squaresize+squarespacing)*route[0].length, (squaresize+squarespacing)*route.length);

  for(var y = 0; y < words.length; y++){
    for(var x = 0; x < words[0].length; x++){

      let dx = x - player[0];
      let dy = y - player[1];


      if(player[1] + dy >= words.length || player[1] + dy < 0 || player[0] + dx >= words[0].length || player[0] + dx < 0) continue;

      let base = words[dy + player[1]][dx + player[0]];

      if(Math.abs(dy) + Math.abs(dx) == 1){
        base.squaresize = base.squaresize + (squaresize+squareplus - base.squaresize) * sizeease;
        base.fontsize = base.fontsize + (fontsize+fontplus - base.fontsize) * fontease;

      }
      else{
        base.squaresize = base.squaresize + (squaresize - base.squaresize) * sizeease;
        base.fontsize = base.fontsize + (fontsize - base.fontsize) * fontease;
      }


    }
  }

  if(!gamepaused && pressedspace){
    let moved = false;



    for(let dy = -1; dy <= 1; dy++){
      for(let dx = -1; dx <= 1; dx++){

        if(dy == 0 && dx == 0){
          continue;
        }
        if(Math.abs(dy) + Math.abs(dx) == 2){
          continue;
        }

        if(player[1] + dy >= words.length || player[1] + dy < 0 || player[0] + dx >= words[0].length || player[0] + dx < 0) continue;

        if(playertyped == words[player[1] + dy][player[0] + dx].word){
          moved = true;
          player[0] = player[0] + dx;
          player[1] = player[1] + dy;

        }

      }
    }

    if(moved){
      //movesound[Math.floor(Math.random()*movesound.length)].cloneNode(true).play();
    }
    else{
      nomovesound[Math.floor(Math.random()*nomovesound.length)].cloneNode(true).play();
    }

    playertyped = "";

    pressedspace = false;

  }



  for(var y = 0; y < route.length; y++){
    for(var x = 0; x < route[y].length; x++){

      let dx = x - (route[0].length / 2);
      let dy = y - (route.length / 2);

      let mc =  getXY(x,y,player[2],player[3]);
      let mcx = mc[0];
      let mcy = mc[1];

      if(words[y][x] != 1){
        context.fillStyle = "black";

        let mysize = words[y][x].squaresize;

        //context.fillRect(mcx - mysize / 2, mcy - mysize / 2, mysize, mysize);

        context.textAlign = "center";

        context.font = words[y][x].fontsize + "px Arial";

        let size = context.measureText(words[y][x].word);



        context.fillStyle = "rgba(0,0,0,0.2)";


        context.fillRect(mcx - size.width / 2 - 2, mcy - words[y][x].fontsize / 2 - 3, size.width + 4, words[y][x].fontsize + 6);

        context.fillStyle = "white";
        context.fillText(words[y][x].word,mcx,mcy+5);
      }

      else{
        //context.fillStyle = "blue";
        //context.fillRect(mcx - squaresize / 2, mcy - squaresize / 2, squaresize, squaresize);
      }



    }
  }


  player[2] = linearlerp(player[2],player[0],moveease * deltatime);
  player[3] = linearlerp(player[3],player[1],moveease * deltatime);

  if(player[2] < player[0]) player[4] = 1;
  if(player[2] > player[0]) player[4] = -1;

  let mc =  getXY(player[2],player[3],player[2],player[3]);
  let mcx = mc[0];
  let mcy = mc[1];

  context.scale(player[4],1);
  context.drawImage(playerimage, player[4]*(mcx - imagesize / 2), mcy - imagesize / 2, player[4]*imagesize, imagesize);
  context.setTransform(1, 0, 0, 1, 0, 0);

  context.fillStyle = "white";
  context.font = "20px Arial";
  context.fillText(playertyped,mcx,mcy+5);

  if(highlightmode || ctrlkey){
    let size = context.measureText(playertyped);

    context.fillStyle = "rgba(0,0,0,0.3)"
    if(highlightmode) context.fillStyle = "rgba(0,0,255,0.3)"
    context.fillRect(mcx - size.width/2 - 2, mcy - 10 - 3, size.width + 4, 20 + 6)
  }


  for(var i = 0; i < enemies.length; i++){

    drawenemy(enemies[i])

  }

  if(!gamepaused){
    movecooldown = startmovecooldown - movecooldownrate*currenttime[0]*60/1000
    //movecooldown -= movecooldownrate;
  }

  drawtimer();
  drawtitle();


}


function drawtitle(){

  if(hidetitle) return;

  let coord = getXY(player[2],player[3],player[2],player[3]);

  coord[1] = 100;

  context.fillStyle = "white";
  context.font = "70px Arial";
  context.strokeStyle = "black";
  context.lineWidth = 2;
  context.fillText(maptitle, coord[0], coord[1]);
  context.strokeText(maptitle, coord[0], coord[1]);

}

function drawtimer(){

  if(hidetimer) return;

  if(!gamepaused){
    let time = new Date().getTime();
    let oldtime = currenttime[0];
    currenttime[0] += globaldeltatime;
    currenttime[1] = time;

    if(oldtime % spawnrate > currenttime[0] % spawnrate){
      spawnenemy();
    }
  }




  let dmilli = currenttime[0];
  let minutes = Math.floor((dmilli / 1000) / 60);
  let seconds = Math.floor((dmilli / 1000) % 60);

  context.fillStyle = "white";
  context.font = "70px Arial";

  let coord = getXY(player[2],player[3],player[2],player[3]);

  coord[1] = 100;

  if(minutes == 0) minutes = "00";
  if(seconds < 10) seconds = "0" + seconds;

  context.strokeStyle = "black";
  context.lineWidth = 2;
  context.fillText(minutes + ":" + seconds, coord[0], coord[1]);
  context.strokeText(minutes + ":" + seconds, coord[0], coord[1]);
}


function spawnenemy(){

  let coord = [Math.floor( Math.random() * route[0].length ), Math.floor( Math.random() * route.length )];

  if(route[coord[1]][coord[0]] == 1){
    return spawnenemy();
  }

  enemies.push([[...coord], Math.random() * movecooldown, [...coord]]);

}

function drawenemy(enemy){

  let dt = globaldeltatime;

  if(!gamepaused){
    enemy[1]-=dt*60/1000;

    if(enemy[1] <= 0){


      let nextspot = getNextSpot(enemy[0][0], enemy[0][1], player[0], player[1], enemies);


      enemy[0] = nextspot;

      enemy[1] = movecooldown;

    }

    enemy[2][0] = linearlerp(enemy[2][0], enemy[0][0], moveease * globaldeltatime)
    enemy[2][1] = linearlerp(enemy[2][1], enemy[0][1], moveease * globaldeltatime)

    if(enemy[2][0] < enemy[0][0]) enemy[3] = 1
    if(enemy[2][0] > enemy[0][0]) enemy[3] = -1


  }


  let mc = getXY(enemy[2][0], enemy[2][1], player[2], player[3])
  let mcx = mc[0];
  let mcy = mc[1];

  context.scale(enemy[3],1);
  context.drawImage(enemyimage, enemy[3]*(mcx - imagesize / 2), mcy - imagesize / 2, enemy[3]*imagesize, imagesize);
  context.setTransform(1, 0, 0, 1, 0, 0);


  let deathdistance = 0.5;

  let distance = Math.abs(player[2] - enemy[2][0]) + Math.abs(player[3] - enemy[2][1]);

  if(distance < deathdistance && !gamepaused){

    let deadsoundclone = deadsound.cloneNode(true)
    deadsoundclone.volume = deadsound.volume;
    deadsoundclone.play();
    diedmenu();


  }

}

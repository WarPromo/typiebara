
let canvas,context
let mouseisdown = false;
let mousepos = {x:0, y:0};

function start(){

  document.addEventListener('keydown', keydown);
  document.addEventListener('contextmenu', event => event.preventDefault());

  canvas = document.getElementById("my-canvas")
  canvas.onmousemove = mousemove;
  canvas.onmousedown = mousedown;
  canvas.onmouseup = mouseup;

  context = canvas.getContext('2d');


  onlyvisible("menu");

  showgame();

  window.requestAnimationFrame(loop);

  //setInterval(draw, 1000/60);
}

let lasttime = new Date().getTime();

function loop(time){

  let newtime = new Date().getTime();
  draw(newtime - lasttime);
  lasttime = newtime;
  window.requestAnimationFrame(loop);

}


function mousedown(e){
  console.log(e.button);
  if(e.button == 0) mouseisdown = true;
  if(e.button == 2){
    moveplayer();
  }
}
function mouseup(e){
  if(e.button == 0) mouseisdown = false;
}

function mousemove(e){

  mousepos = getMousePos(canvas, e);

}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function keydown(e){

  let key = e.key.toLowerCase();

  const charList = 'abcdefghijklmnopqrstuvwxyz';

  if(charList.indexOf(key) == -1){

    if(key == "backspace"){

      playertyped = playertyped.substring(0, playertyped.length-1);

    }
    if(key == " "){

      pressedspace = true;

    }

  }
  else{
    playertyped += key;
  }



}

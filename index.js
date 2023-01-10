
let canvas,context
let mouseisdown = false;
let mousepos = {x:0, y:0};
let ctrlkey = false;
let akey = false;
let highlightmode = false;


function gsigninbutton(){

  google.accounts.id.initialize({
    client_id: "394929769164-bhb0btmf41iptrtbuo4mjhjuv219c6cc.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: "filled_black", size: "large", shape:"square", type:"icon"}  // customization attributes
  );

}

function start(){

  console.log("start");

  document.addEventListener('keydown', keydown);
  document.addEventListener('keyup', keyup);
  document.addEventListener('contextmenu', event => event.preventDefault());
  document.addEventListener("visibilitychange", pausemenu);
  document.addEventListener('mousemove', mousemove);
  document.addEventListener('mousedown', mousedown);
  document.addEventListener('mouseup', mouseup);



  gsigninbutton();

  if(localStorage.getItem("login") != null){
    setsignin(JSON.parse(localStorage.getItem("login")));
  }

  canvas = document.getElementById("my-canvas")
  context = canvas.getContext('2d',{ alpha: false });

  let root = document.getElementById("root");
  let loading = document.getElementById("loadingdiv");

  setTimeout( () => {


    root.style.opacity = 1
    loading.style.opacity = 0;


  }, 1300);

  clickabletabbuttons();
  onlyvisible("menu");

  drawfunction = typemazedraw;
  init = typemazeinit;

  showgame();
  pausegame();

  window.requestAnimationFrame(loop);
}


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

let lasttime = new Date().getTime();
let drawfunction;
let init;

function loop(time){

  let newtime = new Date().getTime();
  drawfunction(newtime - lasttime);
  lasttime = newtime;
  window.requestAnimationFrame(loop);

}


function mousedown(e){

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
    console.log(key);
    if(key == "backspace"){

      playertyped = playertyped.substring(0, playertyped.length-1);
      if(ctrlkey || highlightmode) playertyped = "";
      if(highlightmode) highlightmode = false;

    }
    if(key == "control") ctrlkey = true;
    if(key == " "){

      pressedspace = true;

    }


  }
  else{


    if(ctrlkey){

      if(key == "a") highlightmode = true;

    }
    else{

      if(highlightmode) {
        playertyped = "";
        highlightmode = false;
      }

      playertyped += key;
    }


  }



}

function keyup(e){

  let key = e.key.toLowerCase();

  if(key == "control") ctrlkey = false;
  if(key == "a") akey = false;


}

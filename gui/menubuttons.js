


let menus = ["menu","ingamemenu","deadmenu","tutorialmenu","pausemenu"];
let currentvisible = "menu";

function menustartgame(){

  onlyvisible("ingamemenu");

  startgame();
}

function mainmenu(){

  hidetimer = true;
  onlyvisible("menu")

  showgame();
  pausegame();

}



function resumegame(){
  onlyvisible("ingamemenu");
  unpausegame();
}



function pausemenu(){
  console.log("tryna pause dat shit");
  if(currentvisible != "ingamemenu") return;
  onlyvisible("pausemenu");
  pausegame();
}

function restartgame(){

  onlyvisible("ingamemenu");
  showgame();
  startgame();

}

function showtutorial(){
  onlyvisible("tutorialmenu");
}

function diedmenu(){

  onlyvisible("deadmenu");
  gamepaused = true;
  musicsound.pause();

}

function backmenu(){
  onlyvisible("menu")
}

function onlyvisible(choice){

  currentvisible = choice;
  for(let a = 0; a < menus.length; a++){
    let menu = document.getElementById(menus[a]);
    menu.style.opacity = menus[a] == choice ? 1 : 0;
    menu.hidden = menus[a] != choice;

  }

}
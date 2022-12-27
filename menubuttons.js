


let menus = ["menu","ingamemenu","deadmenu","tutorialmenu","pausemenu","mapmenu"];
let currentvisible = "menu";




function clickabletabbuttons(){
  let tabbuttons = document.getElementsByClassName("tabbutton");
  for(var i = 0; i < tabbuttons.length; i++) {
    makeclickable(tabbuttons[i]);
    makeUnselectable(tabbuttons[i]);
    tabbuttons[i].classList.add("unselectable")
  }
}

function makeUnselectable(node) {
    if (node.nodeType == 1) {
        node.setAttribute("unselectable", "on");
    }
    var child = node.firstChild;
    while (child) {
        makeUnselectable(child);
        child = child.nextSibling;
    }
}

function makeclickable(button){

  button.tabIndex = "0";


  button.onkeydown = enterclick;


}

function enterclick(event){
  if(event.key == "Enter") event.composedPath()[0].click();
}


function menustartgame(){

  hidetitle = true;

  onlyvisible("ingamemenu");

  startgame();
  unpausegame();
}

function mainmenu(){

  hidetimer = true;
  hidetitle = true;


  if(menumusicsound.paused) menumusicsound.play();

  onlyvisible("menu")

  showgame();
  pausegame();

}

function decrementindex(){
  mapindex--;
  showgame();
}

function incrementindex(){
  mapindex++;
  showgame();
}

function mapmenu(){

  hidetimer = true;
  hidetitle = false;

  if(menumusicsound.paused) menumusicsound.play();

  onlyvisible("mapmenu");

}



function resumegame(){

  hidetimer = false;
  hidetitle = true;

  onlyvisible("ingamemenu");
  unpausegame();
}



function pausemenu(){
  if(currentvisible != "ingamemenu") return;

  hidetimer = false;
  hidetitle = true;

  onlyvisible("pausemenu");
  pausegame();
}

function restartgame(){

  hidetimer = false;
  hidetitle = true;

  onlyvisible("ingamemenu");
  showgame();
  startgame();

}

function showtutorial(){

  hidetitle = true;
  hidetimer = true;

  if(menumusicsound.paused) menumusicsound.play();
  onlyvisible("tutorialmenu");
}

function diedmenu(){

  hidetitle = true;
  hidetimer = false;

  onlyvisible("deadmenu");

  let restartbutton = document.getElementsByClassName("restartbutton")[0]
  restartbutton.focus();

  gamepaused = true;
  musicsound.pause();

}

function backmenu(){

  hidetitle = true;
  hidetimer = true;

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




let menus = ["menu","ingamemenu","deadmenu","tutorialmenu","pausemenu","mapmenu", "bonusingamemenu", "bonusbuttons", "rankmenu"];
let currentvisible = ["menu"];




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

  drawfunction = typemazedraw;
  init = typemazeinit;

  startgame();
  unpausegame();
}

function showbonusmenu(event){
  let buttons = document.getElementById("bonusbuttons");

  if(buttons.hidden){
    document.getElementById("bonusbuttons").hidden = false;
    document.getElementById("bonusbuttons").style.opacity = 1;
    event.composedPath()[0].focus();
  }
  else{
    document.getElementById("bonusbuttons").hidden = true;
    document.getElementById("bonusbuttons").style.opacity = 0;
    event.composedPath()[0].blur();
  }

  if(menumusicsound.paused) menumusicsound.play();
}

function showbonus(option){

  onlyvisible("bonusingamemenu");

  listchoice = option;
  drawfunction = quicktypedraw;
  init = quicktypeinit;

  startgame();
  unpausegame();

}

function mainmenu(){

  pausegame();

  hidetimer = true;
  hidetitle = true;


  if(menumusicsound.paused) menumusicsound.play();

  onlyvisible("menu")

  drawfunction = typemazedraw;
  init = typemazeinit;

  showgame();


}

function decrementindex(){
  mapindex--;

  showgame();
  updaterankmenu()

}

function incrementindex(){
  mapindex++;

  showgame();
  updaterankmenu()

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
  if(currentvisible.indexOf("ingamemenu") == -1) return;

  hidetimer = false;
  hidetitle = true;

  onlyvisible("pausemenu");
  pausegame();
}

function restartgame(){

  hidetimer = false;
  hidetitle = true;

  if(drawfunction == typemazedraw) onlyvisible("ingamemenu");
  if(drawfunction == quicktypedraw) onlyvisible("bonusingamemenu");

  showgame();
  startgame();

}

function showtutorial(){

  hidetitle = true;
  hidetimer = true;

  if(menumusicsound.paused) menumusicsound.play();
  onlyvisible("tutorialmenu");
}

function updaterankmenu(){
  let me = document.getElementById("rankmenu")

  if(!me.hidden){
    clearrankings();
    getrankings();
  }
}

function rankmenu(event){

  let me = document.getElementById("rankmenu");

  if(me.hidden){
    addvisible("rankmenu");
    updaterankmenu();
  }
  else {

    removevisible("rankmenu");
  }

}

function diedmenu(){

  hidetitle = true;
  hidetimer = false;

  onlyvisible("deadmenu");

  let publishing = document.getElementsByClassName("publishing")[0];
  if(profile == null) publishing.hidden = true;
  else {
    publishing.hidden = false;

    publishing.style.background = "#1a73e8"
    //publishing.style.opacity = 1;
    publishing.style.width = "60px";

    document.getElementById("publishingloading").style.opacity = 1;
    document.getElementById("publishinglogged").style.opacity = 0;

    postranking(maptitle, currenttime[0]);

  }

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

  currentvisible = [choice];
  for(let a = 0; a < menus.length; a++){
    let menu = document.getElementById(menus[a]);
    menu.style.opacity = menus[a] == choice ? 1 : 0;
    menu.hidden = menus[a] != choice;
  }

}

function showleaderboard(){
  onlyvisible("mapmenu")
  rankmenu();
}

function addvisible(choice){
  if(currentvisible.indexOf(choice) == -1) currentvisible.push(choice)
  let el = document.getElementById(choice);
  el.style.opacity = 1;
  el.hidden = false;
}

function removevisible(choice){
  if(currentvisible.indexOf(choice) != -1) currentvisible.splice(currentvisible.indexOf(choice), 1)
  let el = document.getElementById(choice);
  el.style.opacity = 0;
  el.hidden = true;


}

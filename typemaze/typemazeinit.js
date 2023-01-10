



let wordlist = "the be of and a to in he have it that for they with as not on she at by this we you do but from or which one would all will there say who make when can more if no man out other so what time up go about than into could state only new year some take come these know see use get like then first any work now may such give over think most even find day also after way many must look before great back through long where much should well people down own just because good each those feel seem how high too place little world very still nation hand old life tell write become here show house both between need mean call develop under last right move thing general school never same another begin while number part turn real"
wordlist = wordlist.split(" ");

let route = [];
let words = [];

let gamestarted = false;
let gamepaused = true;
let mapindex = 0;
let hidetimer = true;
let hidetitle = true;

let mirror = [-1,1];
let anglespeed = [-0.005, 0.003, 0.002, 0, 0.002,0.003,0.005];

let squaresize = 80;
let squarespacing = 5;
let imagesize = 90;
let sizeease = 0.1;
let squareplus = 5;
let fontease = 0.1;
let basefontplus = 6;
let fontplus = basefontplus;
let fontsizewiggle = 1;
let fontsizewigglespeed = 0.002;
let fontsize = 14;
let moveease = 0.002;

let movesound = [new Audio("./assets/sounds/grass0.wav"),
                  new Audio("./assets/sounds/grass1.wav"),
                  new Audio("./assets/sounds/grass2.wav"),
                  new Audio("./assets/sounds/grass3.wav")]

let nomovesound = [new Audio("./assets/sounds/nope0.wav"),
                  new Audio("./assets/sounds/nope1.wav")]

let deadsound = new Audio("./assets/sounds/death.wav");
deadsound.volume = 0.2;

let menumusicsound = new Audio("./assets/sounds/menumusic.wav")
menumusicsound.volume = 0.08;

let maptitle;

let musicsound;
let backgroundimage;
let playerimage;
let enemyimage;
let player;
let enemies;
let movecooldown;
let startmovecooldown;
let movecooldownrate;
let spawnrate;

let playertyped = "";
let pressedspace = false;

let currenttime = [0,new Date().getTime()];
let baseword = {

  squaresize: squaresize,
  fontsize: 14,
  word: "",
  scale: 1,
  angle: 0,
  anglespeed: 0


}




function typemazeinit(){

  if(mapindex < 0) mapindex = maplist.length + mapindex;
  mapindex = mapindex % maplist.length;

  playertyped = "";
  for(var i = 0; i < movesound.length; i++) movesound[i].loop = false;
  for(var i = 0; i < nomovesound.length; i++) nomovesound[i].loop = false;
  deadsound.loop = false;

  let tocopy = maplist[mapindex];

  player = [...tocopy.player];
  enemies = JSON.parse(JSON.stringify(tocopy.enemy));
  movecooldown = tocopy.movecooldown;
  startmovecooldown = tocopy.movecooldown;
  movecooldownrate = tocopy.movecooldownrate;
  spawnrate = tocopy.spawnrate;
  route = JSON.parse(JSON.stringify(tocopy.route));

  backgroundimage = tocopy.backgroundimage;
  playerimage = tocopy.playerimage;
  enemyimage = tocopy.enemyimage;

  musicsound = tocopy.musicsound;
  maptitle = tocopy.name;

  mirror = tocopy.mirror;
  anglespeed = tocopy.anglespeed;

  currenttime = [0,new Date().getTime()];

  typemazeinitwords();
}

function typemazeinitwords(){

  words = JSON.parse(JSON.stringify(route));

  for(var y = 0; y < words.length; y++){
    for(var x = 0; x < words[0].length; x++){

      let choices = new Set(wordlist);

      if(route[y][x] != 0) continue;

      for(var dy = -2; dy <= 2; dy++){
        for(var dx = -2; dx <= 2; dx++){

          if(y + dy < 0 || y + dy >= words.length || x + dx < 0 || x + dx >= words[0].length) continue;

          let word = words[y + dy][x + dx].word;

          if(choices.has(word)){
            choices.delete(word);
          }

        }
      }

      choices = [...choices];

      let word = choices[Math.floor(Math.random() * choices.length)];

      let tile = JSON.parse(JSON.stringify(baseword));

      tile.word = word;
      tile.scale = mirror[Math.floor(Math.random()*2)];
      tile.angle = 0;
      tile.anglespeed = anglespeed[Math.floor(Math.random()*anglespeed.length)];

      words[y][x] = tile;

    }
  }



}

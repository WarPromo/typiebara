let devmode = false;
let palettedev = 0;

function moveplayer(){

  if(!devmode) return;


  console.log("try movign them");


  let dsquarex = Math.floor( (mousepos.x - canvas.width/2 + (squarespacing + squaresize)/2) / (squarespacing + squaresize) + player[2]);
  let dsquarey = Math.floor( (mousepos.y - canvas.height/2 + (squarespacing + squaresize)/2) / (squarespacing + squaresize) + player[3]);

  if(dsquarex < 0 || dsquarex >= route[0].length || dsquarey < 0 || dsquarey >= route.length) return;

  player[0] = dsquarex;
  player[1] = dsquarey;
  player[2] = dsquarex;
  player[3] = dsquarey;
}

function sandbox(){

  if(!devmode) return;

  let dsquarex = Math.floor( (mousepos.x - canvas.width/2 + (squarespacing + squaresize)/2) / (squarespacing + squaresize) + player[2]);
  let dsquarey = Math.floor( (mousepos.y - canvas.height/2 + (squarespacing + squaresize)/2) / (squarespacing + squaresize) + player[3]);

  if(dsquarex < 0 || dsquarex >= route[0].length || dsquarey < 0 || dsquarey >= route.length) return;

  route[dsquarey][dsquarex] = palettedev;

  typemazeinitwords();

}

function clearroute(){
  for(var a = 0; a < route.length; a++){

    for(var b = 0; b < route[a].length; b++) route[a][b] = 0

  }

  typemazeinitwords()
}

function copyroute(){
  let string = "[\n";
  for(var y = 0; y < route.length; y++){
    string += JSON.stringify(route[y]) + `,\n`
  }
  string += "\n]"
  copy(string)
}

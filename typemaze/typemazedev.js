



let devmode = false;

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

  route[dsquarey][dsquarex] = 1;

  initwords();

}

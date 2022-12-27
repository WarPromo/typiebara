function FixedgetNextSpot(sx, sy, ex, ey, enemies){

  let list = [ [ [[sx,sy]], 0 ] ];
  let nextlist = [];
  let been = JSON.parse(JSON.stringify(route));
  let possible = [];

  while(list.length > 0){

    L2: for(var j = 0; j < list.length; j++){

      let spot = list[j];

      let tx = spot[0][spot[0].length-1][0];
      let ty = spot[0][spot[0].length-1][1];

      for(var dy = -1; dy <= 1; dy++){
        L: for(var dx = -1; dx <= 1; dx++){

          if(dy == 0 && dx == 0) continue;

          let x = tx + dx;
          let y = ty + dy;

          for(var i = 0; i < enemies.length; i++){

            if(enemies[i][0][0] == x && enemies[i][0][1] == y) continue L;

          }

          if(x >= route[0].length || x < 0 || y >= route.length || y < 0) continue;

          if(been[y][x] != -1 && route[y][x] != 1){

            let newpath = JSON.parse(JSON.stringify(spot));
            if(newpath[0].length < 3) newpath[0].push([x,y]);
            else newpath[0][3] = [x,y];

            newpath[1] += Math.abs(x - ex) + Math.abs(y - ey);

            if(x == ex && y == ey){
              if(possible.length == 0 || newpath[1] < possible[1]) possible = newpath;
              continue L2;
            }

            console.log("PUSHING");

            if(possible.length == 0) {nextlist.push(newpath)};
            been[y][x] = -1;

          }


        }
      }


    }

    list = nextlist;
    nextlist = [];
    console.log(nextlist + " yo");

  }

  let spot = possible;

  console.log(possible);

  if(spot[0].length == 1) return spot[0][0];
  else{

    if(spot[0].length == 2) return spot[0][1];

    let dx = Math.abs(spot[0][2][0] - spot[0][0][0]);
    let dy = Math.abs(spot[0][2][1] - spot[0][0][1]);

    if(dx <= 1 && dy <= 1) return spot[0][2];
    else return spot[0][1];

  }

  return [sx,sy];


}

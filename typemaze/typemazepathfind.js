

function getNextSpot(sx, sy, ex, ey, enemies){

  let list = [[[sx,sy]]];
  let been = JSON.parse(JSON.stringify(route));

  while(list.length > 0){

    let spot = list[0];
    list.shift();

    let tx = spot[spot.length-1][0];
    let ty = spot[spot.length-1][1];

    if(tx == ex && ty == ey){
      return spot.length > 1 ? spot[1] : spot[0];
    }

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
          if(newpath.length < 2) newpath.push([x,y]);
          else newpath[2] = [x,y];

          list.push(newpath);
          been[y][x] = -1;

        }


      }
    }


  }

  return [sx,sy];


}

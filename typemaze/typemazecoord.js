

function getXY(x, y, ox, oy){

  return [canvas.width/2 + ((squaresize+squarespacing)*(x - ox)),
          canvas.height/2 + ((squaresize+squarespacing)*(y - oy))]

}

function linearlerp(val1, val2, m){


  let regulardist = 1;
  let mydist = regulardist - Math.abs(val1 - val2);
  let myxval = -1*((-1*(mydist-1))**(0.5))+1;
  let newx = myxval + m;
  if(newx > 1) newx = 1;
  let newm = ( -1*(newx-1)**2 + 1 ) - mydist;
  m = newm;

  if(val1 == val2) return val1;

  if(val1 < val2){
    val1 += m;
    if(val1 > val2) return val2;
    return val1;
  }

  if(val1 > val2){
    val1 -= m;
    if(val1 < val2) return val2;
    return val1;
  }


}

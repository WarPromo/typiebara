

function getXY(x, y, ox, oy){

  return [canvas.width/2 + ((squaresize+squarespacing)*(x - ox)),
          canvas.height/2 + ((squaresize+squarespacing)*(y - oy))]

}

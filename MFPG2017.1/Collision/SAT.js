/*
  Classe estática provisória
*/

class SAT {
  
  static getAxis(vertexList){
    var out = new Array();

    for (var i=0; i<vertexList.length; i++) {
      const v1 = vertexList[i];
      const v2 = vertexList[(i + 1)%vertexList.length];

      const edge = {x: v1.x-v2.x, y: v1.y-v2.y};
      out.push({x: edge.y, y: -edge.x}); // {y, -x} perpendicular to {x, y}
    }

    return out;
  }
  static project(vertexList, axis){
    var MIN = vertexList[0].x*axis.x + vertexList[0].y*axis.y;
    var MAX = MIN;

    for(var i=1; i<vertexList.length; i++) {
      const current = vertexList[i];
      var temp = current.x*axis.x + current.y*axis.y;
      if (temp < MIN) {
        MIN = temp;
      } else if (temp > MAX) {
        MAX = temp;
      }
    }

    return {left: MIN, right: MAX};
  }
}

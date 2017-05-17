/*
Class that store every segment presets.

Constructor: (forward, segLenght)
  forward can be null. But, if it is null, the draw() will not work. (see: Segment.draw() )
  segLenght is the "segment length".
  
draw: (x,y)
  draws the segment in x,y position. For this method, the 'forward' constructor's parameter can be null.
  
draw:
  Uses the 'forward' constructor's parameter do set x,y to draw this segment. If forward is null, does nothing.
*/

class Segment {
  private float x, y, segLength;
  private Segment forward;
  
  public Segment(Segment forward, float segLength){
    this.forward = forward;
    this.segLength = segLength;
  }
  
  public void draw(float x, float y) {
    float dx = x - this.x;
    float dy = y - this.y;
    float angle = atan2(dy, dx);  
    this.x = x - cos(angle) * this.segLength;
    this.y = y - sin(angle) * this.segLength;
    segment(this.x, this.y, angle);
  }
  public void draw() {
    if(this.forward!=null) draw(this.forward.x, this.forward.y);
  }

  private void segment(float x, float y, float a) {
    pushMatrix();
    translate(x, y);
    rotate(a);
    line(0, 0, segLength, 0);
    popMatrix();
  }
};
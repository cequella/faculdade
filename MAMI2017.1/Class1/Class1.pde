/*

 Pt-BR: 
 Apresentar, alterar e discutir um dos exemplos disponíveis em
 http://processing.org/examples, relacionando-o ao conteúdo
 exposto no documentário “Hello World! Processing”
 
 En-US:
 Present, change and discuss an available examples in
 http://processing.org/examples, relating it to content
 Exposed in the documentary "Hello world! In processing"
 
 Base:
 https://processing.org/examples/follow2.html
 
 */

class Segment {
  private float x, y, segLength;
  private Segment forward;
  
  public Segment(Segment forward, float segLength){
    this.forward = forward;
    this.segLength = segLength;
  }
  
  private void draw(float x, float y) {
    float dx = x - this.x;
    float dy = y - this.y;
    float angle = atan2(dy, dx);  
    this.x = x - cos(angle) * this.segLength;
    this.y = y - sin(angle) * this.segLength;
    segment(this.x, this.y, angle);
  }
  private void draw() {
    float dx = forward.x - this.x;
    float dy = forward.y - this.y;
    float angle = atan2(dy, dx);  
    this.x = forward.x - cos(angle) * this.segLength;
    this.y = forward.y - sin(angle) * this.segLength;
    segment(this.x, this.y, angle);
  }

  private void segment(float x, float y, float a) {
    pushMatrix();
    translate(x, y);
    rotate(a);
    line(0, 0, segLength, 0);
    popMatrix();
  }
};

Segment segment[];
final float LENGTH = 50;
final int COUNT = 5;
int currentCount = 1;

void setup() {
  size(640, 360);
  strokeWeight(20.0);
  stroke(255, 100);
  
  segment = new Segment[COUNT];
  segment[0] = new Segment(null, LENGTH);
}

void mouseWheel(MouseEvent event) {
  int temp = (event.getCount()>0)?-1:1;
  
  if(temp==1 && currentCount<COUNT){
    segment[currentCount] = new Segment(segment[currentCount-1], LENGTH);
    currentCount += temp;
  } else if(temp == -1 && currentCount>1){
    segment[currentCount-1] = null;
    currentCount += temp;
  }
}

void draw() {
  background(0);
  
  segment[0].draw(mouseX, mouseY);
  for(int i=1; i<currentCount; i++){
    segment[i].draw();
  }
}
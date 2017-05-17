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

// START CONFIGURATION
final float LENGTH        = 50;
final int   COUNT         = 5;
final float STROKE_WEIGHT = 20.0;
final color STROKE_COLOR  = color(255,100);

Segment segment[];
int     currentCount  = 1;

void setup() {
  size(640, 360);
  strokeWeight(STROKE_WEIGHT);
  stroke(STROKE_COLOR);
  
  segment = new Segment[COUNT];           // Start array of Segments
  segment[0] = new Segment(null, LENGTH); // Initialize the first segment.
}

void mouseWheel(MouseEvent event) {
  int temp = (event.getCount()>0)?-1:1; // If scroll-down, set temp to -1. Else, set to 1.
  
  if(temp==1 && currentCount<COUNT){ // Create new segment and update currentCount
    segment[currentCount] = new Segment(segment[currentCount-1], LENGTH);
    currentCount += temp;
  } else if(temp == -1 && currentCount>1){ // Remove last segment and update currentCount
    segment[currentCount-1] = null;
    currentCount += temp;
  }
}

void draw() {
  background(0);
  
  segment[0].draw(mouseX, mouseY); // Draw first segment in mouse coord
  for(int i=1; i<currentCount; i++){ // Draw the rest
    segment[i].draw();
  }
}
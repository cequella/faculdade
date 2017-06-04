#include <iostream>

using namespace std;

double pseudoangle(double dx, double dy){
  int octante;

  double temp=(dx>dy)?dy/dx:dx?dy;
  
  if(octante == 0) {        // Primeiro octante
	return temp;
  } else if(octante == 1) { // Segundo octante
	return 2-temp;
  } else if(octante == 2) { // Terceiro octante
	return 2+temp;
  } else if(octante == 3) { // Quarto octante
	return 4-temp;
  } else if(octante == 4) { // Quinto octante
	return 4+temp;
  } else if(octante == 5) { // Sexto octante
	return 6-temp;
  } else if(octante == 6) { // Sétimo octante
	return 6+temp;
  } else {                   // Oitavo octante
	return 8-temp;
  }
}

int main(){
  return 0;
}

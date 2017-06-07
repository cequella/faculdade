#include <iostream>
#include <cmath>

#include "Matrix.hpp"

using namespace std;

int main(){
  Matrix3 m = Matrix3::rotationX(M_PI/3.0);
  
  cout << m << endl;
  
  return 0;
}

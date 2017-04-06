#include <iostream>

#include "FixedPoint.hpp"

using namespace std;

int main(){
  FixedPoint a(2,1);
  FixedPoint b(3,5);

  cout << a-b << endl;
  
  return 0;
}

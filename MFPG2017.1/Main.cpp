#include <iostream>

#include "FixedPointMachine.hpp"

using namespace std;

int main(int, char** argv){

  FixedPointMachine lhs(argv[1]);
  FixedPointMachine rhs(argv[2]);
  
  cout << lhs << endl;
  
  return 0;
}

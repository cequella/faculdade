#include <iostream>
#include <string>

#include "FixedPointMachine.hpp"

using namespace std;

int main(int, char** argv){
  string operation = argv[2];

  FixedPointMachine lhs(argv[1]);
  FixedPointMachine rhs(argv[3]);

  if(operation == "+"){
    cout << lhs << "+" << rhs << "=" << lhs+rhs << endl;
  } else if(operation == "-") {
    cout << lhs << "-" << rhs << "=" << lhs-rhs << endl;
  } else if(operation == "x" or operation == "*") {
    cout << lhs << "*" << rhs << "=" << lhs*rhs << endl;
  } else if(operation == "/") {
    cout << lhs << "/" << rhs << "=" << lhs/rhs << endl;
  }
  
  return 0;
}

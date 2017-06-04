#include <iostream>

#include "Vec.hpp"

using namespace std;

int main() {
  Vec3 nulo;
  Vec3 teste(2.0, 4.0, 4.0);

  cout << -teste << endl;
  cout << "Mod: " << teste.mod() << endl;
  
  return 0;
}

#ifndef FIXED_POINT_MACHINE_HPP
#define FIXED_POINT_MACHINE_HPP

#include <iostream>
#include <sstream>
#include <string>
#include <cstdio>
#include <cmath>

class FixedPointMachine {
private:
  short          m_integer  = 0;
  unsigned short m_fraction = 0;

  const unsigned short MAX_FRACTION = 1000; // for 3 decimals

  // Setters
  void integer(short t_integer)            noexcept;
  void fraction(unsigned short t_fraction) noexcept;
  
public:
  FixedPointMachine()                  noexcept;
  FixedPointMachine(const char* value) noexcept;

  // Friends
  friend std::ostream& operator << (std::ostream& os,
				    const FixedPointMachine& that) {
    os << that.m_integer << ".";
    
    os << that.m_fraction;
    return os;
  }
};

#endif //FIXED_POINT_MACHINE_HPP

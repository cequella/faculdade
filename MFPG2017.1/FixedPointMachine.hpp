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

  void fractionCorrection() noexcept;
  
public:
  FixedPointMachine()                          noexcept;
  FixedPointMachine(short         t_integer,
		    unsigned short t_fraction) noexcept;
  FixedPointMachine(const char* value)         noexcept;

  // Friends
  friend std::ostream& operator << (std::ostream& os,
				    const FixedPointMachine& that) {
    os << that.m_integer << ".";

    if(that.m_fraction > 0 and that.m_fraction < 10) {
      os << "00" << that.m_fraction;
    } else if (that.m_fraction >= 10 and that.m_fraction < 100) {
      os << "0" << that.m_fraction/10;
    } else {
      os << that.m_fraction/100;
    }
    
    return os;
  }
};

#endif //FIXED_POINT_MACHINE_HPP

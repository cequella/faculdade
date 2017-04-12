#ifndef FIXED_POINT_MACHINE_HPP
#define FIXED_POINT_MACHINE_HPP

#include <iostream>
#include <sstream>
#include <string>
#include <cstdio>
#include <cmath>

class FixedPointMachine {
private:
  short          m_integer;
  unsigned short m_fraction;

  const unsigned short MAX_FRACTION = 1000; // for 3 decimals

  void fractionCorrection() noexcept;
  
public:
  FixedPointMachine()                               noexcept;
  FixedPointMachine(short         t_integer,
		    unsigned short t_fraction)      noexcept;
  FixedPointMachine(const char* value)              noexcept;
  FixedPointMachine(const FixedPointMachine& that)  noexcept;
  FixedPointMachine(FixedPointMachine&& that)       noexcept;

  // Operators
  FixedPointMachine& operator = (const FixedPointMachine& that) noexcept;
  FixedPointMachine& operator = (FixedPointMachine&& that)      noexcept;
  FixedPointMachine  operator + (const FixedPointMachine& that) noexcept;
  FixedPointMachine  operator - (const FixedPointMachine& that) noexcept;
  FixedPointMachine  operator * (const FixedPointMachine& that) noexcept;

  bool operator == (const FixedPointMachine& that) noexcept;
  bool operator != (const FixedPointMachine& that) noexcept;
  bool operator >  (const FixedPointMachine& that) noexcept;
  bool operator >= (const FixedPointMachine& that) noexcept;
  bool operator <  (const FixedPointMachine& that) noexcept;
  bool operator <= (const FixedPointMachine& that) noexcept;
  
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

  // Setters
  void integer(short t_integer)            noexcept;
  void fraction(unsigned short t_fraction) noexcept;

  // Getters
  short          integer() const noexcept;
  unsigned short fraction() const noexcept;
};

#endif //FIXED_POINT_MACHINE_HPP

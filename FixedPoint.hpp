#ifndef FIXED_POINT_HPP
#define FIXED_POINT_HPP

#include <iostream>
#include <sstream>

class FixedPoint {
private:
  int          m_integer;
  unsigned int m_fraction;

public:
  FixedPoint(int t_integer=0, unsigned int t_fraction=0) :
    m_integer(t_integer), m_fraction(t_fraction){}
  FixedPoint(const FixedPoint& that) :
    m_integer(that.integer()), m_fraction(that.fraction()){}

  //OPERATORS
  bool operator == (const FixedPoint& that) const noexcept;
  bool operator != (const FixedPoint& that) const noexcept;
  bool operator >  (const FixedPoint& that) const noexcept;
  bool operator >= (const FixedPoint& that) const noexcept;
  bool operator <  (const FixedPoint& that) const noexcept;
  bool operator <= (const FixedPoint& that) const noexcept;
  
  FixedPoint& operator = (const FixedPoint& that) noexcept;
  FixedPoint  operator + (const FixedPoint& that) noexcept;
  FixedPoint  operator - (const FixedPoint& that) noexcept;

  friend std::ostream& operator << (std::ostream& os,
				    const FixedPoint& that) {
    os << that.integer() << "." << that.fraction();
    return os;
  }
  
  //SETTERS
  FixedPoint integer(int t_integer)            noexcept;
  FixedPoint fraction(unsigned int t_fraction) noexcept;

  //GETTERS
  int          integer()  const noexcept;
  unsigned int fraction() const noexcept;

};

#endif //FIXED_POINT_HPP

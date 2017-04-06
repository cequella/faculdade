#include "FixedPoint.hpp"

bool FixedPoint::operator == (const FixedPoint& that) const noexcept {
  return (integer()  == that.integer() &&
	  fraction() == that.fraction());
}
bool FixedPoint::operator != (const FixedPoint& that) const noexcept {
  return !(*this == that);
}
bool FixedPoint::operator > (const FixedPoint& that) const noexcept {
  if(integer() != that.integer()) {
    return ( integer()>that.integer() );
  }
  return (fraction()>that.fraction());
}
bool FixedPoint::operator < (const FixedPoint& that) const noexcept {
  if(integer() != that.integer()) {
    return ( integer()<that.integer() );
  }
  return (fraction()<that.fraction());
}
bool FixedPoint::operator >= (const FixedPoint& that) const noexcept {
  return (*this==that or *this>that);
}
bool FixedPoint::operator <= (const FixedPoint& that) const noexcept {
  return (*this==that or *this<that);
}
FixedPoint& FixedPoint::operator = (const FixedPoint& that) noexcept {
  integer(that.integer());
  fraction(that.fraction());
  return *this;
}
FixedPoint FixedPoint::operator + (const FixedPoint& that) noexcept {
  integer(integer() + that.integer());
  fraction(fraction() + that.fraction());

  if(fraction() >= 1000){
    fraction( fraction()-1000 );
    integer( integer()+1 );
  }
  
  return *this;
}
FixedPoint FixedPoint::operator - (const FixedPoint& that) noexcept {
  if(*this < that){
    integer(that.integer()-integer());
    fraction(that.fraction()-fraction());

    integer( -integer() );
  } else {
    integer(integer() - that.integer());
    fraction(fraction() - that.fraction());
  }
  
  return *this;
}

FixedPoint FixedPoint::integer(int t_integer) noexcept {
  m_integer = t_integer;
  return *this;
}
FixedPoint FixedPoint::fraction(unsigned int t_fraction) noexcept {
  m_fraction = t_fraction;

  if(m_fraction > 1000){
    m_integer++;
    m_fraction-=1000;
  }
  
  return *this;
}

int FixedPoint::integer() const noexcept {
  return m_integer;
}
unsigned int FixedPoint::fraction() const noexcept {
  return m_fraction;;
}

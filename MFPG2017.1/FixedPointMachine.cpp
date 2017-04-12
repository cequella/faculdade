#include "FixedPointMachine.hpp"

FixedPointMachine::FixedPointMachine() noexcept :
m_integer(0), m_fraction(0){}

FixedPointMachine::FixedPointMachine(const FixedPointMachine& that) noexcept :
  m_integer(that.integer()), m_fraction(that.fraction()){}
FixedPointMachine::FixedPointMachine(FixedPointMachine&& that) noexcept :
  m_integer(that.integer()), m_fraction(that.fraction()){
  that = FixedPointMachine();
}

FixedPointMachine::FixedPointMachine(short t_integer,
				     unsigned short t_fraction) noexcept :
  m_integer(t_integer),m_fraction(t_fraction){
  fractionCorrection();
}
FixedPointMachine::FixedPointMachine(const char* value) noexcept :
  m_integer(0), m_fraction(0){
  
  if(value == nullptr or std::string(value).empty()) return;

  const std::string sValue = value;

  // Find the dot
  std::size_t dotPosition = sValue.find('.');
  if(dotPosition == std::string::npos) dotPosition = sValue.find('.');

  // Integer part
  if(dotPosition > 0){
    const std::string sInteger = sValue.substr(0, dotPosition);
    sscanf(sInteger.c_str(), "%hi", &m_integer);
  }

  //Fraction part
  if(dotPosition not_eq std::string::npos){
    std::string sFraction = sValue.substr(++dotPosition);
    if(sFraction.size() > 3) sFraction = sFraction.substr(0,2);
    sscanf(sFraction.c_str(), "%hu", &m_fraction);

    unsigned short decimal =
      static_cast<unsigned short>( sFraction.find(std::to_string(m_fraction)) );

    m_fraction *= pow(10, fmax(2-decimal, 0));
  }
    std::cout << m_integer << std::endl << m_fraction << std::endl;
}

void FixedPointMachine::fractionCorrection() noexcept {
  while(m_fraction > MAX_FRACTION){
    m_fraction -= MAX_FRACTION;
    m_integer++;
  }
}

// OPERATORS
FixedPointMachine& FixedPointMachine::operator = (const FixedPointMachine& that) noexcept {
  FixedPointMachine temp(that);
  *this = temp;
  return *this;
}
FixedPointMachine& FixedPointMachine::operator = (FixedPointMachine&& that) noexcept {
  FixedPointMachine temp( const_cast<const FixedPointMachine&&>(that) );
  *this = temp;

  that = FixedPointMachine();
  
  return *this;
}
FixedPointMachine FixedPointMachine::operator + (const FixedPointMachine& that) noexcept {
  return FixedPointMachine(integer() + that.integer(),
			   fraction() + that.fraction() );
}
FixedPointMachine FixedPointMachine::operator - (const FixedPointMachine& that) noexcept {
  short t_integer = integer() - that.integer();

  unsigned short t_fraction;
  if(fraction() >= that.fraction()){
    t_fraction = fraction() - that.fraction();
  } else {
    t_fraction = MAX_FRACTION+fraction() - that.fraction();
    t_integer--;
  }

  return FixedPointMachine(t_integer, t_fraction);
}

bool FixedPointMachine::operator == (const FixedPointMachine& that) noexcept {
  return ( (integer() == that.integer())
	   and (fraction() == that.fraction()) );
}
bool FixedPointMachine::operator != (const FixedPointMachine& that) noexcept {
  return not(*this == that);
}
bool FixedPointMachine::operator > (const FixedPointMachine& that) noexcept {
  if(integer() > that.integer())   return true;
  if(fraction() > that.fraction()) return true;

  return false;
}
bool FixedPointMachine::operator >= (const FixedPointMachine& that) noexcept {
  return (*this > that
	  or (*this == that));
}
bool FixedPointMachine::operator < (const FixedPointMachine& that) noexcept {
  if(integer() < that.integer())   return true;
  if(fraction() < that.fraction()) return true;

  return false;
}
bool FixedPointMachine::operator <= (const FixedPointMachine& that) noexcept {
  return (*this < that
	  or (*this == that));
}

// SETTERS
void FixedPointMachine::integer(short t_integer) noexcept {
  m_integer = t_integer;
}
void FixedPointMachine::fraction(unsigned short t_fraction) noexcept {
  m_fraction = t_fraction;
  fractionCorrection();
}

// GETTERS
short FixedPointMachine::integer() const noexcept {
  return m_integer;
}
unsigned short FixedPointMachine::fraction() const noexcept {
  return m_fraction;
}

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
    if(sFraction.size() > 3) {
      sFraction = sFraction.substr(0,3);
    } else {
      while(sFraction.size() < 3) sFraction += "0";
    }

    for(unsigned short it=0; it<3; it++){
      const int temp = atoi( sFraction.substr(it, 1).c_str() );
      m_fraction += temp*pow(10, 2-it);
    }
  }
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
FixedPointMachine FixedPointMachine::operator * (const FixedPointMachine& that) noexcept {
  std::string thisTemp = std::to_string(integer()) + std::to_string(that.fraction());
  std::string thatTemp = std::to_string(that.integer()) + std::to_string(that.fraction());
  
  while(thisTemp.back() == '0'){
    thisTemp.erase(thisTemp.size()-1);
  }
  while(thatTemp.back() == '0'){
    thatTemp.erase(thatTemp.size()-1);
  }

  unsigned short dotPosition = decimalsCount()+that.decimalsCount();

  int aux = atoi(thisTemp.c_str())*atoi(thatTemp.c_str());

  short t_integer  = aux/pow(10, dotPosition);
  short t_fraction = aux-t_integer*pow(10, dotPosition);

  std::ostringstream stream;
  stream << t_integer << "." << t_fraction;
  
  return FixedPointMachine(stream.str().c_str());
}
FixedPointMachine FixedPointMachine::operator / (const FixedPointMachine& that) noexcept {
  int thisTemp = format();
  int thatTemp = that.format();

  int temp = thisTemp/thatTemp;
  int mod  = thisTemp%thatTemp;

  unsigned short dotPosition = decimalsCount() - that.decimalsCount();
  
  while(mod not_eq 0){
    temp*=10;
    mod*=10;
    
    temp += mod/thatTemp;
    mod = mod%thatTemp;
    dotPosition++;
  }

  const short t_integer = temp/pow(10, dotPosition);
  const unsigned short t_fraction = temp;

  std::ostringstream stream;
  stream << t_integer << "." << t_fraction;
  
  return FixedPointMachine(stream.str().c_str());
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

unsigned short FixedPointMachine::decimalsCount() const noexcept {
  if(fraction()%100 == 0) {
    return 1;
  } else if(fraction()%10 == 0) {
    return 2;
  }

  return 3;
}
int FixedPointMachine::format() const noexcept {
  int out = integer();
  out *= pow(10, decimalsCount());
  out += fraction()/pow(10, 3-decimalsCount());

  return out;
}

// SETTERS
FixedPointMachine& FixedPointMachine::integer(short t_integer) noexcept {
  m_integer = t_integer;

  return *this;
}
FixedPointMachine& FixedPointMachine::fraction(unsigned short t_fraction) noexcept {
  m_fraction = t_fraction;
  fractionCorrection();

  return *this;
}

// GETTERS
short FixedPointMachine::integer() const noexcept {
  return m_integer;
}
unsigned short FixedPointMachine::fraction() const noexcept {
  return m_fraction;
}

#include "FixedPointMachine.hpp"

FixedPointMachine::FixedPointMachine(const char* value) noexcept {
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

    m_fraction *= pow(10, fmax(3-decimal, 0));
  }
    std::cout << m_integer << std::endl << m_fraction << std::endl;
}

// SETTERS
void FixedPointMachine::integer(short t_integer) noexcept {
  m_integer = t_integer;
}
void FixedPointMachine::fraction(unsigned short t_fraction) noexcept {
  m_fraction = t_fraction;
}

#include <iostream>
#include <cstdarg>
#include <cstring>
#include <cmath>

using namespace std;

template <unsigned short SIZE=2>
class Vec {
private:
  double* m_component = nullptr;

public:
  Vec<SIZE>(double t_x,
	    double t_y ...) noexcept {

    m_component = new double[SIZE];
    
    // SET FIRST 2
    m_component[0] = t_x;
    m_component[1] = t_y;
    
    // ANOTHER
    va_list args;
    va_start(args, t_y);
    for(unsigned int it=0; it<SIZE-2; it++){
      m_component[it+2] = va_arg(args, double);
    }
    va_end(args);
  }
  Vec<SIZE>() noexcept {
    m_component = new double[SIZE];
    for(unsigned int it=0; it<SIZE; it++){
      m_component[it] = 0.0;
    }
  }
  Vec<SIZE>(const Vec<SIZE>& that) noexcept {
    m_component = new double[SIZE];
    memcpy(m_component, &that.m_component, SIZE*sizeof(double));
  }
  ~Vec<SIZE>() noexcept {
    if(m_component not_eq nullptr){
      delete [] m_component;
      m_component = nullptr;
    }
  }

  Vec<SIZE>& operator = (const Vec<SIZE>& that) noexcept {
    Vec<SIZE> temp(that);
    *this = temp;
    return *this;
  }
  
  // Escalar
  Vec<SIZE> operator * (double k) const noexcept;
  Vec<SIZE> operator / (double k) const noexcept;

  // Vetorial
  Vec<SIZE> operator + (const Vec<SIZE>& that) const noexcept;
  Vec<SIZE> operator - (const Vec<SIZE>& that) const noexcept;
  Vec<SIZE> operator * (const Vec<SIZE>& that) const noexcept;
  Vec<SIZE> operator / (const Vec<SIZE>& that) const noexcept;

  // Friend
  friend std::ostream& operator << (std::ostream& os, const Vec<SIZE>& that) noexcept {
    os << "V[" << SIZE << "] = {";
    for(unsigned int it=0; it<SIZE; it++){
      os << that.m_component[it];
      if(it not_eq SIZE-1) os << ", ";
    }
    os << "}";
    return os;
  }

  // Outros
  double mod() const noexcept {
    double out = 0.0;
    for(unsigned int it=0; it<SIZE; it++){
      out += pow(m_component[it], 2.0);
    }

    return sqrt(out);
  }
  void normalize() noexcept {
    double aux = mod();
    for(unsigned int it=0; it<SIZE; it++){
      m_component[it]/=aux;
    }
  }
  double angle(Vec<SIZE> that) const noexcept;
};

using Vec3 = Vec<3>;

int main() {
  Vec3 teste;

  std::cout << teste << std::endl;
  
  return 0;
}

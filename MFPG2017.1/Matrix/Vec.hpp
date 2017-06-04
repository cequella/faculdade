#ifndef VEC_HPP
#define VEC_HPP

#include <cmath>
#include <cstdarg>
#include <cstring>
#include <ostream>

template <unsigned short SIZE=2>
class Vec {
private:
  double* m_component = nullptr;

public:
  /*! Full Constructor */
  Vec<SIZE>(double t_x,
	    double t_y ...) noexcept {

    m_component = new double[SIZE];
    
    // SET FIRST 2
    m_component[0]    = t_x;
    m_component[1]    = t_y;
    
    // ANOTHER
    va_list args;
    va_start(args, t_y);
    for(unsigned int it=2; it<SIZE; it++){
      m_component[it] = va_arg(args, double);
    }
    va_end(args);
  }
  //-----------------------------------------------------------------
  

  /*! Homogenous Constructor */
  Vec<SIZE>(double k) noexcept {
	m_component = new double[SIZE];
    for(unsigned int it=0; it<SIZE; it++){
      m_component[it] = k;
    }
  }
  //-----------------------------------------------------------------
  

  /*! Null-Vector Constructor */
  Vec<SIZE>() noexcept : Vec<SIZE>(0.0){}
  /*! Copy Constrcutor */
  Vec<SIZE>(const Vec<SIZE>& that) noexcept {
    m_component = new double[SIZE];
    for(unsigned int it=0; it<SIZE; it++){
	  m_component[it] = that.m_component[it];
	}
  }
  //-----------------------------------------------------------------
  

  /*! Destructor */
  ~Vec<SIZE>() noexcept {
    if(m_component not_eq nullptr){
      delete [] m_component;
      m_component = nullptr;
    }
  }
  //-----------------------------------------------------------------

  /**
	 @name Operators
  */
  ///@{


  /*! Copy operator */
  Vec<SIZE>& operator = (const Vec<SIZE>& that) noexcept {
    m_component = new double[SIZE];
    for(unsigned int it=0; it<SIZE; it++){
	  m_component[it] = that.m_component[it];
	}
	return *this;
  }
  //-----------------------------------------------------------------
  

  /*! Multiplication by scalar */
  template <typename T>
  Vec<SIZE> operator * (T k) const noexcept {
    Vec<SIZE> out(*this);
    if(std::is_integral<T>::value and std::is_floating_point<T>::value) {
      for(unsigned int it=0; it<SIZE; it++){
		out.m_component[it] *= static_cast<double>(k);
      }
    }
    return out;
  }
  //-----------------------------------------------------------------
  

  /*! Division by scalar */
  Vec<SIZE> operator / (double k) const noexcept;

  /*! Vector Addition */
  Vec<SIZE> operator + (const Vec<SIZE>& that) const noexcept {
	Vec<SIZE> out(that);
	for(unsigned int it=0; it<SIZE; it++){
	  out.m_component[it] += m_component[it];
	}

	return out;
  }
  //-----------------------------------------------------------------
  

  /*! Vector Subtraction */
  Vec<SIZE> operator - (const Vec<SIZE>& that) const noexcept {
	return *this + (-that);
  }
  /*! Vector Invertion */
  Vec<SIZE> operator - () const noexcept {
	Vec<SIZE> out = *this;

	for(unsigned int it=0; it<SIZE; it++){
	  out.m_component[it] = -out.m_component[it];
	}

	return out;
  }
  //-----------------------------------------------------------------

  
  /*! Vector Transcription */
  friend std::ostream& operator << (std::ostream& os, const Vec<SIZE>& that) noexcept {
    os << "V[" << SIZE << "] = {";
    for(unsigned int it=0; it<SIZE; it++){
      os << that.m_component[it];
      if(it not_eq SIZE-1) os << ", ";
    }
    os << "}";
    return os;
  }
  //-----------------------------------------------------------------

  
  ///@}

  /**
	 @name Getter
  */
  ///@{


  double* array() const noexcept{
	return m_component;
  }
  //-----------------------------------------------------------------

  
  ///@}

  
  /**
	 @name Others
  */
  ///@{


  /*! Dot Product */
  double dot(Vec<SIZE> that) const noexcept {
    double out = 0.0;
    for(unsigned int it=0; it<SIZE; it++){
      out += m_component[it]*that.m_component[it];
    }
    return out;
  }
  //-----------------------------------------------------------------

  
  /*! Cross Product */
  Vec<SIZE+1> cross(Vec<SIZE> that) const noexcept {
    Vec<SIZE+1> out;

    return out;
  }
  //-----------------------------------------------------------------

  
  /*! Length/Module of the vector */
  double mod() const noexcept {
    double out = 0.0;
    for(unsigned int it=0; it<SIZE; it++){
      out += pow(m_component[it], 2.0);
    }

    return sqrt(out);
  }
  //-----------------------------------------------------------------

  
  /*! Set vector lenght to 1 */
  void normalize() noexcept {
    double aux = mod();
    if(aux == 0) return; // Avoid null-vector normalization
    
    for(unsigned int it=0; it<SIZE; it++){
      m_component[it]/=aux;
    }
  }
  //-----------------------------------------------------------------

  
  /*! Get angle between two vectors */
  double angle(Vec<SIZE> that) const noexcept;
  ///@}
};

using Vec2 = Vec<2>;
using Vec3 = Vec<3>;
using Vec4 = Vec<4>;

#endif // VEC_HPP

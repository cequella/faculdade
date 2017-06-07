#ifndef MATRIX_HPP
#define MATRIX_HPP

#include <ostream>
#include <cstdarg>
#include <cmath>

#include "Vec.hpp"

template <unsigned short W, unsigned short H>
class Matrix {
private:
  const unsigned short m_width;
  const unsigned short m_height;
  double*              m_value;
  
public:

  Matrix(double t_value ...) noexcept;
  Matrix()                   noexcept;

  //Desafio: operadores

  /*! Ostream operator << */
  template<>
  friend std::ostream& operator << (std::ostream& os,
				    const Matrix<>& that
				    ) noexcept;

  // Getters
  unsigned short width()  const noexcept;
  unsigned short height() const noexcept;
  unsigned short size()   const noexcept;
  
  //---------------------------------------------------------------------------------------//
  
  static Matrix identity()              noexcept;
  static Matrix translation(double x,
			    double y,
			    double z)   noexcept;
  static Matrix scale(double x,
		      double y,
		      double z)         noexcept;
  static Matrix scale(double factor)    noexcept;
  static Matrix rotationX(double angle) noexcept;
  static Matrix rotationY(double angle) noexcept;
  static Matrix rotationZ(double angle) noexcept;
  static Matrix rotation()              noexcept;
  static Matrix TRS()                   noexcept;
  static Matrix iTRS()                  noexcept;
  static Matrix rotationWithCenterAt()  noexcept;
  static Matrix scaleWithCenterAt()     noexcept;
};

using Matrix2 = Matrix<2,2>;
using Matrix3 = Matrix<3,3>;
using Matrix4 = Matrix<4,4>;

#endif // MATRIX_HPP

#ifndef MATRIX_HPP
#define MATRIX_HPP

#define M_SIZE 3

#include <ostream>
#include <cstdarg>
#include <cmath>

#include "Vec.hpp"

class Matrix {
private:
  double m_value[M_SIZE][M_SIZE];
  
public:

  Matrix(double t_value ...)         noexcept;
  Matrix(Vec3 v1, Vec3 v2, Vec3 v3) noexcept;
  Matrix()                          noexcept;

  //Desafio: operadores

  /*! Ostream operator << */
  friend std::ostream& operator << (std::ostream& os,
				    const Matrix& that
				    ) noexcept {
    os << "{";
    for(unsigned short i=0; i<M_SIZE; i++){ // lines
      os << "{";
      for(unsigned short j=0; j<M_SIZE; j++){ // collumns
	os << that.m_value[i][j];
	if(j not_eq M_SIZE-1) os << ", ";
      }
      os << "}";
	  
      if(i not_eq M_SIZE-1) os << ", ";
    }
    os << "}";

    return os;
  }

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

#endif // MATRIX_HPP

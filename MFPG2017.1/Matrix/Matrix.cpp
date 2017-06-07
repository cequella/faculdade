#include "Matrix.hpp"

template <unsigned short W, unsigned short H>
Matrix<W,H>::Matrix(double t_value ...) noexcept :
					 m_value(new double[W*H]),
					 m_width(W),
					 m_height(H){
  va_list arg;
  va_start(arg, t_value);

  m_value[0] = t_value;
  for(unsigned short i=0; i<W*H; i++){
    m_value[i] = va_arg(arg, double);
  }
  va_end(arg);
}
//--------------------------------------------------

template <unsigned short W, unsigned short H>
Matrix<W, H>::Matrix() noexcept  :
		       m_value(new double[W*H]),
		       m_width(W),
		       m_height(H){
  for(unsigned short i=0; i<W*H; i++){
    m_value[i] = ( i%(W+1) == 0 ) ? 1.0f : 0.0f;
  }
}
//--------------------------------------------------

template<>
std::ostream& operator << (std::ostream& os,
			   const Matrix<>& that
			   ) noexcept {
  os << "{";
  for(unsigned short i=0; i<that.m_width; i++){ // lines
    os << "{";
    for(unsigned short j=0; j<that.m_height; j++){ // collumns
      os << that.m_value[i][j];
      if(j not_eq W2-1) os << ", ";
    }
    os << "}";
    
    if(i not_eq H2-1) os << ", ";
  }
  os << "}";
  
  return os;
}
//--------------------------------------------------

template <unsigned short W, unsigned short H>
unsigned shor Matrix<W, H>::width() const noexcept {
  return m_width;
}
//--------------------------------------------------

template <unsigned short W, unsigned short H>
unsigned shor Matrix<W, H>::height() const noexcept {
  return m_height;
}
//--------------------------------------------------

template <unsigned short W, unsigned short H>
unsigned shor Matrix<W, H>::size() const noexcept {
  return m_width*m_height;
}
//--------------------------------------------------


template <unsigned short W, unsigned short H>
Matrix<W,H> Matrix<W,H>::identity() noexcept {
  return Matrix<W,H>();
}
//--------------------------------------------------

template <unsigned short W, unsigned short H>
Matrix<W,H> Matrix<W,H>::translation(double x,
			   double y,
			   double z) noexcept {
  return Matrix<3,3>(); //TODO
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::scale(double x,
		     double y,
		     double z
		     ) noexcept {
  return Matrix<3,3>(x,   0.0, 0.0,
		     0.0, y,   0.0,
		     0.0, 0.0, z);
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::scale(double factor) noexcept {
  return Matrix<3,3>(factor, 0.0,    0.0,
		     0.0,    factor, 0.0,
		     0.0,    0.0,    factor);
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::rotationX(double angle) noexcept {
  const double cosAngle = cos(angle);
  const double sinAngle = sin(angle);
  
  return Matrix<3,3>(1.0, 0.0,      0.0,
		     0.0, cosAngle, -sinAngle,
		     0.0, sinAngle, cosAngle);
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::rotationY(double angle) noexcept {
  const double cosAngle = cos(angle);
  const double sinAngle = sin(angle);
  
  return Matrix<3,3>(cosAngle,  0.0, sinAngle,
		     0.0,       1.0, 0.0,
		     -sinAngle, 0.0, cosAngle);
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::rotationZ(double angle) noexcept {
  const double cosAngle = cos(angle);
  const double sinAngle = sin(angle);
  
  return Matrix<3,3>(cosAngle, -sinAngle, 0.0,
		     sinAngle, cosAngle,  0.0,
		     0.0,      0.0,       1.0);
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::TRS() noexcept {
  return Matrix<3,3>();
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::iTRS() noexcept {
  return Matrix<3,3>();
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::rotationWithCenterAt() noexcept {
  return Matrix<3,3>();
}
//--------------------------------------------------

template<>
Matrix<3,3> Matrix<3,3>::scaleWithCenterAt() noexcept {
  return Matrix<3,3>();
}
//--------------------------------------------------

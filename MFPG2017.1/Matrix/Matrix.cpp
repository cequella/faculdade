#include "Matrix.hpp"

Matrix::Matrix(double t_value ...) noexcept {
  va_list arg;
  va_start(arg, t_value);

  m_value[0][0] = t_value;
  for(unsigned short i=0; i<M_SIZE; i++){
    for(unsigned short j=(i==0)?1:0; j<M_SIZE; j++){
      m_value[i][j] = va_arg(arg, double);
    }
  }
  va_end(arg);
}
//--------------------------------------------------

Matrix::Matrix(Vec3 v1, Vec3 v2, Vec3 v3) noexcept {
  for(unsigned short i=0; i<M_SIZE; i++) {
    m_value[0][i] = v1.array()[i];
    m_value[1][i] = v2.array()[i];
    m_value[2][i] = v3.array()[i];
  }
}
//--------------------------------------------------

Matrix::Matrix() noexcept {
  for(unsigned short i=0; i<M_SIZE; i++){
    for(unsigned short j=0; j<M_SIZE; j++){
      m_value[i][j] = (i==j) ? 1.0f : 0.0f;
    }
  }
}
//--------------------------------------------------

Matrix Matrix::identity() noexcept {
  return Matrix();
}
//--------------------------------------------------

Matrix Matrix::translation(double x,
			   double y,
			   double z) noexcept {
  return Matrix(); //TODO
}
//--------------------------------------------------

Matrix Matrix::scale(double x,
		     double y,
		     double z
		     ) noexcept {
  return Matrix(x,   0.0, 0.0,
		0.0, y,   0.0,
		0.0, 0.0, z);
}
//--------------------------------------------------

Matrix Matrix::scale(double factor) noexcept {
  return Matrix(factor, 0.0,    0.0,
		0.0,    factor, 0.0,
		0.0,    0.0,    factor);
}
//--------------------------------------------------

Matrix Matrix::rotationX(double angle) noexcept {
  const double cosAngle = cos(angle);
  const double sinAngle = sin(angle);
  
  return Matrix(1.0, 0.0,      0.0,
		0.0, cosAngle, -sinAngle,
		0.0, sinAngle, cosAngle);
}
//--------------------------------------------------

Matrix Matrix::rotationY(double angle) noexcept {
  const double cosAngle = cos(angle);
  const double sinAngle = sin(angle);
  
  return Matrix(cosAngle,  0.0, sinAngle,
		0.0,       1.0, 0.0,
		-sinAngle, 0.0, cosAngle);
}
//--------------------------------------------------

Matrix Matrix::rotationZ(double angle) noexcept {
  const double cosAngle = cos(angle);
  const double sinAngle = sin(angle);
  
  return Matrix(cosAngle, -sinAngle, 0.0,
		sinAngle, cosAngle,  0.0,
		0.0,      0.0,       1.0);
}
//--------------------------------------------------

Matrix Matrix::TRS() noexcept {
  return Matrix();
}
//--------------------------------------------------

Matrix Matrix::iTRS() noexcept {
  return Matrix();
}
//--------------------------------------------------

Matrix Matrix::rotationWithCenterAt() noexcept {
  return Matrix();
}
//--------------------------------------------------

Matrix Matrix::scaleWithCenterAt() noexcept {
  return Matrix();
}
//--------------------------------------------------

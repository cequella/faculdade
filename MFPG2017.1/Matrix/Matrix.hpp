#ifndef MATRIX_HPP
#define MATRIX_HPP

class Matrix {
private:

public:

  Matrix() noexcept;

  //Desafio: operadores

  static Matrix indentity()            noexcept;
  static Matrix translation()          noexcept;
  static Matrix rotationX()            noexcept;
  static Matrix rotationY()            noexcept;
  static Matrix rotationZ()            noexcept;
  static Matrix rotation()             noexcept;
  static Matrix TRS()                  noexcept;
  static Matrix iTRS()                 noexcept;
  static Matrix rotationWithCenterAt() noexcept;
  static Matrix scaleWithCenterAt()    noexcept;
};

Matrix::Matrix() noexcept {

}

#endif // MATRIX_HPP

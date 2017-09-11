#ifndef COLOR_H
#define COLOR_H

#include <stdio.h>

union S_COLOR {
  unsigned char value[3];
  
  struct S_RGB {
	unsigned char r, g, b;
  } RGB;
  struct S_HSV {
	unsigned char h, s, b;
  } HSV;
  struct S_YCbCr {
	unsigned char y, cb, cr;
  } YCbCr;
};
typedef union S_COLOR Color;

//----------------------------- Methods
unsigned char clamp(long value, float min, float max);

void  stringfy_color(const Color that, char* str);
Color rgb_to_hsv(const Color that);
Color rgb_to_ycbcr(const Color that);
Color hsv_to_ycbcr(const Color that);
Color hsv_to_rgb(const Color that);
Color ycbcr_to_rgb(const Color that);
Color ycbcr_to_hsv(const Color that);

#endif //COLOR_H

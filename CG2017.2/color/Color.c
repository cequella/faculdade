#include "Color.h"

unsigned char clamp(long value, float min, float max){
  if(value < min) return min;
  if(value > max) return max;
  return value;
}
//-----------------------------------------------------------------------------------

Color rgb_to_hsv(const Color that) {
  Color out;

  return out;
}
//-----------------------------------------------------------------------------------

Color rgb_to_ycbcr(const Color that) { //ITU-R BT.2020 conversion
  Color out;

  out.YCbCr.y  = (( 66*that.RGB.r +129*that.RGB.g  +25*that.RGB.b + 128) >> 8) +  16;
  out.YCbCr.cb = ((-38*that.RGB.r  -74*that.RGB.g +112*that.RGB.b + 128) >> 8) + 128;
  out.YCbCr.cr = ((112*that.RGB.r  -94*that.RGB.g  -18*that.RGB.b + 128) >> 8) + 128;
  
  return out;
}
//-----------------------------------------------------------------------------------

Color hsv_to_ycbcr(const Color that) {
  Color out;

  return out;
}
//-----------------------------------------------------------------------------------

Color hsv_to_rgb(const Color that) {
  Color out;

  return out;
}
//-----------------------------------------------------------------------------------

Color ycbcr_to_rgb(const Color that) {
  Color out;

  const long Rc = that.YCbCr.y  -16;
  const long Gc = that.YCbCr.cb -128;
  const long Ec = that.YCbCr.cr -128;
	
  out.RGB.r = clamp((298*Rc         +409*Ec +128) >> 8, 0, 255);
  out.RGB.g = clamp((298*Rc -100*Gc -208*Ec +128) >> 8, 0, 255);
  out.RGB.b = clamp((298*Rc +516*Gc         +128) >> 8, 0, 255);
  
  return out;
}
//-----------------------------------------------------------------------------------

Color ycbcr_to_hsv(const Color that) {
  Color out;
  
  return out;
}
//-----------------------------------------------------------------------------------

void stringfy_color(const Color that, char* str){
  sprintf(str, "{%i, %i, %i}\0", that.value[0], that.value[1], that.value[2]);
}
//-----------------------------------------------------------------------------------

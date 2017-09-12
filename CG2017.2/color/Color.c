#include "Color.h"

unsigned char clamp(long value, float min, float max){
  if(value < min) return min;
  if(value > max) return max;
  return value;
}
//-----------------------------------------------------------------------------------

Color rgb_to_hsv(const Color that) {
  Color out;

  // [0..1] ranged values
  const float R = that.RGB.r/255.0;
  const float G = that.RGB.g/255.0;
  const float B = that.RGB.b/255.0;

  // Aux values
  unsigned char min = that.RGB.r, max = that.RGB.r, delta;
  float aux = 0.0;

  // Set min, max and delta
  if(that.RGB.g < min) min = that.RGB.g;
  if(that.RGB.b < min) min = that.RGB.b;
  if(that.RGB.g > max) max = that.RGB.g;
  if(that.RGB.b > max) max = that.RGB.b;
  delta = max-min;

  // Impossible case
  if( max == 0 ){
	out.HSV.h = out.HSV.s = out.HSV.v = 0;
	return out;
  }

  // Set saturation
  aux = (float)delta/(float)max;
  out.HSV.s = aux * 255;

  // Set hue
  if(delta == 0) {
	aux = 0.0;
	printf("delta==0\n");
	
  } else if( that.RGB.r == max ){
	aux = ((float)that.RGB.g-(float)that.RGB.b)/(float)delta;
	
  } else if( that.RGB.g == max ){
	aux = 2.0+ ((float)that.RGB.b-(float)that.RGB.r)/(float)delta;
	
  } else { // if( that.RGB.b == max )
	aux = 4.0+ ((float)that.RGB.r-(float)that.RGB.g)/(float)delta;
	
  }
  //aux *= 60.0;
  //aux /= 360.0;
  //aux *= 255.0;
  out.HSV.h = aux*42.5; // 42.5 = 255*60/360, merging all calcs

  // Set value
  out.HSV.v = max;
  
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

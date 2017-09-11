#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "Color.h"

void help(){
  printf(
		 "\n\nHow to use:\n"
		 "Please execute this application using:\n"
		 "\t./convert mode xxx yyy zzz\n"
		 "x, y and z must be in [0..255] decimal interval. Otherwise, it will be clamped.\n\n"
		 "Modes:\n\n"
		 "rgb_to_hsv, rgb_to_ycbcr, \n"
		 "hsv_to_ycbcr, hsv_to_rgb, \n"
		 "ycbcr_to_rgb, ycbcr_to_hsv\n\n"
		 "Example:\n"
		 "\t./convert rgb_to_ycbcr 100 200 255\n"
		 "It will convert {100,200,255} from RGB format to YCbCR format.\n\n"
		 );
}

int compare(const char* str1, const char* str2, int size){
  for(int i=0; i<size; i++){
	if(str1[i] != str2[i]) return 0;
  }
  return 1;
}
Color read_color(char* c1, char* c2, char* c3){
  Color out;
  long temp[3] = {atoi(c1), atoi(c2), atoi(c3)};

  for(int i=0; i<3; i++){
	out.value[i] = clamp(temp[i], 0, 255);
  }

  return out;
}
void convert(const Color color, const char* mode){
  Color new_color;
  char  old_color_str[16];
  char  new_color_str[16];
  char  format[20];
  
  if( compare(mode, "rgb_to_hsv", 10) ){
	new_color = rgb_to_hsv(color);
    strcpy(format, "\n\tRGB%s = HSV%s\n\n");
	
  } else if( compare(mode, "rgb_to_ycbcr", 12) ){
    new_color = rgb_to_ycbcr(color);
	strcpy(format, "\n\tRGB%s = YCbCr%s\n\n");
	
  } else if( compare(mode, "hsv_to_ycbcr", 12) ){
    new_color = hsv_to_ycbcr(color);
	strcpy(format, "\n\tHSV%s = YCbCr%s\n\n");
	
  } else if( compare(mode, "hsv_to_rgb", 10) ){
	new_color = hsv_to_rgb(color);
	strcpy(format, "\n\tHSV%s = RGB%s\n\n");
	
  } else if( compare(mode, "ycbcr_to_rgb", 12) ){
	new_color = ycbcr_to_rgb(color);
	strcpy(format, "\n\tYCbCr%s = RGB%s\n\n");
	
  } else if( compare(mode, "ycbcr_to_hsv", 10) ){
    new_color = rgb_to_hsv(color);	
    strcpy(format, "\n\tYCbCr%s = HSV%s\n\n");
	
  } else {
	printf("Error on selecting mode to convertion\n");
	return;
  }

  // Stringfy
  stringfy_color(color, old_color_str);
  stringfy_color(new_color, new_color_str);
  
  printf(format, old_color_str, new_color_str);
}

int main(int argc, char** argv) {

  // Check amount of arguments
  if(argc<5){
	help();
	return 1;
  }

  // Convert
  Color color = read_color(argv[2], argv[3], argv[4]);
  convert(color, argv[1]);
  
  return 0;
}

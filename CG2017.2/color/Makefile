CC= gcc
OUT= convert

all: Color.o
	@${CC} main.c -o ${OUT} *.o

Color.o: Color.c Color.h
	@${CC} -c Color.c

run:
	@./${OUT}

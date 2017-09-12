CC= gcc
OUT= convert

all: Color.o
	@${CC} -g main.c -o ${OUT} *.o

Color.o: Color.c Color.h
	@${CC} -g -c Color.c

run:
	@./${OUT}

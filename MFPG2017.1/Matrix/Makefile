STD_VERSION = c++1y

CXXFLAGS += -std=$(STD_VERSION) -Wall -Wextra -Wnon-virtual-dtor -Wold-style-cast -Wcast-align -Wunused -Woverloaded-virtual -Wconversion -Wshadow -Wnoexcept -Weffc++

all: main.cpp Matrix.o
	g++ $(CXXFLAGS) main.cpp Matrix.o

Matrix.o: Matrix.hpp Matrix.cpp Vec.hpp.gch
	g++ $(CXXFLAGS) -c Matrix.cpp

Vec.hpp.gch:
	g++ $(CXXFLAGS) -c Vec.hpp

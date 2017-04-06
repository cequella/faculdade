STD_VERSION = c++1y

CXXFLAGS += -std=$(STD_VERSION) -Wall -Wextra -Wnon-virtual-dtor -Wold-style-cast -Wcast-align -Wunused -Woverloaded-virtual -Wconversion -Wshadow -Wnoexcept -Weffc++

FixedPoint: FixedPoint.o
	g++ $(CXXFLAGS) Main.cpp FixedPoint.o

FixedPoint.o: FixedPoint.hpp FixedPoint.cpp
	g++ $(CXXFLAGS) -c FixedPoint.cpp

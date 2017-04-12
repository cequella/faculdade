STD_VERSION = c++1y

CXXFLAGS += -std=$(STD_VERSION) -Wall -Wextra -Wnon-virtual-dtor -Wold-style-cast -Wcast-align -Wunused -Woverloaded-virtual -Wconversion -Wshadow -Wnoexcept -Weffc++

FixedPointMachine: FixedPointMachine.o
	g++ $(CXXFLAGS) Main.cpp FixedPointMachine.o

FixedPointMachine.o: FixedPointMachine.hpp FixedPointMachine.cpp
	g++ $(CXXFLAGS) -c FixedPointMachine.cpp

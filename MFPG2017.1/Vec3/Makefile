STD_VERSION = c++1y

CXXFLAGS += -std=$(STD_VERSION) -Wall -Wextra -Wnon-virtual-dtor -Wold-style-cast -Wcast-align -Wunused -Woverloaded-virtual -Wconversion -Wshadow -Wnoexcept -Weffc++

all: main.cpp Vec.hpp
	g++ $(CXXFLAGS) main.cpp Vec.hpp

#include "Point.h"
Point::Point() : x(0), y(0) {}
Point::Point(int x, int y):x(x),y(y)
{
}

Point::Point(const Point& P)
{
    this->x = P.x;
    this->y = P.y;
}

Point& Point::operator=(const Point& P) {
    if (this != &P) { 
        x = P.x;
        y = P.y;
    }
    return *this;
}

int Point::getX() const
{
	return this->x;
}

int Point::getY() const
{
	return this->y;
}


int Point::getPointId() const
{
    return x* cols + y;
}

void Point::Display() const
{
	std::cout << "(" << x << " , " << y << ")" << std::endl;
}

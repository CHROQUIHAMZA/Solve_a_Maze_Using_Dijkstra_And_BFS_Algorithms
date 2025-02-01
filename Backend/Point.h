#pragma once
#include<iostream>
#define cols 24
class Point
{
private :
	int x;
	int y;
public :
	Point();
	Point(int x, int y);
	Point(const Point& P);
	Point& operator=(const Point& P);
	int getX()const;
	int getY()const;
	int getPointId() const;
	void Display()const;
};


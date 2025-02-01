#pragma once
#include<iostream>
using namespace std;
class Cellule
{
private:
	int value;
	char status;//w:white , g:grey , b:black , y:yellow
public:
	Cellule();
	Cellule(int value, char status);
	void setStatus(char status);
	void setValue(int value);
	char getStatus()const;
	bool IsWay() const;
	bool isStartPoint() const ;
	bool isEndPoint() const;
	bool isVisited() const;
	bool isDiscovered()const;
	void Display()const;

	~Cellule();

};


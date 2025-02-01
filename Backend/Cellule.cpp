#include "Cellule.h"



Cellule::Cellule():value(0),status('w')
{
}

Cellule::Cellule(int value, char status):value(value),status(status)
{

}
char Cellule::getStatus()const {
	return this->status;
}
void Cellule::setStatus(char status)
{
	if (status == 'w' || status == 'g' || status == 'b' || status=='y')
		this->status = status;
}
void Cellule::setValue(int value)
{
	this->value = value;
}
bool Cellule::IsWay() const
{
	return this->value==0 || this->value==3 || this->value==2;
}

bool Cellule::isStartPoint() const
{
	return this->value==2;
}

bool Cellule::isEndPoint() const
{
	return this->value==3;
}

bool Cellule::isVisited() const
{
	return this->getStatus() == 'b' || this->getStatus()=='g';
}
bool Cellule::isDiscovered() const
{
	return this->value==4;
}
void Cellule::Display()const {
	cout << value << "(" << status << ")" << " ";
}
Cellule::~Cellule()
{
}

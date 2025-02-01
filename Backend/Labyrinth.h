#pragma once
#include"Cellule.h"
#include<vector>
#include"Point.h"
#define rows 10
#define cols 24
using namespace std;
class Labyrinth
{
private:
	Cellule **labyrinth;
	Point* startPoint;
	Point* endPoint;
	vector<Point> shortestPath;
public:
	Labyrinth(vector<vector<int>> labyrinth,Point* startPoint,Point* endPoint);
	void Display() const;
	vector<Point> BFS();
	vector<Point>Dijkstra();
	void DisplayShortestPath()const;
	vector<Point> getShortestPaht() const;
	~Labyrinth();

};


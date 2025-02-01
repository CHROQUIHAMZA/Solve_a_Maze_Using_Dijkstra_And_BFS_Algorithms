#include "Labyrinth.h"
#include<queue>
Labyrinth::Labyrinth(vector<vector<int>> inputLabyrinth, Point* startPoint, Point* endPoint)
{
    labyrinth = new Cellule * [rows]; 
    this->startPoint = startPoint;
    this->endPoint = endPoint;
    for (int i = 0; i < rows; i++) {
        labyrinth[i] = new Cellule[cols](); 
        for (int j = 0; j < cols; j++) {
            labyrinth[i][j] = Cellule(inputLabyrinth[i][j], 'w'); 
        }
    }
}
void Labyrinth::Display()const {
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            labyrinth[i][j].Display();
        }
        std::cout << std::endl;
    }
}
vector<Point> Labyrinth::BFS()
{
    int directionTab[8][2] = { {-1, 0},{1, 0},{0, -1},{0, 1},{1, 1},{-1, -1},{1,-1},{-1,1} };
    vector<Point> steps;
    vector<Point> parent[rows * cols];
    queue<Point> temp;
    bool found = false;
    Point P(*startPoint);
    int x = startPoint->getX();
    int y = startPoint->getY();

    steps.push_back(P);
    temp.push(P);
    labyrinth[x][y].setStatus('g'); 

    while (!temp.empty())
    {
        P = temp.front();
        temp.pop();
        x = P.getX();
        y = P.getY();
        labyrinth[x][y].setStatus('b');  

        for (auto step : directionTab) {
            int ni = P.getX() + step[0];
            int nj = P.getY() + step[1];

            if (ni >= 0 && nj >= 0 && ni < rows && nj < cols && labyrinth[ni][nj].IsWay() && !labyrinth[ni][nj].isVisited()) {
                labyrinth[ni][nj].setStatus('g');  
                steps.push_back(Point(ni, nj));
                temp.push(Point(ni, nj));
                parent[ni * cols + nj].push_back(P);  
                labyrinth[ni][nj].setValue(4);  

                if (ni == endPoint->getX() && nj == endPoint->getY()) {
                    shortestPath.clear();
                    
                    Point current = *endPoint;

                    while (current.getPointId() != startPoint->getPointId()) {
                        shortestPath.push_back(current);
                        int id = current.getX() * cols + current.getY();
                        current = parent[id][rand()%parent[id].size()];
                    }

                    shortestPath.push_back(*startPoint);
                    reverse(shortestPath.begin(), shortestPath.end());
                    steps.erase(steps.begin() + steps.size() - 1);

                    return steps;  
                }
            }
        }
    }

    return {};  
}

vector<Point> Labyrinth::Dijkstra() {
    int size = rows * cols;
    int directionTab[8][2] = { {-1, 0},{1, 0},{0, -1},{0, 1},{1, 1},{-1, -1},{1,-1},{-1,1} };
    vector<Point> steps;
    bool found = false;
    Point P(*startPoint);

    bool* isVisited = new bool[size];
    int* distance = new int[size];
    vector<Point> parents[240]; 

    for (int i = 0; i < size; i++) {
        isVisited[i] = false;
        distance[i] = INT_MAX;
    }

    int pointId = P.getPointId();
    distance[pointId] = 0;

    for (int count = 0; count < size - 1; count++) {
        int min = -1;

        for (int i = 0; i < size; i++) {
            if (!isVisited[i] && (min == -1 || distance[i] < distance[min])) {
                min = i;
            }
        }

        if (min == -1) break;

        int x = min / cols;
        int y = min % cols;
        isVisited[min] = true;
        Point p1(x, y);
        steps.push_back(p1);

        for (auto direct : directionTab) {
            int ni = p1.getX() + direct[0];
            int nj = p1.getY() + direct[1];
            Point temp(ni, nj);
            int tempId = temp.getPointId();

            if (ni >= 0 && nj >= 0 && ni < rows && nj < cols && labyrinth[ni][nj].IsWay()) {
                int newDistance = distance[min] + 1;
                if (newDistance < distance[tempId]) {
                    distance[tempId] = newDistance;
                    parents[tempId].clear(); 
                    parents[tempId].push_back(p1);
                }
                else if (newDistance == distance[tempId]) {
                    parents[tempId].push_back(p1);
                }

                if (ni == endPoint->getX() && nj == endPoint->getY()) {
                    
                    shortestPath.clear();
                    queue<Point> q;
                    q.push(*endPoint);

                    while (!q.empty()) {
                        Point current = q.front();
                        q.pop();
                        shortestPath.push_back(current);

                        int currId = current.getPointId();
                        if (currId == startPoint->getPointId()) break;

                        if (!parents[currId].empty()) {
                            q.push(parents[currId][rand()% parents[currId].size()]);
                        }
                    }
                    reverse(shortestPath.begin(), shortestPath.end());
                    delete[] isVisited;
                    delete[] distance;
                    return steps; 
                }
            }
        }
    }

    delete[] isVisited;
    delete[] distance;
    return {};
}


void Labyrinth::DisplayShortestPath() const
{
    if (shortestPath.size()) {
        for (Point point : shortestPath)
            point.Display();
    }
    else {
        cout << "no path for the moment" << endl;
    }
}
vector<Point> Labyrinth::getShortestPaht() const
{
    return this->shortestPath;
}
Labyrinth::~Labyrinth()
{
}

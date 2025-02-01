#include "httplib.hpp"
#include "json.hpp"
#include <iostream>
#include<vector>
#include"Labyrinth.h"
#include"Point.h"
using namespace httplib;
using json = nlohmann::json;
using namespace std;


int main() {
    Server svr;

    svr.Post("/solve-maze", [](const Request& req, Response& res) {
        try {
            json receivedData = json::parse(req.body);

            std::string algorithm = receivedData["algorithm"];
            auto labyrinth = receivedData["labyrinth"];
            Point *startPoint=new Point(receivedData["startPoint"]["x"], receivedData["startPoint"]["y"]);
            Point *endPoint=new Point(receivedData["endPoint"]["x"], receivedData["endPoint"]["y"]);
            Labyrinth L(labyrinth,startPoint,endPoint);
            vector<Point> steps;
            vector<Point> shortestPath;
            json stepsArray = json::array();
            json shortestPathJson = json::array();
            auto start = std::chrono::high_resolution_clock::now();
            if (algorithm == "BFS") { 
                steps = L.BFS(); 
            }
            else if (algorithm == "Dijkstra") {
                steps = L.Dijkstra();
            }
            for (int i = 1; i < steps.size(); i++) {
                json step = {
                {"x", steps[i].getX()},
                {"y", steps[i].getY()}
                };
                stepsArray.push_back(step);
            }
            shortestPath = L.getShortestPaht();
            for (int i = 1; i < shortestPath.size() - 1;i++) {
                    json path = {
                        {"x",shortestPath[i].getX()},
                        {"y",shortestPath[i].getY()}
                    };
                   shortestPathJson.push_back(path);
            }
                auto end = chrono::high_resolution_clock::now();
                chrono::duration<double> duration = end - start;
                json response = { {"message", "Labyrinth received and processed"},{"steps",stepsArray},{"shortestPath" , shortestPathJson},{"executionTime",duration.count()}};
            res.set_content(response.dump(), "application/json");
            res.status = 200;
        }
        catch (const std::exception& e) {
            std::cerr << "Error: " << e.what() << std::endl;
            json errorResponse = { {"message", "Invalid JSON or missing fields"} };
            res.set_content(errorResponse.dump(), "application/json");
            res.status = 400;
        }
        });

    std::cout << "Server running on http://localhost:8080" << std::endl;
    svr.listen("0.0.0.0", 8080);

    return 0;
}

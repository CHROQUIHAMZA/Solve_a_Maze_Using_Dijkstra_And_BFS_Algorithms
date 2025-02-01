# Maze Solver: Dijkstra & BFS Algorithms

This project implements **Dijkstra's Algorithm** and **BFS (Breadth-First Search)** to solve mazes. It visualizes the process of finding the shortest path from a start point to an end point, helping you understand how each algorithm explores the maze.

## Key Features
- **Interactive Maze:** Dynamically generates mazes of customizable sizes.
- **Dijkstra's Algorithm:** A graph traversal algorithm that finds the shortest path by calculating the minimum distance to each node, ensuring an optimal solution.
- **BFS Algorithm:** A simple and effective algorithm that explores all neighboring nodes level by level, guaranteeing the shortest path in an unweighted graph.
- **Real-Time Visualization:** Watch the algorithms run live, with visual updates as the maze is explored.
- **Statistics Panel:** Displays key statistics:
  - **Execution Time** of the algorithm.
  - **Number of Nodes Visited** during the process.
  - **Path Length** (steps) from start to finish.
- **Responsive Design:** Fully responsive interface for different screen sizes.

## Technologies Used

### Frontend:
- **React** (JavaScript library for building user interfaces)
- **TailwindCSS** (Utility-first CSS framework for fast UI design)
- **Lucide Icons** (Icons for visual elements)
- **CountUp** (React animation library for statistical counter)

### Backend:
- **C++** (Main language for algorithm implementation)
- **vcpkg** (C++ package manager for handling dependencies)
- **CMake** (Build system to compile C++ project)
- **nlohmann/json** (JSON library for handling maze data and communication between frontend and backend)

## How to Use

1. **Generate a Maze:** Customize the maze size and click "Generate Maze."
2. **Select an Algorithm:** Choose either **Dijkstra’s** or **BFS** algorithm to solve the maze.
3. **Run the Algorithm:** Click **Start** to visualize the algorithm solving the maze.
4. **View Statistics:** Monitor execution time, nodes visited, and path length in the statistics panel.

## Installation

### Frontend Installation

To set up the frontend:

1. Clone the repository:
    ```bash
    git clone https://github.com/CHROQUIHAMZA/Solve_a_Maze_Using_Dijkstra_And_BFS_Algorithms
    ```

2. Navigate to the project directory:
    ```bash
    cd Solve_a_Maze_Using_Dijkstra_And_BFS_Algorithms
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000` to view the project.

### Backend Installation

To set up the C++ backend:

1. Install **vcpkg** (C++ package manager):
    ```bash
    git clone https://github.com/microsoft/vcpkg.git
    cd vcpkg
    ./bootstrap-vcpkg.sh
    ```

2. Install necessary dependencies using **vcpkg**:
    ```bash
    ./vcpkg install nlohmann-json
    ```



### Running the Complete Project

Once both frontend and backend are set up:

1. Ensure the backend service is running and listening for requests (e.g., through HTTP ).
2. Start the React frontend using `npm start`.
3. The frontend will communicate with the backend to generate and solve the maze using the selected algorithm (Dijkstra or BFS).

## Contribution

Feel free to contribute by forking the repository, creating a new branch, and submitting a pull request with your changes or improvements.


## Acknowledgments

- **Dijkstra's Algorithm** and **BFS** for solving the maze.
- **NextJs** and **TailwindCSS** for the frontend.
-  **C++** for the backend.
- **Lucide Icons** for the UI components.
- **vcpkg** for managing C++ dependencies.


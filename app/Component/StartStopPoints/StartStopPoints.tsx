'use client'
import { useAppContext } from '@/app/Context';
import { BrickWall, Play, StopCircle, Shuffle } from 'lucide-react'; // Import Shuffle icon
import React from 'react';

const StartStopPoints = () => {
    const { setState, setIsStartPointAdded, setIsEndPointAdded, setLabyrinth ,rows,cols } = useAppContext();

    type Labyrinth = number[][];
// Number of columns in the maze

    const generateRandomMaze = () => {
        // Create an empty grid
        let maze: Labyrinth = Array.from({ length: rows }, () => Array(cols).fill(0));

        // Randomly place walls (1s)
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // Randomly decide to place a wall (excluding borders)
                if (i !== 0 && i !== rows - 1 && j !== 0 && j !== cols - 1) {
                    maze[i][j] = Math.random() < 0.3 ? 1 : 0; // 30% chance of wall
                }
            }
        }

        // Set start point (2) and end point (3)
        maze[0][0] = 2; // Start point at top-left corner
        maze[rows - 1][cols - 1] = 3; // End point at bottom-right corner
        setIsStartPointAdded(true);
        // Optional: Ensure start and end are open paths
        maze[0][0] = 2;
        maze[rows - 1][cols - 1] = 3;
        setIsEndPointAdded(true);

        // Update the labyrinth state
        setLabyrinth(maze);
        console.log(maze); // For visualization
    };

    return (
        <div className="w-screen">
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => {
                        setState(2);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 mt-3"
                >
                    <Play className="w-5 h-5" /> Start Node
                </button>

                <button
                    onClick={() => {
                        setState(3);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400 mt-3"
                >
                    <StopCircle className="w-5 h-5" /> End Node
                </button>

                <button
                    onClick={() => {
                        setState(1);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-500 text-white font-semibold rounded-md hover:bg-slate-600 focus:ring-2 focus:ring-slate-800 mt-3"
                >
                    <BrickWall className="w-5 h-5" /> Wall
                </button>

                <button
                    onClick={generateRandomMaze}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 mt-3"
                >
                    <Shuffle className="w-5 h-5" /> Random Maze
                </button>
            </div>
        </div>
    );
};

export default StartStopPoints;

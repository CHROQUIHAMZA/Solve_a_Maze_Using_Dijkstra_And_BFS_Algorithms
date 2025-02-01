import React, { useEffect } from 'react';
import { Send } from 'lucide-react';
import { useAppContext } from '@/app/Context';
import { toast } from 'react-toastify';

const SubmitButton = () => {
    const { isStartPointAdded, isEndPointAdded, algo, setIsLoading, labyrinth, setLabyrinth, rows, cols, shortestPath,setShortestPath, setSteps, steps ,setIsStepsAnimating,setExecutionTime,executionTime} = useAppContext();

   
    const animate = async (size: number) => {
        setIsStepsAnimating(true);
        for (let i = 0; i < size; i++) {
            await new Promise(resolve => setTimeout(resolve, 50)); 
            const { x, y } = steps[i];
            labyrinth[x][y] = 4; 
            setLabyrinth([...labyrinth]); 
        }
        setIsStepsAnimating(false);
    };
    const animateShortestPath=async(size:number)=>{
        for(let i = 0 ;i<size;i++){
            await new Promise(resolve=>setTimeout(resolve,50));
            const {x,y}=shortestPath[i];
            labyrinth[x][y]=5;
            setLabyrinth([...labyrinth]);
        }
    }
    useEffect(() => {
        const runAnimation = async () => {
            if (steps && steps.length > 0) {
                await animate(steps.length);
                await animateShortestPath(shortestPath.length);
            }
        };
    
        runAnimation();
        console.log(executionTime);
    }, [steps,shortestPath]);

    const play = async () => {
        console.log('Selected algorithm:', algo);
        if (!algo) {
            toast.warn('Please choose an algorithm to solve the maze.');
            return;
        } else if (!isStartPointAdded) {
            toast.warn('Please set a start point for your maze before proceeding!');
            return;
        } else if (!isEndPointAdded) {
            toast.warn('Please set an end point for your maze before proceeding!');
            return;
        }

        setIsLoading(true);
        try {
            let startPoint, endPoint;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (labyrinth[i][j] === 0 || labyrinth[i][j] === 2 || labyrinth[i][j] === 3) {
                        if (labyrinth[i][j] === 2) {
                            startPoint = { x: i, y: j };
                        } else if (labyrinth[i][j] === 3) {
                            endPoint = { x: i, y: j };
                        }
                    }
                }
            }

            const mazePayload = {
                algorithm: algo,
                labyrinth: labyrinth,
                startPoint: startPoint,
                endPoint: endPoint,
            };

            const response = await fetch('http://localhost:8080/solve-maze', {
                method: 'POST',
                body: JSON.stringify(mazePayload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSteps(data.steps); 
                setShortestPath(data.shortestPath);
                setExecutionTime(data.executionTime);
                toast.success('Maze solved successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error from backend:', errorData);
                toast.error('Failed to solve the maze. Please try again.');
            }
        } catch (error) {
            console.error('Network error:', error);
            toast.error('An error occurred while connecting to the backend. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-screen flex justify-center">
            <button
                onClick={async () => {
                    await play();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 mt-4"
            >
                <Send className="w-5 h-5" /> Play
            </button>
        </div>
    );
};

export default SubmitButton;

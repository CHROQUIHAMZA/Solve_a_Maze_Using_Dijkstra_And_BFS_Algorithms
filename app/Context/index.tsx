'use client'
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);
export function AppWrapper({ children }: { children: React.ReactNode })
{
 const [state , setState]=useState<number>(2);
 const [isStartPointAdded,setIsStartPointAdded]=useState<boolean>(false);
 const [isEndPointAdded,setIsEndPointAdded]=useState<boolean>(false);
 const [labyrinth,setLabyrinth]=useState<number[][]>(Array(10).fill(null).map(() => Array(24).fill(0)))
 const [isLoading , setIsLoading]=useState(false);
 const [isVisible,setIsVisible] =useState(false);
 const [steps,setSteps]=useState([]);
 const [isStepsAnimating,setIsStepsAnimating]=useState<boolean>(false)
 const [shortestPath,setShortestPath]=useState([]);
 const [executionTime, setExecutionTime] = useState<number>(0);
 const [algo , setAlgo] = useState('');
 const rows = 10;
 const cols = 24;
 
 function getNodeId(i:number, j:number) {
   return i * cols + j;
 }
 

 function getNeighbors(i:number, j:number) {
   const neighbors = [];
   const directions = [ [-1, 0], [1, 0], [0, -1], [0, 1],[1,1],[-1,-1] ]; 
   
   for (let [di, dj] of directions) {
     const ni = i + di;
     const nj = j + dj;
     
     if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && (labyrinth[ni][nj] === 0 || labyrinth[ni][nj] === 2 || labyrinth[ni][nj] === 3)) {
       neighbors.push([ni, nj]);
     }
   }
   return neighbors;
 }
 


const chooseAlgo=(value:string):void=>{
        setAlgo(value);
        setIsVisible(false);
    }
const reset=():void =>{
        setAlgo('')
        setIsVisible(false);
        setIsEndPointAdded(false);
        setIsStartPointAdded(false);
        setLabyrinth(Array(10).fill(null).map(() => Array(24).fill(0)));
        setExecutionTime(0);
        setShortestPath([]);
        setSteps([]);
        setExecutionTime(0);
      
        
    }
 const changeState = (indexRow: number, indexCol: number, value: number) => {
    const newLabyrinth = labyrinth.map((row: number[], rowIndex: number) => {
        if (rowIndex === indexRow) {
          
            return row.map((cell, cellIndex) =>
                cellIndex === indexCol ? value : cell 
            );
        }
        return row; 
    });

    
    setLabyrinth(newLabyrinth);
};

const changeStateOnState = (indexRow: number, indexCol: number) => {
    if (state === 2) { // Handle Start Point
        if (isStartPointAdded) {
            for(var i:number=0;i<labyrinth.length;i++){
                for(var j:number=0;j<labyrinth[i].length;j++){
                   if(labyrinth[i][j]===2) labyrinth[i][j]=0;
                }
            }
            setLabyrinth(labyrinth);
        }
        changeState(indexRow, indexCol, 2);
        setIsStartPointAdded(true); 
        return;
    }

    if (state === 3) { 
        if (isEndPointAdded) {
           
            for(var i:number=0;i<labyrinth.length;i++){
                for(var j:number=0;j<labyrinth[i].length;j++){
                     if(labyrinth[i][j]===3) labyrinth[i][j]=0;
                }
            }
            setLabyrinth(labyrinth);
        }
        
        changeState(indexRow, indexCol, 3);
        setIsEndPointAdded(true);
        return;
    }
    else{
   
    changeState(indexRow,indexCol, labyrinth[indexRow][indexCol]===2 || labyrinth[indexRow][indexCol]===3 || labyrinth[indexRow][indexCol]===0  ?1:0);
}
    
};

const listOfMethods={
        labyrinth,setLabyrinth,changeState,setState,state
        ,changeStateOnState,algo,isVisible,setIsVisible,
        chooseAlgo,reset,setIsEndPointAdded,setIsStartPointAdded,
        isEndPointAdded,isStartPointAdded,isLoading , setIsLoading,
        getNodeId,getNeighbors,cols,rows,steps,setSteps,shortestPath,setShortestPath,
        isStepsAnimating,setIsStepsAnimating,executionTime,setExecutionTime
    }
 return (
    <AppContext.Provider value={
        listOfMethods
}>
        {children}
    </AppContext.Provider>
 )
}
export function useAppContext(){
    return useContext(AppContext);
}
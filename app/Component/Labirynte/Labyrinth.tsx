"use client";
import React from "react";
import "./Labyrinth.css"; 
import { useAppContext } from "@/app/Context";

const Labyrinth = () => {
    const { labyrinth, changeStateOnState } = useAppContext();

    // Fonction pour gérer les classes CSS des cellules
    const getCellClass = (cell: number) => {
        switch (cell) {
            case 1: return "wall";
            case 2: return "start";
            case 3: return "end";
            case 4: return "way";
            case 5: return "spath";
            default: return "path";
        }
    };

    return (
        <div className="labyrinth-grid">
            {labyrinth?.map((row: number[], rowIndex: number) =>
                row.map((cell, cellIndex) => (
                    <div
                        key={`${rowIndex}-${cellIndex}`}
                        className={`cell ${getCellClass(cell)}`}
                        onClick={() => changeStateOnState(rowIndex, cellIndex)}
                    ></div>
                ))
            )}
        </div>
    );
};

export default Labyrinth;

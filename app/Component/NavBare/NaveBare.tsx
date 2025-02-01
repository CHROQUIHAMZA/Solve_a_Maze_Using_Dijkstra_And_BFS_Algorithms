'use client'
import { ChevronUp } from 'lucide-react';
import React from 'react';
import { useAppContext } from '@/app/Context';
import algorithmeTable from '@/algo';

function NaveBare() {
    const { setIsVisible, isVisible, algo, chooseAlgo, reset } = useAppContext();

    return (
        <nav className="bg-blue-700 h-[50px] flex justify-between items-center px-4">
            <div>
                <span className="text-3xl font-bold text-slate-400 cursor-default">MazeRunner</span>
            </div>
            <div className="w-[25%] flex justify-evenly px-5 text-white">
                <div className="relative w-fit">
                    <button
                        className="flex items-center justify-between gap-2 px-4 py-2 text-white transition-all duration-300"
                        onClick={() => setIsVisible(!isVisible)}
                    >
                        <span className="w-[100px]">
                            {algo === '' ? 'Choose Algo' : algo}
                        </span>
                        <ChevronUp
                            className={`text-white transition-transform duration-500 ${
                                !isVisible ? 'rotate-180' : ''
                            }`}
                        />
                    </button>

                    <div
                        className={`absolute top-14 left-0 w-40 bg-white text-black border border-gray-200 shadow-lg rounded-lg z-10 transform transition-transform duration-300 ${
                            isVisible ? 'scale-100' : 'hidden scale-95'
                        }`}
                    >
                        {algorithmeTable.map((item: { name: string }, index: number) => (
                            <span
                                key={index}
                                className="block w-full px-4 py-2 text-left cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    chooseAlgo(item.name);
                                    setIsVisible(false); // Close dropdown after selection
                                }}
                            >
                                {item.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Reset Button */}
                <button
                    className="text-rose-500"
                    onClick={() => reset()}
                >
                    Reset
                </button>
            </div>
        </nav>
    );
}

export default NaveBare;

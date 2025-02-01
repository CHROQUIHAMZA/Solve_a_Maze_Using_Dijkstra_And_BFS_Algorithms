import { useAppContext } from '@/app/Context';
import { ArrowRight, Clock, Search } from 'lucide-react';
import React from 'react';
import CountUp from 'react-countup';

const Statistics = () => {
    const { steps, shortestPath, executionTime } = useAppContext();

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold text-center text-gray-800 mb-4">
                <Clock className="inline-block mr-2" size={24} />
                Statistics
            </h3>
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2 text-left text-gray-700">Statistic</th>
                        <th className="px-4 py-2 text-left text-gray-700">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-4 py-2 text-gray-700 flex items-center">
                            <Clock className="mr-2 text-blue-500" size={20} />
                            Execution Time
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-800">
                            <CountUp start={0} end={executionTime} duration={2} decimals={6} separator=',' /> s
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 text-gray-700 flex items-center">
                            <Search className="mr-2 text-green-500" size={20} />
                            Nodes Visited
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-800">
                            <CountUp start={0} end={steps.length} duration={2} />
                        </td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2 text-gray-700 flex items-center">
                            <ArrowRight className="mr-2 text-orange-500" size={20} />
                            Path Length
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-800">
                            <CountUp start={0} end={shortestPath.length} duration={2} /> steps
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Statistics;

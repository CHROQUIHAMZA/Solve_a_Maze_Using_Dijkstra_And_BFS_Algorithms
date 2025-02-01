import React from 'react';
import Labyrinth from '../Component/Labirynte/Labyrinth';
import StartStopPoints from '../Component/StartStopPoints/StartStopPoints';
import SubmitButton from '../Component/SubmitButton/SubmitButton';
import Statistics from '../Component/Statistics/Statistics';

export default function HomePage() {
  return (
    <div className="w-full h-full">
      <StartStopPoints />
      <div className="mt-3 flex space-x-4 px-5">
        <div className="flex-grow">
          <Labyrinth />
        </div>
        <div className="w-80">
          <Statistics />
        </div>
      </div>
      <SubmitButton />
    </div>
  );
}

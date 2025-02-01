'use client'
import { ClipLoader } from "react-spinners";
import HomePage from "./(public)/page";
import LoadingSpinner from "./Component/LoadingSpinner/LoadingSpinner";
import { useAppContext } from "./Context";
export default function Home() {
  const {isLoading}=useAppContext();
  return (
    <div className="w-screen h-screen bg-slate-400 relative">
    <HomePage />
    {
      isLoading && 
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-gray-800 bg-opacity-50 z-20">
        <ClipLoader size={70} color="#1D4ED8" loading={true} aria-label="Loading spinner" />
         <span className="text-white ml-4 mt-3">Loading, please wait...</span>
    </div>
    }
  </div>
  
  );
}

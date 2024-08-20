import React from 'react';

export default function NumberInput({label,minInput, setMinInput,maxInput, setMaxInput}){

    const handleMinInputChange = (event)=>{
        setMinInput(event.target.value)
    }
    const handleMaxInputChange = (event)=>{
        setMaxInput(event.target.value)
    }
    return (
        <>
        <label className="block mt-2 text-xs font-semibold leading-6 text-neutral-500">{label}</label>
        <div className="flex">
            <form className="w-1/2 ml-0 mr-auto pr-1">
                <input 
                    type="number" 
                    id="number-input" 
                    aria-describedby="helper-text-explanation" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="From" 
                    value={minInput}
                    onChange={handleMinInputChange}
                />
            </form>
    
            <form className="w-1/2 mr-0 ml-auto pl-1">
                <input 
                    type="number" 
                    id="number-input" 
                    aria-describedby="helper-text-explanation" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="To" 
                    value={maxInput}
                    onChange={handleMaxInputChange}
                />
            </form>
        </div>
    </>
    
    )
    
}
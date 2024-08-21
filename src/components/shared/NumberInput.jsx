import React from 'react';

export default function NumberInput({category, input, setInput}){

    const handleInputChange = (event)=>{
        setInput(event.target.value)
    }
  

    if (category==="min"){
        return(
            <form className="w-1/2 ml-0 mr-auto pr-1">
                <input 
                    type="number" 
                    id="number-input" 
                    aria-describedby="helper-text-explanation" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="From" 
                    value={input}
                    onChange={handleInputChange}
                />
            </form>
        )
    }
    else if(category === "full") {
        return(
            <form className="max-w-sm mx-auto">
            <input 
                type="number" 
                id="number-input" 
                aria-describedby="helper-text-explanation" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="15" 
                value={input}
                onChange={handleInputChange}
            />
        </form>
        )
    }
    else{
        return(
            <form className="w-1/2 mr-0 ml-auto pl-1">
            <input 
                type="number" 
                id="number-input" 
                aria-describedby="helper-text-explanation" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="To" 
                value={input}
                onChange={handleInputChange}
            />
        </form>
        )
    }

    
}
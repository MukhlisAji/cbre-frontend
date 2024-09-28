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
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-c-teal focus:border-c-teal block w-full p-1 pl-4" 
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
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-c-teal focus:border-c-teal block w-full p-1 pl-4" 
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
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-c-teal focus:border-c-teal block w-full p-1 pl-4" 
                placeholder="To" 
                value={input}
                onChange={handleInputChange}
            />
        </form>
        )
    }

    
}
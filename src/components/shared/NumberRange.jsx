import React from 'react';
import NumberInput from './NumberInput';

export default function NumberRange({label, minInput, maxInput, setMinInput, setMaxInput}){
    return(
        <>
            <label className="block mt-2 text-xs font-semibold leading-6 text-neutral-500">{label}</label>
            <div className="flex">
                <NumberInput category="min" input={minInput} setInput={setMinInput} />
                <NumberInput category="max" input={maxInput} setInput={setMaxInput}/>
            </div>
        </>
    )

}
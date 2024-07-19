import React, { useEffect, useRef, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiChevronUpDown } from 'react-icons/hi2';
import { IoCheckmarkOutline } from 'react-icons/io5';

export default function CustomDropdown({ label, options, selectedOption, onSelect }) {
    const dropdownRef = useRef(null);

    const handleOptionClick = (option) => {
        onSelect(option);
        // Handle closing logic here if needed
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            // Handle closing logic here if needed
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block mt-2 text-xs font-semibold leading-6 text-neutral-700">{label}</label>
            <Listbox value={selectedOption} onChange={handleOptionClick}>
                {({ open }) => (
                    <>
                        <div className="relative">
                            <Listbox.Button
                                className="relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-xs text-neutral-700 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-c-teal hover:ring-1 hover:ring-c-teal"
                            >
                                <span className="flex items-center">
                                    <span className="ml-1 block truncate">{selectedOption}</span>
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 ml-1 flex items-center pr-2">
                                    <HiChevronUpDown className="h-5 w-5 text-gray-300" aria-hidden="true" />
                                </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {options.map((option, idx) => (
                                        <Listbox.Option
                                            key={idx}
                                            className={({ active }) =>
                                                `relative cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-c-teal text-white' : 'text-neutral-600'}`
                                            }
                                            value={option}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <div className="flex items-center">
                                                        <span className={`ml-1 block truncate ${selected ? '' : 'font-normal'}`}>
                                                            {option}
                                                        </span>
                                                    </div>

                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? 'text-white' : 'text-neutral-600'}`}
                                                        >
                                                            <IoCheckmarkOutline className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </>
                )}
            </Listbox>
        </div>
    );
}

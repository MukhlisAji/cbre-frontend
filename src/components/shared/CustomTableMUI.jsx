import React, { useEffect, useRef, useState } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@table-library/react-table-library/table';
import { useSort } from '@table-library/react-table-library/sort';
import {
    useRowSelect,
    HeaderCellSelect,
    CellSelect
} from '@table-library/react-table-library/select';
import { useTheme } from '@table-library/react-table-library/theme';
import { Virtualized } from "@table-library/react-table-library/virtualized";
import { FaList } from 'react-icons/fa';
import { IoIosSearch, IoMdArrowDropdown } from 'react-icons/io';
import { TiArrowSortedDown } from "react-icons/ti";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { createTheme as createMaterialTheme } from "@mui/material/styles";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { SelectClickTypes } from '@table-library/react-table-library/types';


const ROW_HEIGHT = 40;

const CustomTableMUI = ({ dataTable, column, openModal, isHeader, tableHeight, loading, onEdit, dataType }) => {
    const [search, setSearch] = useState("");
    const [visibleColumns, setVisibleColumns] = useState(column.slice(0, 7));
    const [editing, setEditing] = useState(null);
    const [data, setData] = useState(dataTable);
    const [showDropdown, setShowDropdown] = useState(false);
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);
    const [activeButton, setActiveButton] = useState('all');
    // const [recentlyViewed, setRecentlyViewedState] = useState(getRecentlyViewed());
    const [showRecentlyViewed, setShowRecentlyViewed] = useState(false);
    const navigate = useNavigate();

    const RECENTLY_VIEWED_KEY = `recentlyViewed_${dataType}`;


    const getRecentlyViewed = () => {
        const storedItems = localStorage.getItem(RECENTLY_VIEWED_KEY);
        return storedItems ? JSON.parse(storedItems) : [];
    };

    const [recentlyViewed, setRecentlyViewedState] = useState(getRecentlyViewed());


    const setRecentlyViewed = (item) => {
        const recentlyViewed = getRecentlyViewed();
        if (!recentlyViewed.some(viewedItem => viewedItem.id === item.id)) {
            if (recentlyViewed.length >= 5) {
                recentlyViewed.shift(); // Remove the oldest item
            }
            recentlyViewed.push(item);
            localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(recentlyViewed));
        }
    };
    useEffect(() => {
        console.log("Updated data: ", dataTable);
        setData(dataTable);
    }, [dataTable]);


    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === 'recentlyViewed') {
            setShowRecentlyViewed(true);
        } else {
            setShowRecentlyViewed(false);
        }
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleColumnToggle = (column) => {
        setVisibleColumns((prev) => {
            const isSelected = prev.some(col => col.accessor === column.accessor);
            if (isSelected) {
                return prev.filter(col => col.accessor !== column.accessor);
            } else if (prev.length < 7) {
                return [...prev, column];
            } else {
                return prev; // Ignore if already 7 columns are selected
            }
        });
    };

    // const handleCellClick = (item, accessor) => {
    //     setEditing({ id: item.id, accessor, value: item[accessor] });
    //     setRecentlyViewed(item);
    //     setRecentlyViewedState(getRecentlyViewed());
    // };

    const handleCellClick = (item, accessor, isClickable, url) => {
        if (isClickable) {
            navigate(`${url}/${item.id}`)
            console.log(`Clicked on ${accessor} for item ${item.id}`);
            setRecentlyViewed(item);
            setRecentlyViewedState(getRecentlyViewed());
        } else {
            setEditing({ id: item.id, accessor, value: item[accessor] });
            setRecentlyViewed(item);
            setRecentlyViewedState(getRecentlyViewed());
        }
    };


    const handleChange = (event) => {
        setEditing((prev) => ({
            ...prev,
            value: event.target.value
        }));
    };

    const handleBlur = () => {
        if (editing) {
            const updatedData = data.map((item) =>
                item.id === editing.id
                    ? { ...item, [editing.accessor]: editing.value }
                    : item
            );
            setData(updatedData);
            setEditing(null);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleBlur();
        }
    };

    // Filter data based on search input
    const filteredData = data.filter((item) =>
        Object.values(item).some(value =>
            value != null && value.toString().toLowerCase().includes(search.toLowerCase()) // Check for null or undefined
        )
    );
    

    const theme = useTheme({
        Table: `
            --data-table-library_grid-template-columns: 30px repeat(${visibleColumns.length}, minmax(0, 1fr)) 40px;
            font-family: "Salesforce Sans", Arial, sans-serif; /* Font similar to Salesforce */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for elevation */
        `,
        HeaderRow: `
            background-color: #f4f6f9; /* Light gray background for header */
            color: #5e5e5e; /* Dark gray text color */
        `,
        Cell: `
            padding: 4px 8px; /* Padding inside cells */
            // color: #333; /* Dark text color */
            display: flex;
            align-items: center; /* Center align text vertically */
            font-size: 13px

        `,
        HeaderCell: `
            // background-color: rgb(245 245 245); /* Light gray background for header cells */
            // font-weight: bold; /* Bold text for header cells */
            // padding: 0px 12px; /* Padding inside header cells */
            // border-bottom: 2px solid #d8dde6; /* Bottom border for header cells */
            border-top: 2px solid #d8dde6; /* Bottom border for header cells */
            border-right: 1px solid #d8dde6; /* Border between header cells horizontally */
            // font-size: 13px

        `,
        BaseCell: `
            // padding: 0px 8px;
            border-bottom: 1px solid #d8dde6;
        `,
    });

    // Initialize row selection
    const select = useRowSelect({ nodes: filteredData }, {
        onChange: onSelectChange,
    },
        {
            clickType: SelectClickTypes.ButtonClick,
        }
    );

    function onSelectChange(action, state) {
        console.log(action, state);
    }

    // Initialize sorting
    const sort = useSort(
        { nodes: filteredData },
        {
            onChange: onSortChange,
        },
        {
            sortFns: column.reduce((acc, col) => {
                acc[col.accessor] = (array) =>
                    array.sort((a, b) => {
                        if (typeof a[col.accessor] === 'string') {
                            return a[col.accessor].localeCompare(b[col.accessor]);
                        } else {
                            return a[col.accessor] - b[col.accessor];
                        }
                    });
                return acc;
            }, {})
        }
    );

    function onSortChange(action, state) {
        console.log(action, state);
    }

    const getIcon = (sortKey) => {
        if (sort.state.sortKey === sortKey && sort.state.reverse) {
            return <KeyboardArrowDownOutlinedIcon />;
        }

        if (sort.state.sortKey === sortKey && !sort.state.reverse) {
            return <KeyboardArrowUpOutlinedIcon />;
        }

        return <UnfoldMoreOutlinedIcon />;
    };

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - tableHeight; // Subtract 200px for any other fixed content
            setSectionHeight(newHeight);
        };

        handleResize();

        // Add event listener to handle window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const resize = { resizerHighlight: "#3b82f6", resizerWidth: 3 };


    // action dropdown
    const [edit, setEdit] = useState(null);  // Store the ID or index of the clicked item

    const toggleDropdown = (itemId) => {
        setEdit((prevEdit) => (prevEdit === itemId ? null : itemId));  // Toggle the dropdown for the clicked item
    };

    return (
        <div className="space-y-4">
            <style>
                {`
                    .header-cell:hover {
                        background-color: #e0e5e0;
                        color: #333;
                    }
                    .header-title {
                        color: rgb(115 115 115); /* Set text color to black */
                        text-transform: none; /* Transform text to lowercase */
                        font-weight: semibold; /* Make the text bold */
                        font-size: 13px
                    }
                `}
            </style>


            {isHeader && <div className="flex flex-col h-full">
                {/* <p className="text-neutral-500 text-xs mt-auto py-2">
                    1 item • Updated a few seconds ago
                </p> */}
                <div className="flex flex-grow items-center space-x-2 justify-between">
                    <div className="flex w-48 text-sm rounded gap-1 px-1 rounded-md bg-gray-200">
                        <button
                            onClick={() => handleButtonClick('all')}
                            className={`flex-grow p-1 text-sm text-neutral-500 rounded rounded-md my-1 ${activeButton === 'all' ? 'bg-white text-black border-gray-300 shadow shadow-md' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleButtonClick('recentlyViewed')}
                            className={`flex-grow p-1 text-sm text-neutral-500 rounded rounded-md my-1 ${activeButton === 'recentlyViewed' ? 'bg-white text-black border-gray-300 shadow shadow-md' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
                        >
                            Recently Viewed
                        </button>
                    </div>
                    <div className='flex flex-row gap-2'>

                        <div className="relative">
                            <input
                                id="search"
                                type="text"
                                value={search}
                                onChange={handleSearch}
                                placeholder="Search this list..."
                                className="rounded-lg md:w-80 text-sm text-neutral-500 pl-10 pr-4 py-1.5 border border-neutral-400 hover:ring-1 hover:ring-c-teal focus:ring-c-teal focus:outline-none"
                            />
                            <IoIosSearch className="absolute left-2 top-2 text-xl text-neutral-600 font-semibold" />
                        </div>
                        <div className='relative'>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={openModal}
                                    className="flex items-center font-normal text-sm space-x-2 px-6 py-1.5 hover:bg-neutral-100 hover:text-neutral-700 border border-neutral-500 bg-white text-blue-700 rounded rounded-full transition duration-150 ease-in-out"

                                >
                                    <span>New</span>
                                </button>
                            </div>
                        </div>
                        <div className="relative">
                            <button
                                ref={buttonRef}
                                id="menu-button"
                                aria-expanded={showDropdown}
                                aria-haspopup="true"
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="p-2.5 bg-white text-blue-700 rounded-full border border-neutral-500 hover:border-c-teal hover:bg-neutral-100 hover:text-neutral-700"
                            >
                                <FaList className="text-sm" />
                            </button>
                            {showDropdown && (
                                <div ref={dropdownRef}
                                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex="-1"
                                >
                                    <div className="py-1" role="none">
                                        {column.map((column) => (
                                            <label
                                                key={column.accessor}
                                                className="flex text-xs items-center space-x-2 text-gray-700 px-4 py-2 hover:bg-gray-100"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={visibleColumns.some(col => col.accessor === column.accessor)}
                                                    onChange={() => handleColumnToggle(column)}
                                                    disabled={!visibleColumns.some(col => col.accessor === column.accessor) && visibleColumns.length >= 7}
                                                    className="form-checkbox h-3 w-3 text-blue-600"
                                                />
                                                <span>{column.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
            }

            <div style={{ height: `${sectionHeight}px` }} className="bg-white overflow-auto">
                <MaterialThemeProvider theme={createMaterialTheme({})}>
                    {loading ? (
                        <div className="flex items-center h-full align-center bg-white bg-opacity-70 flex justify-center items-center z-50">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                        </div>
                    ) : (
                        <Table
                            data={{ nodes: showRecentlyViewed ? recentlyViewed : filteredData }}
                            theme={theme}
                            layout={{ isDiv: true, fixedHeader: true, custom: true }}
                            select={select}
                            sort={sort}
                        >
                            {(tableList) => (
                                <Virtualized
                                    tableList={tableList}
                                    rowHeight={ROW_HEIGHT}
                                    header={() => (
                                        <HeaderRow className="header-cel">
                                            <HeaderCellSelect
                                                style={{
                                                    margin: '0 auto',
                                                    backgroundColor: '#f4f6f9',
                                                    borderTop: '2px solid #d9dde6',
                                                    padding: '8px',
                                                }}
                                            />
                                            {visibleColumns.map((col) => (
                                                <HeaderCell resize={resize} key={col.accessor} className="header-cell">
                                                    <Button
                                                        fullWidth
                                                        className="header-title"
                                                        style={{ justifyContent: "flex-start" }}
                                                        endIcon={getIcon(col.accessor)}
                                                        onClick={() =>
                                                            sort.fns.onToggleSort({
                                                                sortKey: col.accessor,
                                                            })
                                                        }
                                                    >
                                                        {col.label}
                                                    </Button>
                                                </HeaderCell>

                                            ))
                                            }

                                            <HeaderCell className='header-cell'><span></span></HeaderCell>

                                        </HeaderRow>
                                    )}
                                    body={(item, index) => (
                                        <Row key={index} item={item} className="hover:bg-blue-50">
                                            <CellSelect item={item} />
                                            {visibleColumns.map((col) => (
                                                <Cell
                                                    key={col.accessor}
                                                    onClick={() => handleCellClick(item, col.accessor, col.isClickable, col.url)}
                                                    className={col.isClickable ? 'cursor-pointer text-blue-700 hover:text-blue-700 hover:font-semibold' : ''}

                                                >
                                                    {/* {editing && editing.id === item.id && editing.accessor === col.accessor ? (
                                                        <input
                                                            className='p-1.5 w-full border focus:border-c-teal rounded-md'
                                                            type="text"
                                                            value={editing.value}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            onKeyPress={handleKeyPress}
                                                            autoFocus
                                                        />
                                                    ) : ( */}
                                                    {item[col.accessor]}
                                                    {/* )} */}
                                                </Cell>
                                            ))}
                                            <Cell className='action-cell'>

                                                <div onClick={() => toggleDropdown(item.id)}
                                                    className='border mx-0.5 border-neutral-400 hover:border-c-teal py-0.5 rounded-sm flex items-center justify-center bg-white cursor-pointer'>
                                                    <IoMdArrowDropdown className='text-neutral-500 hover:text-neutral-600' />
                                                </div>
                                                {edit === item.id && (
                                                    <div className='absolute z-20 right-0 mt-1 py-1 w-16 bg-white border border-neutral-400 rounded-md shadow-lg'>
                                                        <div
                                                            onClick={() => {
                                                                onEdit(item);
                                                                setEdit(null);
                                                                setRecentlyViewed(item);
                                                                setRecentlyViewedState(getRecentlyViewed());
                                                            }}
                                                            className='px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer'
                                                        >
                                                            Edit
                                                        </div>
                                                        {/* Add more options here if needed */}
                                                    </div>
                                                )}
                                            </Cell>
                                        </Row>
                                    )}
                                />
                            )}
                        </Table>
                    )}
                </MaterialThemeProvider>
            </div>
        </div >
    );
};

export default CustomTableMUI;

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell, Footer, Header, FooterRow, FooterCell, Body } from '@table-library/react-table-library/table';
import { useSort } from '@table-library/react-table-library/sort';
import { useRowSelect, HeaderCellSelect, CellSelect } from '@table-library/react-table-library/select';
import { useTheme } from '@table-library/react-table-library/theme';
import { FaList, FaSpinner } from 'react-icons/fa';
import { IoIosSearch, IoMdArrowDropdown } from 'react-icons/io';
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { createTheme as createMaterialTheme } from "@mui/material/styles";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { SelectClickTypes } from '@table-library/react-table-library/types';
import axios from 'axios';
import { throttle } from 'lodash';
import { CONFIG } from '../../../config';
import { PiSpinnerBall } from 'react-icons/pi';

const ROW_HEIGHT = 40;

export default function AccountList({ column, openModal, isHeader, tableHeight, loading, onEdit, dataType }) {
    const [state, setState] = useState({
        search: "",
        visibleColumns: column.slice(0, 7),
        data: [],
        recentlyViewed: JSON.parse(localStorage.getItem(`recentlyViewed_${dataType}`)) || [],
        showRecentlyViewed: false,
        page: 1,
        hasMore: true,
        isFetching: false
    });
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const [editAnchorEl, setEditAnchorEl] = useState(null);  // Anchor for edit menu
    const [selectedItem, setSelectedItem] = useState(null);  // Store the selected item for editing
    const [fetchLoading, setFetchLoading] = useState(false);
    const [activeButton, setActiveButton] = useState('all');

    useEffect(() => {
        const fetchDataInSequence = async () => {
            try {
                await fetchData(1);
                await fetchData(2);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDataInSequence();
    }, []);


    useEffect(() => {
        if (state.page > 2) {
            fetchData(state.page);
        }
    }, [state.page]);

    const fetchData = async (page) => {
        if (state.isFetching) return;
        setState(prev => ({ ...prev, isFetching: true }));

        try {
            const response = await axios.get(`${CONFIG.ACCOUNT_SERVICE}?page=${page}`, {
                headers: {
                    transactionId: '4646765766'
                }
            });
            const newData = response.data.resultSet;
            setState(prev => ({
                ...prev,
                data: [...prev.data, ...newData],
                page: page,
                hasMore: newData.length > 0,
                isFetching: false
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            setState(prev => ({ ...prev, isFetching: false }));
        }
    };

    const handleScroll = (event) => {
        // console.log('Scroll event detected');
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 150 && state.hasMore && !state.isFetching) {
            console.log('Scroll conditions met, fetching next page');
            fetchNextPage();
        }
        // console.log('Scroll event triggered');
    };

    const fetchNextPage = async () => {
        setFetchLoading(true);
        const nextPage = state.page + 1;
        fetchData(nextPage);
    };

    const handleSearch = (event) => {
        setState(prev => ({ ...prev, search: event.target.value }));
    };

    const handleColumnToggle = (column) => {
        setState(prev => {
            const isSelected = prev.visibleColumns.some(col => col.accessor === column.accessor);
            const updatedColumns = isSelected
                ? prev.visibleColumns.filter(col => col.accessor !== column.accessor)
                : prev.visibleColumns.length < 7
                    ? [...prev.visibleColumns, column]
                    : prev.visibleColumns;
            return { ...prev, visibleColumns: updatedColumns };
        });
    };

    const handleCellClick = (item, accessor, isClickable, url) => {
        addRecentlyViewedItem(item);
        if (isClickable) {
            navigate(`${url}/${item.id}`);
        }
    };

    const handleButtonClick = (button) => {
        setActiveButton(button);
        if (button === 'recentlyViewed') {
            state.showRecentlyViewed = true;
        } else {
            state.showRecentlyViewed = false;
        }
    };

    const addRecentlyViewedItem = (newItem) => {
        // Prepend the new item to the beginning of the array
        const updatedRecentlyViewed = [newItem, ...state.recentlyViewed];

        // Update the state
        setState(prevState => ({
            ...prevState,
            recentlyViewed: updatedRecentlyViewed
        }));

        // Save the updated recently viewed items to localStorage
        localStorage.setItem(`recentlyViewed_${dataType}`, JSON.stringify(updatedRecentlyViewed));
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

    const handleEditClick = (item) => {
        setSelectedItem(item);
        setEditAnchorEl(null);  // Close the menu
        onEdit(item);  // Call the onEdit function
    };

    const handleMenuClose = () => {
        setEditAnchorEl(null);
    };

    const handleEditMenuOpen = (event, item) => {
        setSelectedItem(item);
        setEditAnchorEl(event.currentTarget);  // Set the anchor for the menu
    };

    const filteredData = useMemo(() => {
        return state.data.filter(item =>
            Object.values(item).some(value =>
                value != null && value.toString().toLowerCase().includes(state.search.toLowerCase())
            )
        );
    }, [state.data, state.search]);

    const theme = useTheme({
        Table: `
            --data-table-library_grid-template-columns: 30px repeat(${state.visibleColumns.length}, minmax(0, 1fr)) 40px;
            font-family: "Salesforce Sans", Arial, sans-serif; /* Font similar to Salesforce */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for elevation */
        `,
        HeaderRow: `
            background-color: #f4f6f9; /* Light gray background for header */
            color: #5e5e5e; /* Dark gray text color */
        `,
        Cell: `
            padding: 10px 8px; /* Padding inside cells */
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

    const select = useRowSelect({ nodes: filteredData }, {
        onChange: onSelectChange,
    }, {
        clickType: SelectClickTypes.ButtonClick,
    });

    function onSelectChange(action, state) {
        console.log(action, state);
    }

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
        if (sort.state.sortKey === sortKey) {
            return sort.state.reverse ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />;
        }
        return <UnfoldMoreOutlinedIcon />;
    };

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = Math.min(screenHeight - tableHeight, 600);
            setSectionHeight(newHeight);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [tableHeight]);

    const resize = { resizerHighlight: "#3b82f6", resizerWidth: 3 };
    const [edit, setEdit] = useState(null);  // Store the ID or index of the clicked item

    const toggleDropdown = (itemId) => {
        setEdit((prevEdit) => (prevEdit === itemId ? null : itemId));  // Toggle the dropdown for the clicked item
    };

    return (
        <div className="space-y-4">
            <style>{`
                    .bg-white {
                        scrollbar-width: thin;
                        scrollbar-color: #ccc #f4f6f9;
                    }
                    .bg-white::-webkit-scrollbar {
                        width: 8px;
                    }
                    .bg-white::-webkit-scrollbar-thumb {
                        background-color: #ccc;
                        border-radius: 4px;
                    }
                    .header-cell{
                        width: 100%
                    }
                    .header-cell:hover {
                        background-color: #e0e5e0;
                        color: #333;
                    }
                    .header-title {
                        color: rgb(115 115 115);
                        text-transform: none;
                        font-weight: semibold;
                        font-size: 13px
                    }
                `}
            </style>

            {isHeader && <div className="flex px-4 flex-col h-full">
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
                                value={state.search}
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
                                                    checked={state.visibleColumns.some(col => col.accessor === column.accessor)}
                                                    onChange={() => handleColumnToggle(column)}
                                                    disabled={!state.visibleColumns.some(col => col.accessor === column.accessor) && state.visibleColumns.length >= 7}
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

            <div style={{ height: `${sectionHeight}px`, minHeight: '400px', overflowY: 'auto' }} className="bg-white w-full" onScroll={handleScroll}>
                <MaterialThemeProvider theme={createMaterialTheme({})}>
                    {loading ? (
                        <div className="flex items-center h-full justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                        </div>
                    ) : (<div>
                        <Table
                            data={{ nodes: state.showRecentlyViewed ? state.recentlyViewed : filteredData }}
                            theme={theme}
                            layout={{ isDiv: true, fixedHeader: true, custom: true }}
                            select={select}
                            sort={sort}
                            className="w-full"
                        // onScroll={handleScroll}
                        >
                            {(tableList) => (
                                <>
                                    {/* Render Header */}
                                    <Header>
                                        <HeaderRow className="header-cell">
                                            <HeaderCellSelect
                                                style={{
                                                    margin: '0 auto',
                                                    backgroundColor: '#f4f6f9',
                                                    borderTop: '2px solid #d9dde6',
                                                    padding: '8px',
                                                }}
                                            />
                                            {state.visibleColumns.map((col) => (
                                                <HeaderCell
                                                    resize={resize}
                                                    key={col.accessor}
                                                    className="header-cell"
                                                >
                                                    <Button
                                                        fullWidth
                                                        className="header-title"
                                                        style={{ justifyContent: 'flex-start' }}
                                                        endIcon={getIcon(col.accessor)}
                                                        onClick={() => sort.fns.onToggleSort({ sortKey: col.accessor })}
                                                    >
                                                        {col.label}
                                                    </Button>
                                                </HeaderCell>
                                            ))}
                                            <HeaderCell className="header-cell">
                                                <span></span>
                                            </HeaderCell>
                                        </HeaderRow>
                                    </Header>

                                    <Body>
                                        {/* Render Body */}
                                        {tableList.map((item, index) => (
                                            <Row key={index} item={item} className="hover:bg-blue-50">
                                                <CellSelect item={item} />
                                                {state.visibleColumns.map((col) => (
                                                    <Cell
                                                        key={col.accessor}
                                                        onClick={() =>
                                                            handleCellClick(item, col.accessor, col.isClickable, col.url)
                                                        }
                                                        className={
                                                            col.isClickable
                                                                ? 'cursor-pointer text-blue-700 hover:text-blue-700 hover:font-semibold'
                                                                : 'text-gray-500'
                                                        }
                                                    >
                                                        {item[col.accessor]}
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
                                                                    addRecentlyViewedItem(item);
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
                                        ))}
                                    </Body>

                                    {/* Render Spinner for Infinite Scroll - Outside of Table Rows */}

                                </>
                            )}
                        </Table>
                        {state.isFetching && (
                            <div className="w-full flex justify-center py-4">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-c-teal"></div>
                            </div>
                        )}
                    </div>


                    )}
                </MaterialThemeProvider>
            </div>
        </div>
    );
}

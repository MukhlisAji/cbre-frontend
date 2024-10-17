import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@table-library/react-table-library/table';
import { useSort } from '@table-library/react-table-library/sort';
import { useRowSelect, HeaderCellSelect, CellSelect } from '@table-library/react-table-library/select';
import { useTheme } from '@table-library/react-table-library/theme';
import { Virtualized } from "@table-library/react-table-library/virtualized";
import { FaList } from 'react-icons/fa';
import { IoIosSearch } from 'react-icons/io';
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { createTheme as createMaterialTheme } from "@mui/material/styles";
import { ThemeProvider as MaterialThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import { SelectClickTypes } from '@table-library/react-table-library/types';

const ROW_HEIGHT = 40;

export default function BasicTable({ dataTable, column, openModal, isHeader, tableHeight, loading, onEdit, dataType, isSelect }) {
    const [state, setState] = useState({
        search: "",
        visibleColumns: column.slice(0, 7),
        editing: null,
        data: dataTable,
        showDropdown: false,
        activeButton: 'all',
        recentlyViewed: JSON.parse(localStorage.getItem(`recentlyViewed_${dataType}`)) || [],
        showRecentlyViewed: false,
    });
    const navigate = useNavigate();
    const buttonRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setState(prev => ({ ...prev, data: dataTable }));
    }, [dataTable]);

    const handleButtonClick = (button) => {
        setState(prev => ({ ...prev, activeButton: button, showRecentlyViewed: button === 'recentlyViewed' }));
    };

    const handleClickOutside = useCallback((event) => {
        if (
            dropdownRef.current && !dropdownRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)
        ) {
            setState(prev => ({ ...prev, showDropdown: false }));
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

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
        if (isClickable) {
            navigate(`${url}/${item.buildingId}`);
        } else {
            setState(prev => ({ ...prev, editing: { id: item.buildingId, accessor, value: item[accessor] } }));
        }
        setRecentlyViewed(item);
    };

    const setRecentlyViewed = (item) => {
        const { recentlyViewed } = state;
        if (!recentlyViewed.some(viewedItem => viewedItem.buildingId === item.buildingId)) {
            const updatedRecentlyViewed = [...recentlyViewed, item].slice(-5);
            localStorage.setItem(`recentlyViewed_${dataType}`, JSON.stringify(updatedRecentlyViewed));
            setState(prev => ({ ...prev, recentlyViewed: updatedRecentlyViewed }));
        }
    };

    const filteredData = useMemo(() => {
        return state.data.filter(item =>
            Object.values(item).some(value => value.toString().toLowerCase().includes(state.search.toLowerCase()))
        );
    }, [state.data, state.search]);

    const theme = useTheme({
        Table: `
            --data-table-library_grid-template-columns: repeat(${state.visibleColumns.length -1}, minmax(0, 1fr)) 60px;
            font-family: "Salesforce Sans", Arial, sans-serif;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        `,
        HeaderRow: `
            background-color: #f4f6f9;
            color: #5e5e5e;
        `,
        Cell: `
            padding: 4px 8px;
            display: flex;
            align-items: center;
            font-size: 13px
        `,
        HeaderCell: `
            border-top: 2px solid #d8dde6;
            border-right: 1px solid #d8dde6;
        `,
        BaseCell: `
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
                if (col.accessor !== "action") { // Disable sorting for the "Action" column
                    acc[col.accessor] = (array) =>
                        array.sort((a, b) => {
                            if (typeof a[col.accessor] === 'string') {
                                return a[col.accessor].localeCompare(b[col.accessor]);
                            } else {
                                return a[col.accessor] - b[col.accessor];
                            }
                        });
                }
                return acc;
            }, {})
        }
    );

    function onSortChange(action, state) {
        console.log(action, state);
    }

    const getIcon = (sortKey) => {
        if (sortKey === 'action') {
            return null;  // No sorting icon for Action column
        }
        if (sort.state.sortKey === sortKey) {
            return sort.state.reverse ? <KeyboardArrowDownOutlinedIcon /> : <KeyboardArrowUpOutlinedIcon />;
        }
        return <UnfoldMoreOutlinedIcon />;
    };

    const [sectionHeight, setSectionHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const screenHeight = window.innerHeight;
            const newHeight = screenHeight - tableHeight;
            setSectionHeight(newHeight);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [tableHeight]);

    const resize = { resizerHighlight: "#3b82f6", resizerWidth: 3 };

    return (
        <div className="space-y-4">
            <style>
                {`
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

            {isHeader && <div className="flex flex-col h-full">
                <div className="flex flex-grow items-center space-x-2 justify-between">
                    <div className="flex w-48 text-sm rounded gap-1 px-1 rounded-md bg-gray-200">
                        {['all', 'recentlyViewed'].map((button) => (
                            <button
                                key={button}
                                onClick={() => handleButtonClick(button)}
                                className={`flex-grow p-1 text-sm text-neutral-500 rounded-md my-1 ${state.activeButton === button ? 'bg-white text-black border-gray-300 shadow shadow-md' : 'bg-gray-200 text-gray-700 border-gray-300'}`}
                            >
                                {button.charAt(0).toUpperCase() + button.slice(1).replace(/([A-Z])/g, ' $1')}
                            </button>
                        ))}
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
                            <button
                                onClick={openModal}
                                className="flex items-center font-normal text-sm space-x-2 px-6 py-1.5 hover:bg-neutral-100 hover:text-neutral-700 border border-neutral-500 bg-white text-blue-700 rounded-full transition duration-150 ease-in-out"
                            >
                                <span>New</span>
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                ref={buttonRef}
                                onClick={() => setState(prev => ({ ...prev, showDropdown: !prev.showDropdown }))}
                                className="p-2.5 bg-white text-blue-700 rounded-full border border-neutral-500 hover:border-c-teal hover:bg-neutral-100 hover:text-neutral-700"
                            >
                                <FaList className="text-sm" />
                            </button>
                            {state.showDropdown && (
                                <div ref={dropdownRef} className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
                                    <div className="py-1">
                                        {column.map((column) => (
                                            <label key={column.accessor} className="flex text-xs items-center space-x-2 text-gray-700 px-4 py-2 hover:bg-gray-100">
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
            </div>}

            <div style={{ height: `${sectionHeight}px` }} className="bg-white overflow-auto">
                <MaterialThemeProvider theme={createMaterialTheme({})}>
                    {loading ? (
                        <div className="flex items-center h-full justify-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-c-teal"></div>
                        </div>
                    ) : (
                        <Table
                            data={{ nodes: state.showRecentlyViewed ? state.recentlyViewed : filteredData }}
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
                                        <HeaderRow className="header-cell">
                                            {isSelect && <HeaderCellSelect style={{ margin: '0 auto', backgroundColor: '#f4f6f9', borderTop: '2px solid #d9dde6', padding: '8px' }} />}
                                            {state.visibleColumns.map((col) => (
                                                <HeaderCell resize={resize} key={col.accessor} className="header-cell">
                                                    <Button
                                                        fullWidth
                                                        className="header-title"
                                                        style={{ justifyContent: "flex-start" }}
                                                        endIcon={getIcon(col.accessor)}
                                                        onClick={col.accessor !== 'action' ? () => sort.fns.onToggleSort({ sortKey: col.accessor }) : undefined}
                                                    >
                                                        {col.label}
                                                    </Button>
                                                </HeaderCell>
                                            ))}
                                        </HeaderRow>
                                    )}
                                    body={(item, index) => (
                                        <Row key={index} item={item} className="hover:bg-blue-50">
                                            {isSelect && <CellSelect item={item} /> }
                                            {state.visibleColumns.map((col) => (
                                                <Cell
                                                    key={col.accessor}
                                                    onClick={() => handleCellClick(item, col.accessor, col.isClickable, col.url)}
                                                    className={col.isClickable ? 'cursor-pointer text-blue-700 hover:text-blue-700 hover:font-semibold' : ''}
                                                >
                                                    {item[col.accessor]}
                                                </Cell>
                                            ))}
                                        </Row>
                                    )}
                                />
                            )}
                        </Table>
                    )}
                </MaterialThemeProvider>
            </div>
        </div>
    );
};

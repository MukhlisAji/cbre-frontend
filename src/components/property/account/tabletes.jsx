import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@table-library/react-table-library/table';
import { useSort } from '@table-library/react-table-library/sort';
import { useRowSelect, HeaderCellSelect, CellSelect } from '@table-library/react-table-library/select';
import { useTheme } from '@table-library/react-table-library/theme';
import { FaList } from 'react-icons/fa';
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

const ROW_HEIGHT = 40;

export default function AccountList({ column, openModal, tableHeight, loading, onEdit, dataType }) {
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
    const [editAnchorEl, setEditAnchorEl] = useState(null);  // Anchor for edit menu
    const [selectedItem, setSelectedItem] = useState(null);  // Store the selected item for editing

    useEffect(() => {
        // Fetch initial data from the API
        fetchData(1);
        fetchData(2);
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
            const response = await axios.get(`https://80fa8cdefb8b.ngrok.app/cbre/account?page=${page}`, {
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
        console.log('Scroll event detected');
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 150 && state.hasMore && !state.isFetching) {
            console.log('Scroll conditions met, fetching next page');
            fetchNextPage();
        }
        console.log('Scroll event triggered');
    };

    const fetchNextPage = async () => {
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
        if (isClickable) {
            navigate(`${url}/${item.id}`);
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

            <div style={{ height: `${sectionHeight}px`, minHeight: '400px', overflowY: 'auto' }} className="bg-white" onScroll={handleScroll}>
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
                                <>
                                    {/* Render Header */}
                                    <HeaderRow className="header-cell">
                                        <HeaderCellSelect
                                            style={{
                                                margin: '0 auto',
                                                backgroundColor: '#f4f6f9',
                                                borderTop: '2px solid #d9dde6',
                                                padding: '8px'
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
                                            <Cell className="flex justify-end space-x-2">
                                                <IconButton
                                                    aria-controls={editAnchorEl ? 'edit-menu' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={(event) => handleEditMenuOpen(event, item)}
                                                >
                                                    <IoMdArrowDropdown />
                                                </IconButton>
                                                <Menu
                                                    id="edit-menu"
                                                    anchorEl={editAnchorEl}
                                                    open={Boolean(editAnchorEl)}
                                                    onClose={handleMenuClose}
                                                >
                                                    <MenuItem onClick={() => handleEditClick(selectedItem)}>Edit</MenuItem>
                                                </Menu>
                                            </Cell>
                                        </Row>
                                    ))}
                                </>
                            )}
                        </Table>
                    )}
                </MaterialThemeProvider>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useTable, useSortBy, useRowSelect, useFilters } from 'react-table';
import { FaEllipsisV, FaCheckSquare, FaSquare } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';

const DataTable = ({ columns, data }) => {
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleToggleColumn = (columnId) => {
        toggleHideColumn(columnId, !hiddenColumns.includes(columnId));
        setHiddenColumns(prev =>
            prev.includes(columnId) ? prev.filter(id => id !== columnId) : [...prev, columnId]
        );
    };

    const defaultColumn = {
        Cell: ({ value }) => (
            <input
                value={value}
                onChange={(e) => console.log('Cell value changed: ', e.target.value)}
            />
        ),
    };

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
        toggleHideColumn,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState: {
                hiddenColumns: hiddenColumns,
            }
        },
        useFilters,
        useSortBy,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <Checkbox {...getToggleAllRowsSelectedProps()} icon={<FaSquare />} checkedIcon={<FaCheckSquare />} />
                    ),
                    Cell: ({ row }) => (
                        <Checkbox {...row.getToggleRowSelectedProps()} icon={<FaSquare />} checkedIcon={<FaCheckSquare />} />
                    ),
                },
                ...columns,
            ]);
        }
    );

    const CustomCheckbox = ({ checked, ...props }) => (
        <span {...props}>
            {checked ? <FaCheckSquare /> : <FaSquare />}
        </span>
    );

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ float: 'right' }}
            >
                <FaEllipsisV />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                {allColumns.map(column => (
                    <MenuItem key={column.id} onClick={() => handleToggleColumn(column.id)}>
                        <CustomCheckbox
                            checked={!hiddenColumns.includes(column.id)}
                            onChange={() => handleToggleColumn(column.id)}
                        />
                        <span>{column.id}</span>
                    </MenuItem>
                ))}
            </Menu>
            <table {...getTableProps()} className="min-w-full bg-white border border-gray-300 rounded">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className="px-4 py-2 border-b capitalize"
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="px-4 py-2 border-b">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;

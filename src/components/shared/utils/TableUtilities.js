// utils/TableUtilities.js

class TableUtilities {
    static handleClickOutside(event, dropdownRef, buttonRef, setShowDropdown) {
        if (
            dropdownRef.current && 
            !dropdownRef.current.contains(event.target) && 
            buttonRef.current && 
            !buttonRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    }

    static handleSearch(event, setSearch) {
        setSearch(event.target.value);
    }

    static handleColumnToggle(column, setVisibleColumns) {
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
    }

    static handleCellClick(item, accessor, setEditing) {
        setEditing({ id: item.id, accessor, value: item[accessor] });
    }

    static handleChange(event, setEditing) {
        setEditing((prev) => ({
            ...prev,
            value: event.target.value
        }));
    }

    static handleBlur(editing, setEditing, data, setData) {
        if (editing) {
            const updatedData = data.map((item) =>
                item.id === editing.id
                    ? { ...item, [editing.accessor]: editing.value }
                    : item
            );
            setData(updatedData);
            setEditing(null);
        }
    }

    static handleKeyPress(event, handleBlur) {
        if (event.key === 'Enter') {
            handleBlur();
        }
    }

    static onSortChange(action, state) {
        console.log(action, state);
    }

    static onSelectChange(action, state) {
        console.log(action, state);
    }

    static handleResize(setSectionHeight) {
        const screenHeight = window.innerHeight;
        const newHeight = screenHeight - 280; // Subtract 280px for any other fixed content
        setSectionHeight(newHeight);
    }

    static createSort(dataTable) {
        return {
            sortFns: dataTable.reduce((acc, col) => {
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
        };
    }

    static createTheme(visibleColumnsLength) {
        return {
            Table: `
                --data-table-library_grid-template-columns: 40px repeat(${visibleColumnsLength}, minmax(0, 1fr));
                font-family: "Salesforce Sans", Arial, sans-serif;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            `,
            HeaderRow: `
                background-color: #f4f6f9;
                color: #5e5e5e;
            `,
            Cell: `
                padding: 4px 12px;
                color: #333;
                display: flex;
                align-items: center;
                font-size: 13px
            `,
            HeaderCell: `
                background-color: rgb(245 245 245);
                font-weight: bold;
                padding: 10px 12px;
                border-bottom: 2px solid #d8dde6;
                border-top: 2px solid #d8dde6;
                border-right: 1px solid #d8dde6;
                font-size: 13px
            `,
            BaseCell: `
                padding: 4px 12px;
                border-bottom: 1px solid #d8dde6;
            `,
        };
    }
}

export default TableUtilities;

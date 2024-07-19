import React from 'react'

const SearchListItem = ({ onClickAction, name }) => {
    return (
        <p onClick={onClickAction} style={{ color: 'black', cursor: 'pointer' }}>
            {name}
        </p>
    )
}

// Search
const SearchList = ({ filteringData, onClickAction }) => {
    return (
        <div style={{ position: 'absolute', top: "55px", left: "10px", backgroundColor: "white", padding: "2px", color: "white", zIndex: 999, width: '300px', height: 'max-content', maxHeight: '100px', overflow: 'auto', borderRadius: '5px', paddingInline: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteringData.map((item, index) => (
                    <SearchListItem key={index} onClickAction={() => onClickAction(item.geometry.coordinates)} name={item.properties.BUILDINGNAME} />
                ))}
            </div>
        </div>
    )
}

export default SearchList
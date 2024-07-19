import React from 'react'

const SearchLocation = ({onSearchChange, placeholder = "Search Location"}) => {
  return (
    <div style={{ position: "absolute", top: "10px", left: "10px", backgroundColor: "white", padding: "2px", color: "white", zIndex: 999, width: '300px', borderRadius: '5px' }}>
    <input onChange={onSearchChange} placeholder={placeholder} type="search" style={{ padding: '10px', outline: 'none', border: '1px solid rgba(0,0,0,.8)', width: '100%', borderRadius: '5px' }} />
  </div>
  )
}

export default SearchLocation
import React from 'react'
import IconLine from '../assets/jalur.png'

const FilterLine = ({onClickAction}) => {
  return (
    <div style={{ position: "absolute", bottom: "10px", left: "50px", backgroundColor: "#fff", padding: "10px", color: "white", width: "max-content", height: "100px", zIndex: 99999, borderRadius: '5px' }}>
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%', gap: '10px', alignItems: 'center' }}>
      <div onClick={onClickAction} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <img src={IconLine} width={50} height={50} alt="line" style={{ objectFit: 'cover' }} />
        <p style={{color: 'black', fontFamily: 'arial'}}>Line MRT/LRT</p>
      </div>

    </div>
  </div>
  )
}

export default FilterLine
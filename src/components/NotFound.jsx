import React from 'react'

const NotFound = () => {
    return (
        <div style={{ position: 'absolute', top: "55px", left: "10px", backgroundColor: "white", padding: "2px", color: "white", zIndex: 999, width: '300px', height: '200px', overflow: 'auto', borderRadius: '5px', paddingInline: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'black' }}>Not Found</p>
        </div>
    )
}

export default NotFound
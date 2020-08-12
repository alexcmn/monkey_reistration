import React from 'react'

export const checkbox = ({toggleCheckbox, check}) => {
    return (
        <div className={`checkbox ${check ? 'checked' : ''}`} onClick={toggleCheckbox}>
            <span className="tick">&#10003;</span>
        </div>
    )
}

export default checkbox;

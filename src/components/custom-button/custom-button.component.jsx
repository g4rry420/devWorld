import React from 'react'

import "./custom-button.styles.css"

export default function CustomButton({ title, button, type }) {
    return (
        <button type={type} className={`btn custom-button ${button}`}>
            <div className="p-2"> {title} </div>
        </button>
    )
}

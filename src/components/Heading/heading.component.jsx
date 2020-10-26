import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Heading({ title, textCase, display, h1 }) {
    return (
        <div className="container text-center">
            <h1 
                className={ (textCase && display) || (textCase || display) ? 
                    `${textCase} ${display} my-5 ${h1}`  : `display-3 my-5 ${h1}` }>
                {title} 
            </h1>
        </div>
    )
}

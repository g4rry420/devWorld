import React from 'react'

import "./welcome.styles.css"

export default function Welcome() {
    return (
        <div className="col-md-9 my-4">
            <div className="text-center">
                <h2>Welcome to the Dev-World.</h2>
                <h4>In this platform , users can create posts and share their stories to different developers.</h4>
                <h4>This Project is inspired from <a href="https://www.linkedin.com/in/abhiram-reddy-23285b196/" target="_blank" rel="noopener noreferrer"> Abhiram Reddy </a> who was the finalist of job Challenge v1.</h4>
            </div>
        </div>
    )
}

import React, { Component } from 'react'

import "./error-boundary.styles.css"

export default class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = {
            hasErrored: false
        }
    }

    static getDerivedStateFromError(error) {
        //process the error
        return { hasErrored: true }
    }

    componentDidCatch(error, info) {
        console.log(error);
    }

    render() {
         if(this.state.hasErrored){
            return (
                <div className="ErrorImageOverlay">
                    <div className="ErrorImageContainer">
                    </div>
                    <h2 className="ErrorImageText">Sorry, This Page is Broken.</h2>
                    <p>You thought this mission to the moon would be a quick six month thing. Your neighbor 
                    offered to look after your dog. Your high school math teacher was impressed. He once said 
                    you wouldn’t amount to anything.You sure showed him. But now here you are, fifty feet from 
                    your spaceship with no way to get back. Your dog will be so sad. Your math teacher will be so 
                    smug. Pretty devastating.</p>
                </div>
            )
        }else {
            return this.props.children;
        }
    }
}

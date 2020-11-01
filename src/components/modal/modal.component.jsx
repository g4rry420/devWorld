import React, { useState } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./modal.styles.css"
import { posts } from "../../firebase/firebase.config"
import { selectCurrentUser } from "../../redux/user/user.selectors"

function Modal({ modalRef, currentUser }) {


    const [create, setCreate] = useState({
        title: "",
        content: "",
        link: ""
    });

    const handleCancelPlaylist = () => {
        modalRef.current.classList.remove("modal-active-state");
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setCreate({...create, [name]: value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const DataToSend = {
            ...create
        }

        await posts(currentUser, DataToSend)

        setCreate({
            title: "",
            content: "",
            link: ""
        })

        modalRef.current.classList.remove("modal-active-state");

        return <Redirect to ="/" />
    }

    
    const {title, content, link} = create;

    return (
        <div ref={modalRef} className="modal-top-container">
            <div>
                <div className="modal-background"></div>
                <div className="modal-description">
                    <div className="text-center mb-4">
                        <h2>New Post</h2>
                    </div>
                    <form className="modal-form-container" onSubmit={handleSubmit} >
                        <div className="form-group">
                            <input onChange={handleChange} name="title" value={title} type="text" className="form-control" placeholder="Title" required/>
                        </div>
                        <div className="form-group">
                            <textarea onChange={handleChange} name="content" value={content} className="form-control" placeholder="Content" rows="4" required></textarea>
                        </div>
                        <h4>Link</h4>
                        <div className="form-group">
                            <input onChange={handleChange} name="link" value={link} type="text" className="form-control" placeholder="Link"/>
                        </div>
                        <div className="buttons">
                            <button onClick={handleCancelPlaylist} type="button" className="btn btn-danger">Cancel</button>
                            <button type="submit" className="btn btn-success">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
})

export default connect(mapStateToProps)(Modal)
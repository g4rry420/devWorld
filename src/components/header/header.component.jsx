import React,{ useEffect, useRef } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import "./header.styles.css"
import { auth } from '../../firebase/firebase.config'
import { setCurrentUserLogout } from "../../redux/user/user.actions"
import Modal from "../modal/modal.component"

function Header(props) {
    const wholeListContainerRef = useRef();
    const modalRef = useRef();

    const handleModal = () => {
        modalRef.current.classList.add("modal-active-state");
    }

    const { currentUser, setCurrentUserLogout } = props;
    return (
        <nav className="left-homepage col-md-3">
            <aside>
                <div className="brand-name text-center">
                    <h1 className="display-4">DevWorld</h1>
                </div>
                <div ref={wholeListContainerRef} className="whole-list-container">
                    <ul className="nav-list-container">
                    {
                        currentUser ? (
                            <>
                            <li className="my-3 display-4"><Link to="/" className="px-4 py-1">Home</Link></li>
                            <li className="my-3 display-4"><Link  to="/profiles" className="px-4 py-1">Profiles</Link></li>
                            <li className="my-3 display-4"><Link to="#" onClick={handleModal}  className="px-4 py-1">Create Post</Link></li>
                            <li className="my-3 display-4"><Link to="/login" className="px-4 py-1" onClick={() => {
                                auth.signOut();
                                setCurrentUserLogout(null);
                            }}>LogOut</Link></li>
                            </>
                        ) : (
                            <>
                            <li className="my-3 display-4"><Link to="/login" className="px-4 py-1">LogIn</Link></li>
                            <li className="my-3 display-4"><Link to="/signup" className="px-4 py-1">SignUp</Link></li>
                            </>
                        )
                    }
                    </ul>
                    <ul className="user-list-container">
                        <li className="display-4 my-3"><Link to={`/profiles/${currentUser && currentUser.uid}`} className="px-4 py-1">{currentUser && currentUser.displayName}</Link> </li>
                    </ul>
                </div>
            </aside>
            <Modal modalRef={modalRef} />
        </nav>
    )
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUserLogout: (user) => dispatch(setCurrentUserLogout(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
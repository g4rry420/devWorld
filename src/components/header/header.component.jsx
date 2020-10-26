import React,{ useEffect } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import "./header.styles.css"
import { auth } from '../../firebase/firebase.config'
import { setCurrentUserLogout } from "../../redux/user/user.actions"

function Header(props) {
    const { currentUser, setCurrentUserLogout } = props;
    return (
        <nav className="left-homepage col-md-3">
            <aside>
                <div className="brand-name text-center">
                    <h1 className="display-4">DevWorld</h1>
                </div>
                <ul className="nav-list-container">
                {
                    currentUser ? (
                        <>
                        <li className="my-3 display-4"><Link to="/" className="px-4 py-1">Home</Link></li>
                        <li className="my-3 display-4"><Link className="px-4 py-1">Profile</Link></li>
                        <li className="my-3 display-4"><Link className="px-4 py-1" onClick={() => {
                            auth.signOut();
                            setCurrentUserLogout(null)
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
            </aside>
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
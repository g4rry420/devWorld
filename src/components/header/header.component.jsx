import React,{ useRef } from 'react'
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"

import "./header.styles.css"
import { auth } from '../../firebase/firebase.config'
import { setCurrentUserLogout } from "../../redux/user/user.actions"
import Modal from "../modal/modal.component"
import { selectCurrentUser } from "../../redux/user/user.selectors"

function Header(props) {
    const navListContainRef = useRef();
    const modalRef = useRef();
    // useEffect(() => {
    //     if(!navListContainRef) return;

    //     for (let index = 0; index < navListContainRef.current.childNodes.length; index++) {
    //         const element = navListContainRef.current.childNodes[index];
    //         if(!element.children[0]) return;
    //         if(element.children[0].pathname === props.location.pathname){
    //             if(!element.children[0]) return;
    //             element.children[0].classList.add("active-header");
    //         }else{
    //             if(!element.children[0]) return;
    //             element.children[0].classList.remove("active-header");
    //         }
    //     }

    // }, [props.location.pathname])
    

    const handleModal = () => {
        modalRef.current.classList.add("modal-active-state");
        props.leftHomepageRef.current.classList.remove("active-left-homepage");
        props.rightHomepageRef.current.classList.remove("active-right-homepage");
    }

    const handleLink = () => {
        if(!props.rightHomepageRef.current) return;
        props.leftHomepageRef.current.classList.remove("active-left-homepage");
        props.rightHomepageRef.current.classList.remove("active-right-homepage");
    }

    const { currentUser, setCurrentUserLogout } = props;
    return (
        <nav ref={props.leftHomepageRef} className="left-homepage col-md-3">
            <aside>
                <div className="brand-name text-center">
                    <h1 className="display-4">DevWorld</h1>
                </div>
                <div className="whole-list-container">
                    <ul ref={navListContainRef} className="nav-list-container">
                    {
                        currentUser ? (
                            <>
                            <li className="my-3 display-4"><Link onClick={handleLink} to="/" className="px-4 py-1">Home</Link></li>
                            <li className="my-3 display-4"><Link onClick={handleLink} to="/profiles" className="px-4 py-1">Profiles</Link></li>
                            <li className="my-3 display-4 px-4 py-1 create-post" onClick={handleModal} >Create Post</li>
                            <li className="my-3 display-4"><Link to="/login" className="px-4 py-1" onClick={() => {
                                auth.signOut();
                                setCurrentUserLogout(null);
                                handleLink()
                            }}>LogOut</Link></li>
                            </>
                        ) : (
                            <>
                            <li className="my-3 display-4"><Link onClick={handleLink} to="/login" className="px-4 py-1">LogIn</Link></li>
                            <li className="my-3 display-4"><Link onClick={handleLink} to="/signup" className="px-4 py-1">SignUp</Link></li>
                            </>
                        )
                    }
                    </ul>
                    <ul className="user-list-container">
                        <li className="display-4 my-3"><Link onClick={handleLink} to={`/profiles/${currentUser && currentUser.uid}`} className="px-4 py-1">{currentUser && currentUser.displayName.split(" ")[0]}</Link> </li>
                    </ul>
                </div>
            </aside>
            <Modal modalRef={modalRef} />
        </nav>
    )
}

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUserLogout: (user) => dispatch(setCurrentUserLogout(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
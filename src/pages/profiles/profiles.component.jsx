import React,{ useEffect } from 'react'
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import "./profiles.styles.css"
import { userProfilesAsync, currentUserDependency } from "../../redux/user/user.actions"
import Profile from "../../components/profile/profile.component"
import { selectCurrentUser, selectProfiles } from "../../redux/user/user.selectors"

function Profiles({ profiles, userProfilesAsync, currentUser, currentUserDependency }) {

    useEffect(() => {
        userProfilesAsync()
    }, [])

    useEffect(() => {
        currentUserDependency();
    }, [])

    return (
        <div className="col-md-7 profiles-container">
        {
            profiles && profiles.map(profile => {
                if(profile.uid !== (currentUser && currentUser.uid)){
                    return  (
                        <Profile key={profile.uid} user={profile} seeProfile={true} />
                    )
                }
            })
        }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    profiles: selectProfiles
})

const mapDispatchToProps = dispatch => ({
    userProfilesAsync: () => dispatch(userProfilesAsync()),
    currentUserDependency: () => dispatch(currentUserDependency())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
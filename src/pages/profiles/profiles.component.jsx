import React,{ useEffect } from 'react'
import { connect } from "react-redux"

import "./profiles.styles.css"
import { userProfilesAsync } from "../../redux/user/user.actions"
import Profile from "../../components/profile/profile.component"

function Profiles({ profiles, userProfilesAsync }) {

    useEffect(() => {
        userProfilesAsync()
    }, [])

    return (
        <div className="col-md-7 profiles-container">
        {
            profiles && profiles.map(profile => (
                <Profile key={profile.uid} user={profile} seeProfile={true} />
            ))
        }
        </div>
    )
}

const mapStateToProps = state => ({
    profiles: state.user.profiles
})

const mapDispatchToProps = dispatch => ({
    userProfilesAsync: () => dispatch(userProfilesAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
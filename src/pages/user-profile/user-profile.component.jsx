import React,{ useEffect, useState } from 'react'
import { connect } from "react-redux";

import "./user-profile.styles.css"
import Post from "../../components/post/post.component"
import { currentUserPostsAsync } from "../../redux/posts/posts.actions"
import { userProfilesAsync } from "../../redux/user/user.actions"
import Profile from "../../components/profile/profile.component"
import { selectProfiles } from "../../redux/user/user.selectors"

function UserProfile({ currentUserPostsAsync, currentUserPosts, profiles, match, userProfilesAsync }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        if(!profiles.length){
            userProfilesAsync();
        }else {
            let user = profiles.filter(profile => profile.uid === match.params.profile_id)
            setUser(user[0])
        }
    }, [profiles])

    
    useEffect(() => {
        if(!user) return;
        currentUserPostsAsync(user.uid)
    }, [user])


    return (
        <div className="user-profile-top-container col-md-7 pt-5">
        {
            user &&  <Profile user={user} />
        }
        {
            currentUserPosts && (
                <div className="user-posts mt-2">
                    <div className="text-center">
                        <h2 className="display-4">Posts</h2>
                    </div>
            {
                currentUserPosts && currentUserPosts.map(post => (
                    <Post key={post.id} post={post} commentValue={true} />
                ))
            }
                </div>
            )
        }  
        </div>
    )
}

const mapStateToProps = (state) => ({
    currentUserPosts: state.posts.currentUserPosts,
    profiles: selectProfiles(state)
});

const mapDispatchToProps = dispatch => ({
    currentUserPostsAsync: currentUserId => dispatch(currentUserPostsAsync(currentUserId)),
    userProfilesAsync: () => dispatch(userProfilesAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
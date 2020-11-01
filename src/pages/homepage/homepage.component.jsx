import React,{ useEffect } from 'react'
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"

import "./homepage.styles.css"
import Post from "../../components/post/post.component"
import { updatePostAsync, updateHeartBooleanAsync } from "../../redux/posts/posts.actions"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectPost } from "../../redux/posts/posts.selectors"

function Homepage({ posts, updatePostAsync, currentUser, updateHeartBooleanAsync }) {
  
    useEffect(() => {
        updatePostAsync();
    }, [updatePostAsync])

    useEffect(() => {
        if(!currentUser) return;
        if(!posts) return;
        posts.forEach(post => updateHeartBooleanAsync(post.id, currentUser.uid))
    }, [posts])

    return (
        <main className="center-homepage col-md-7">
           <div className="container-fluid">
           {
               posts && posts.map(post => (
                   <Post key={post.id} post={post} commentValue={true} />
               ))
           }
           </div>
        </main>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    posts: selectPost
})

const mapDispatchToProps = (dispatch) => ({
    updatePostAsync: posts => dispatch(updatePostAsync(posts)),
    updateHeartBooleanAsync: (postId, userAuthId) => dispatch(updateHeartBooleanAsync(postId, userAuthId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
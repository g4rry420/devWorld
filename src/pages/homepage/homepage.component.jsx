import React,{ useEffect } from 'react'
import { connect } from "react-redux"

import "./homepage.styles.css"
import Post from "../../components/post/post.component"
import { updatePostAsync, updateHeartBooleanAsync } from "../../redux/posts/posts.actions"
import { selectCurrentUser } from "../../redux/user/user.selectors"

function Homepage({ posts, updatePostAsync, currentUser, updateHeartBooleanAsync }) {
  
    useEffect(() => {
        updatePostAsync();
    }, [])

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

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state),
    posts: state.posts.posts
})

const mapDispatchToProps = (dispatch) => ({
    updatePostAsync: posts => dispatch(updatePostAsync(posts)),
    updateHeartBooleanAsync: (postId, userAuthId) => dispatch(updateHeartBooleanAsync(postId, userAuthId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
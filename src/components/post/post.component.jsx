import React,{ useEffect, useRef, useState }  from 'react'
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import "./post.styles.css"
import { updateHeartAsync,  updateHeartBooleanOnRedux, updateHeartBooleanAsync } from "../../redux/posts/posts.actions"

function Post({ post, updateHeartAsync, updateHeartBooleanOnRedux, currentUser, heartBoolean, children, commentValue,updateHeartBooleanAsync }) {
    const [spanHeartId, setSpanHeartId] = useState("");

    const heartIconRef = useRef();

    if(!heartBoolean.length && currentUser){
        updateHeartBooleanAsync(post.id, currentUser.uid)
    }

    useEffect(() => {
        heartBoolean.map(heart => {
            if(heart.heartBoolean){
                setSpanHeartId(heart.postId)
            }
        })
    }, [heartBoolean])

    useEffect(() => {
        if(heartIconRef.current.id === spanHeartId){
            heartBoolean.forEach(heart => {
                if(heart.heartBoolean && heart.postId === spanHeartId){
                    heartIconRef.current.classList.add("heart-icon-active");
                }else if(!heart.heartBoolean && heart.postId === spanHeartId){
                    heartIconRef.current.classList.remove("heart-icon-active");
                }
            })
        }        
    }, [heartBoolean, spanHeartId])
    
    return (
            <div className="post-container my-5 p-3">
                <div className="top-post-head">
                    <div className="top-left-head">
                        <div className="post-img-container">
                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' alt="default "/>
                        </div>
                        <h5 className="display-4 user-name ml-2"> {post.displayName} </h5>
                    </div>
                    <div className="top-right-head text-right">
                        <p className="date"> {post.date} </p>
                        <p className="time"> {post.time} </p>
                    </div>
                </div>
                <h4 className="post-title mt-2"> {post.title} </h4>
                <div className="bottom-post mt-2">
                    <div className="post-content">
                        <p> {post.content} </p>
                    </div>
                    <div className="link-container mt-2">
                    {
                        post.link && <p>Link : <a href={ post.link } target="_blank"> {post.link} </a></p>
                    }
                    </div>
                    <div className="heart-container mt-2">
                        <span id={post.id} ref={heartIconRef} onClick={() =>{
                            const heart = heartBoolean.filter(heart => heart.postId === post.id);
                            updateHeartAsync(post.id, heart[0].heartBoolean, currentUser.uid);
                            updateHeartBooleanOnRedux(post.id);
                            setSpanHeartId(post.id);
                        }} className="heart"> &#10084; </span><span className="heart-number ml-2"> {post.heart} </span>
                    </div>
                    {
                        commentValue && (
                            <div className="comment-container">
                                <Link to={{ pathname: `/post/${post.id}`, state: { post } }}>
                                    <h5 className="display-4">Add a comment</h5>
                                </Link>
                            </div>
                        )
                    }
                </div>
                {
                    children && children
                }
            </div>
        )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    heartBoolean: state.posts.heartBoolean,
})

const mapDispatchToProps = (dispatch) => ({
    updateHeartAsync: (postId, heartBoolean, userAuthId) => dispatch(updateHeartAsync(postId, heartBoolean,userAuthId)),
    updateHeartBooleanOnRedux: postId => dispatch(updateHeartBooleanOnRedux(postId)),
    updateHeartBooleanAsync: (postId, userAuthId) => dispatch(updateHeartBooleanAsync(postId, userAuthId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
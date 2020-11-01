import React,{ useState, useEffect } from 'react'
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { createStructuredSelector } from "reselect"

import "./post-comment.styles.css"
import Post from "../../components/post/post.component"
import CustomButton from "../../components/custom-button/custom-button.component";
import { commentsFirestore } from "../../firebase/firebase.config";
import { updateCommentsAsync, updatePostAsync } from "../../redux/posts/posts.actions"
import { selectCurrentUser } from "../../redux/user/user.selectors"
import { selectPost, selectComments } from "../../redux/posts/posts.selectors"


function PostComment(props) {
    const [comment, setComment] = useState("");
    const [post, setPost] = useState(null)

    useEffect(() => {
        const { posts, updatePostAsync } = props;
        if(!posts){
            updatePostAsync();
        }else {
            let post = posts.filter(post => post.id === props.match.params.postId);
            setPost(post[0])
        }
    }, [props.posts])

    useEffect(() => {
        if(!post) return;
        props.updateCommentsAsync(post.id)
    }, [post])

    const handleChange = event => {
        setComment(event.target.value);
    }

    const handleSubmit = async (event, postId) => {
        event.preventDefault();

        const { displayName } = props.currentUser
        const dataToSend = {
            comment,
            displayName,
            postId
        }
        await commentsFirestore(dataToSend);

        setComment("");
    }


    return (
        <div className="col-md-7">
        {
            post && (
                <Post post={post} commentValue={false}>
                    <form className="comment-form-container" onSubmit={(event) => handleSubmit(event, props.location.state.post.id)}>
                        <div className="form-group my-3">
                            <textarea onChange={handleChange} name="content" value={comment} className="form-control" placeholder="Add A Comment..." rows="4" required></textarea>
                            <CustomButton type="submit" title="Comment" button="btn-comment" />
                        </div>
                    </form>

                    {
                        props.comments && props.comments.map(comment => (
                            <div key={comment.id} className="comments-data-container my-5">
                                <div className="top-post-head">
                                    <div className="top-left-head">
                                        <div className="post-img-container">
                                            <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC' alt="default "/>
                                        </div>
                                        <h5 className="display-4 user-name ml-2"> {comment.displayName} </h5>
                                    </div>
                                    <div className="top-right-head text-right">
                                        <p className="date"> {comment.date} </p>
                                        <p className="time"> {comment.time} </p>
                                    </div>
                                </div>
                                <p className="mt-2"> {comment.comment} </p>
                            </div>
                        ))
                    }
                </Post>
            )
        }
        </div>
    )
}

const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
    comments: selectComments,
    posts: selectPost
})

const mapDispatchToProps = dispatch => ({
    updateCommentsAsync: postId => dispatch(updateCommentsAsync(postId)),
    updatePostAsync: posts => dispatch(updatePostAsync(posts)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostComment))
import { createSelector } from "reselect";

const selectPosts = state => state.posts

export const selectHeartBoolean = createSelector(
    [selectPosts],
    posts => posts.heartBoolean
)

export const selectPost = createSelector(
    [selectPosts],
    posts => posts.posts
)

export const selectComments = createSelector(
    [selectPosts],
    posts => posts.comments
)

export const selectCurrentUserPosts = createSelector(
    [selectPosts],
    posts => posts.currentUserPosts
)
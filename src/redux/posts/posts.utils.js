export const updateHeartBoolean = (stateHeartBoolean, actionPayLoadHeartBoolean, userAuthId, postId) => {
    const existingItem = stateHeartBoolean.map(state => state.postId).includes(postId);
    if(existingItem){
        return [...stateHeartBoolean]
    }else{
        return [...stateHeartBoolean, { heartBoolean: actionPayLoadHeartBoolean, userAuthId, postId }]
    }
}
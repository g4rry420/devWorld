export const notification = (notificationState, payload) => {
    if(!payload) {
        return [...notificationState]
    }
    const existingItem = notificationState.map(state => state.uid || state.id).includes(payload.uid || payload.id);
    if(existingItem){
        return [...notificationState]
    }else{
        return [...notificationState, payload]
    }
}
import { createSelector } from "reselect";

const selectNotifications = state => state.notifications;

export const selectNotification = createSelector(
    [selectNotifications],
    notifications => notifications.notification
)
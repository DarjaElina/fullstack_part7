import { createSlice } from '@reduxjs/toolkit';

const userNotificationSlice = createSlice({
  name: 'userNotification',
  initialState: null,
  reducers: {
    setUserNotificationTo(state, action) {
      return action.payload;
    },
    clearUserNotification(state, action) {
      return null;
    },
  },
});

export const { setUserNotificationTo, clearUserNotification } =
  userNotificationSlice.actions;
export default userNotificationSlice.reducer;

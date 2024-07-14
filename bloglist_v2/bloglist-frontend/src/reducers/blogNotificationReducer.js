import { createSlice } from '@reduxjs/toolkit';

const blogNotificationSlice = createSlice({
  name: 'blogNotification',
  initialState: null,
  reducers: {
    setBlogNotificationTo(state, action) {
      return action.payload;
    },
    clearBlogNotification(state, action) {
      return null;
    },
  },
});

export const { setBlogNotificationTo, clearBlogNotification } =
  blogNotificationSlice.actions;
export default blogNotificationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const userActivitiesSlice = createSlice({
  name: 'userActivities',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = userActivitiesSlice.actions;
export default userActivitiesSlice.reducer;

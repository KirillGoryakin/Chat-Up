import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
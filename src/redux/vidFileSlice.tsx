import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  blobUrl: null,
};

const vidFileSlice = createSlice({
  name: "vidFile",
  initialState,
  reducers: {
    setBlobUrl(state, action) {
      state.blobUrl = action.payload;
    },
  },
});

export const { setBlobUrl } = vidFileSlice.actions;
export default vidFileSlice.reducer;

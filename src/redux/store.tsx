import { configureStore } from "@reduxjs/toolkit";
import vidFileReducer from "./vidFileSlice";
import RootState from "./reduxtypes";

const store = configureStore<RootState>({
  reducer: {
    vidFile: vidFileReducer,
  },
});

export default store;

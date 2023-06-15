import { configureStore } from "@reduxjs/toolkit";
import imageModalReducer from "./image-modal/imageModalSlice";

export const store = configureStore({
  reducer: {
    imageModal: imageModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

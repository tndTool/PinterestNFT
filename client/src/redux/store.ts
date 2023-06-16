import { configureStore } from "@reduxjs/toolkit";
import imageModalReducer from "./features/imageModalSlice";
import globalLoadingSlice from "./features/globalLoadingSlice";

export const store = configureStore({
  reducer: {
    imageModal: imageModalReducer,
    globalLoading: globalLoadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

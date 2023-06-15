import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ImageModalState {
  value: number | null;
  viewedTokenId: number | null;
}

const initialState: ImageModalState = {
  value: null,
  viewedTokenId: null,
};

export const imageModalSlice = createSlice({
  name: "imageModal",
  initialState,
  reducers: {
    setViewedTokenId: (state, action: PayloadAction<number>) => {
      state.viewedTokenId = action.payload;
    },
  },
});

export const { setViewedTokenId } = imageModalSlice.actions;

export default imageModalSlice.reducer;

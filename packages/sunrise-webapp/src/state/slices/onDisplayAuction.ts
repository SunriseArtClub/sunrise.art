import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnDisplayAuctionState {
  lastAuctionSunriseId: number | undefined;
  onDisplayAuctionSunriseId: number | undefined;
}

const initialState: OnDisplayAuctionState = {
  lastAuctionSunriseId: undefined,
  onDisplayAuctionSunriseId: undefined,
};

const onDisplayAuction = createSlice({
  name: 'onDisplayAuction',
  initialState: initialState,
  reducers: {
    setLastAuctionSunriseId: (state, action: PayloadAction<number>) => {
      state.lastAuctionSunriseId = action.payload;
    },
    setOnDisplayAuctionSunriseId: (state, action: PayloadAction<number>) => {
      state.onDisplayAuctionSunriseId = action.payload;
    },
    setPrevOnDisplayAuctionSunriseId: state => {
      if (state.onDisplayAuctionSunriseId === undefined) return;
      if (state.onDisplayAuctionSunriseId === 0) return;
      state.onDisplayAuctionSunriseId = state.onDisplayAuctionSunriseId - 1;
    },
    setNextOnDisplayAuctionSunriseId: state => {
      if (state.onDisplayAuctionSunriseId === undefined) return;
      if (state.lastAuctionSunriseId === state.onDisplayAuctionSunriseId) return;
      state.onDisplayAuctionSunriseId = state.onDisplayAuctionSunriseId + 1;
    },
  },
});

export const {
  setLastAuctionSunriseId,
  setOnDisplayAuctionSunriseId,
  setPrevOnDisplayAuctionSunriseId,
  setNextOnDisplayAuctionSunriseId,
} = onDisplayAuction.actions;

export default onDisplayAuction.reducer;
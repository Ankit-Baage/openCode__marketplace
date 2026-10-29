import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  orderId: null,
};

const cancellationSlice = createSlice({
  name: "cancellation",
  initialState,
  reducers: {
    openCancellationModal: (state, action) => {
      state.isOpen = true;
      state.orderId = action.payload.orderId;
    },
    closeCancellationModal: (state) => {
      state.isOpen = false;
      state.orderId = null;
    },
    setCancellation: (state, action) => {
      state.orderId = action.payload.orderId;
    },
  },
});

export const {
  openCancellationModal,
  closeCancellationModal,
  setCancellation,
} = cancellationSlice.actions;

export default cancellationSlice.reducer;

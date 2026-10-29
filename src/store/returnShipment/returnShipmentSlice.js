import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  shipment: null,
};

const returnShipmentSlice = createSlice({
  name: 'returnShipment',
  initialState,
  reducers: {
    openReturnShipmentModal: (state, action) => {
      state.isOpen = true;
      state.shipment = action.payload.shipment;
    },
    closeReturnShipmentModal: (state) => {
      state.isOpen = false;
      state.shipment = null;
    },
    setReturnShipment: (state, action) => {
      state.shipment = action.payload.shipment;
      state.order_id = action.payload.order_id; // 🟣 optional if you want to also update order_id
    },
  },
});

export const { openReturnShipmentModal, closeReturnShipmentModal, setReturnShipment } = returnShipmentSlice.actions;

export default returnShipmentSlice.reducer;

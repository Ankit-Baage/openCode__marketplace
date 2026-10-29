import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  searchTextModalIsOpen: false,
};

const searchTextSlice = createSlice({
  name: "searchText",
  initialState,
  reducers: {
    setSearchText(state, action) {
      state.searchText = action.payload.searchText;
    },
    setSearchTextModalIsOpen(state, action) {
      state.searchTextModalIsOpen = true;
    },
    closeSearchModal(state) {
      state.searchTextModalIsOpen = false;
      state.searchText = "";
    },
  },
});

export const { setSearchText, setSearchTextModalIsOpen, closeSearchModal } =
  searchTextSlice.actions;

export default searchTextSlice.reducer;

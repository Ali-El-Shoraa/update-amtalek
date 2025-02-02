import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
  type_id: [],
  // country: null,
};

const formSlice = createSlice({
  name: "formCareerMenu",
  initialState,
  reducers: {
    setFormMenuData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetFormMenuData: () => initialState,
  },
});

export const { setFormMenuData, resetFormMenuData } = formSlice.actions;
export default formSlice.reducer;

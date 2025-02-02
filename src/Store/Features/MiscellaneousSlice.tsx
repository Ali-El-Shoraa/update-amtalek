import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleDeletePopUp: false,
  DeletedItem: null,
  toggleEditPopUp: false,
  showVideoPopUp: false,
  toggleLogOutPopUp: false,
  VideoSrc: "",
  lang: "",
  subscribed: false,
  Payment: "visa",
  OwnCountry: {},
  History: false,
};

const MiscellaneousSlice = createSlice({
  name: "Miscellaneous",
  initialState,
  reducers: {
    setToggleDeletePopUp: (state, action) => {
      state.toggleDeletePopUp = action.payload;
    },
    setDeletedItem: (state, action) => {
      state.DeletedItem = action.payload;
    },
    setToggleEditPopUp: (state, action) => {
      state.toggleEditPopUp = action.payload;
    },

    setShowVideoPopUp: (state, action) => {
      state.showVideoPopUp = action.payload;
    },
    setToggleLogOutPopUp: (state, action) => {
      state.toggleLogOutPopUp = action.payload;
    },
    setVideoSrc: (state, action) => {
      state.VideoSrc = action.payload;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },

    setSubscribed: (state, action) => {
      state.subscribed = action.payload;
    },

    setPayment: (state, action) => {
      state.Payment = action.payload;
    },
    setOwnCountry: (state, action) => {
      state.OwnCountry = action.payload;
    },

    setHistory: (state, action): any => {
      state.History = action.payload;
    },
  },
});

export default MiscellaneousSlice.reducer;
export const {
  setToggleDeletePopUp,
  setDeletedItem,
  setToggleEditPopUp,
  setShowVideoPopUp,
  setToggleLogOutPopUp,
  setVideoSrc,
  setLang,
  setSubscribed,
  setPayment,
  setOwnCountry,
  setHistory,
} = MiscellaneousSlice.actions;
export const toggleDeletePopUp = (state: any) => state.Miscellaneous.toggleDeletePopUp;
export const DeletedItem = (state: any) => state.Miscellaneous.DeletedItem;
export const toggleEditPopUp = (state: any) => state.Miscellaneous.toggleEditPopUp;
export const showVideoPopUp = (state: any) => state.Miscellaneous.showVideoPopUp;
export const toggleLogOutPopUp = (state: any) => state.Miscellaneous.toggleLogOutPopUp;
export const VideoSrc = (state: any) => state.Miscellaneous.VideoSrc;
export const lang = (state: any) => state.Miscellaneous.lang;
export const subscribed = (state: any) => state.Miscellaneous.subscribed;
export const Payment = (state: any) => state.Miscellaneous.Payment;
export const OwnCountry = (state: any) => state.Miscellaneous.OwnCountry;
export const lastHistory = (state: any) => state.Miscellaneous.History;

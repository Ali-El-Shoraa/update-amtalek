import { configureStore } from "@reduxjs/toolkit";
import AuthenticationReducer from "./Features/AuthenticationSlice";
import MiscellaneousReducer from "./Features/MiscellaneousSlice";
// import formReducer from "@/allPages/SearchProperty/formSlice";
// import formSearch from "@/allPages/search/formSlice";
// import languageReducer from "./languageSlice";
// import loaderReducer from "./loaderSlice";
import FormCareersMenu from "./Features/sendDataFormCareersMenuToSearch";
// import fetchUserProfile from "./profileSlice";
export const Store = configureStore({
  reducer: {
    Authentication: AuthenticationReducer,
    Miscellaneous: MiscellaneousReducer,
    // form: formReducer,
    // formSearch: formSearch,
    // language: languageReducer,
    // loader: loaderReducer,
    formCareerMenu: FormCareersMenu,
    // profile: fetchUserProfile,
  },
});

export type AppDispatch = typeof Store.dispatch;

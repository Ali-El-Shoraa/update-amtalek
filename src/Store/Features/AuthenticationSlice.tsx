import { getUserProfileDataAction } from "@/lib/actions/user.data.actions";
import { TUser } from "@/Types/AppTypes";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// تعريف الدالة لجلب بيانات المستخدم

export const fetchUserProfile: any = createAsyncThunk<
  any,
  { token: string; language: string; userData: any }
>(
  "authorized/fetchUserProfile",
  async ({ token, language, userData }: any, { rejectWithValue }) => {
    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_URL_GET_DATA}web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${userData?.actor_type}/${userData?.id}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       lang: language,
      //     },
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error(`HTTP Error: ${response.status}`);
      // }
      const response = await getUserProfileDataAction();
      // const dataProfile = await response.json();
      const dataProfile = await response;
      // return dataProfile?.data;
      return dataProfile;
    } catch (error: any) {
      console.error("Fetch User Profile Error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

let initialState = {
  Authorized: null,
  userData: null,
  showLoginPopUp: false,
  showLoginOrSendDetailsPopUp: false,
  showSearchPropertyProject: false,
  showFormProjectOrientation: false,
  showSendCVWithLoginOrSendCVPopUp: false,
  registrationUserType: "",
  userProfileDataOut: {} as TUser | null,
  userProfileData: {} as TUser | null,
};

// إعداد حالة المستخدم من localStorage
if (typeof window !== "undefined") {
  const user = JSON.parse(localStorage.getItem("userData") as any);
  initialState = {
    ...initialState,
    Authorized: user?.token || null,
    userData: user || null,
  };
}

const AuthorizedSlice = createSlice({
  name: "Authorized",
  initialState,
  reducers: {
    setAuthorized: (state, action) => {
      state.Authorized = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserProfileData: (state, action) => {
      state.userProfileData = action.payload;
    },
    setShowLoginPopUp: (state, action) => {
      state.showLoginPopUp = action.payload;
    },
    setShowFormProjectOrientation: (state, action) => {
      state.showFormProjectOrientation = action.payload;
    },
    setShowSearchPropertyProject: (state, action) => {
      state.showSearchPropertyProject = action.payload;
    },
    setSendCVWithLoginOrSendCVPopUp: (state, action) => {
      state.showSendCVWithLoginOrSendCVPopUp = action.payload;
    },
    setShowLoginOrSendDetailsPopUp: (state, action) => {
      state.showLoginOrSendDetailsPopUp = action.payload;
    },
    setRegistrationUserType: (state, action) => {
      state.registrationUserType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfileDataOut = action.payload; // تحديث بيانات المستخدم
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        console.error("Failed to fetch user profile:", action.error);
      });
  },
});

export default AuthorizedSlice.reducer;

export const {
  setAuthorized,
  setUserData,
  setShowLoginPopUp,
  setShowFormProjectOrientation,
  setShowSearchPropertyProject,
  setShowLoginOrSendDetailsPopUp,
  setSendCVWithLoginOrSendCVPopUp,
  setRegistrationUserType,
  setUserProfileData,
} = AuthorizedSlice.actions;

// Selectors
export const Authorized = (state: any) => state.Authentication.Authorized;
export const userData = (state: any) => state.Authentication.userData;
export const showLoginPopUp = (state: any) =>
  state.Authentication.showLoginPopUp;
export const showSendCVWithLoginOrSendCVPopUp = (state: any) =>
  state.Authentication.showSendCVWithLoginOrSendCVPopUp;
export const showFormProjectOrientation = (state: any) =>
  state.Authentication.showFormProjectOrientation;
export const showSearchPropertyProject = (state: any) =>
  state.Authentication.showSearchPropertyProject;
export const showLoginOrSendDetailsPopUp = (state: any) =>
  state.Authentication.showLoginOrSendDetailsPopUp;
export const registrationUserType = (state: any) =>
  state.Authentication.registrationUserType;
export const userProfileDataOut = (state: any) =>
  state.Authentication.userProfileDataOut;
export const userProfileData = (state: any) =>
  state.Authentication.userProfileData;

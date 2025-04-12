import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const APIURL = "http://localhost:4000";

export const usersignup = createAsyncThunk(
  "auth/signup",
  async (userdata, { rejectedwithvlaue }) => {
    try {
      const response = await axios.post(`${APIURL}/user/signup`, userdata);
      return response.data;
    } catch (error) {
      return rejectedwithvlaue(error.response.data);
    }
  }
);

export const userlogin = createAsyncThunk(
  "auth/login",
  async (logindata, { rejectedwithvlaue }) => {
    try {
      const response = await axios.post(`${APIURL}/user/login`, logindata);
      return response.data;
    } catch (error) {
      return rejectedwithvlaue(error.response.data);
    }
  }
);

export const userlogout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectedwithvlaue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.reload();
      return null;
    } catch (error) {
      return rejectedwithvlaue(error.response.data);
    }
  }
);
export const forgotpassword = createAsyncThunk(
  "auth/forgotpassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/user/auth/sendotp`,
        { email }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const resetpassword = createAsyncThunk(
  "auth/otp",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${APIURL}/user/auth/resetpassword`,
        formdata
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// intial state
const initialState = {
  user: null,
  isauthenticated: false,
  status: "idle",
  error: null,
};

const authslice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersignup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(usersignup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isauthenticated = true;
        toast(action.payload.message)
      })
      .addCase(usersignup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast(action.payload.message)
      })
      .addCase(userlogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userlogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isauthenticated = true;
        toast(action.payload.message)
      })
      .addCase(userlogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        toast(action.payload.message)
      })
      .addCase(userlogout.fulfilled, (state) => {
        state.user = null;
        state.isauthenticated = false;
        state.status = "idle";
        toast(action.payload.message)
      })
      .addCase(forgotpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(forgotpassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; // OTP Sent message
        state.error = null;
        toast(action.payload.message)
      })
      .addCase(forgotpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message
        state.message = null;
        toast(action.payload.message)
      })
      .addCase(resetpassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(resetpassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; // OTP Sent message
        state.error = null;
        toast(action.payload.message)
      })
      .addCase(resetpassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message
        state.message = null;
        toast(action.payload.message)
      });
  },
});

export default authslice.reducer;

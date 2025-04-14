import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const APIURL = "http://localhost:4000";

export const placedorder = createAsyncThunk(
  "order/placeorder",
  async (orderdata, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return console.log("login first");
      const response = await axios.post(
        `${APIURL}/order/addtoorder`,
        orderdata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("order is placed i think", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getorder = createAsyncThunk(
  "order/getorder",
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return console.log("login first");
      const response = await axios.post(
        `${APIURL}/order/addtoorder`,
        orderdata,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("order is placed i think", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const initialState = {
  order: null,
  error: null,
};

const orderslice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placedorder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});

export default orderslice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const APIURL = "http://localhost:4000";
// const APIURL = "https://amart-wil3.onrender.com";

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
      const response = await axios.get(
        `${APIURL}/order/getorder`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("all your orders", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getallorders = createAsyncThunk("order/getallorders" , async(_,{rejectWithValue})=>{
  try {
    const response = await axios.get(`${APIURL}/order/getallorders`);
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const updateorder = createAsyncThunk("order/updateorder", async({orderId, newStatus},{rejectWithValue})=>{
  try {
    const response = await axios.put(`${APIURL}/order/updateorder/${orderId}`,{newStatus});
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
export const updatepayment = createAsyncThunk("order/updatepayment", async({orderId, newPaymentStatus},{rejectWithValue})=>{
  try {
    const response = await axios.put(`${APIURL}/order/updatepayment/${orderId}`,{newPaymentStatus});
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
const initialState = {
  order: null,
  error: null,
};

const orderslice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placedorder.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(getorder.fulfilled,(state,action)=>{
        state.order = action.payload
      })
      .addCase(getallorders.fulfilled,(state,action)=>{
        state.order = action.payload
      })
      .addCase(updateorder.fulfilled,(state,action)=>{
        state.order= action.payload
      })
      .addCase(updatepayment.fulfilled ,(state,action)=>{
        state.order = action.payload
      })
  },
});

export default orderslice.reducer;

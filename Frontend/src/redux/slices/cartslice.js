import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const APIURL = "http://localhost:4000";
export const addtocart = createAsyncThunk(
  "cart/addtocart",
  async (product, rejectWithValue) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return toast("plese login first");
      const response = await axios.post(`${APIURL}/cart/addtocart`, product, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // "Content-Type":"application/json"
        },
      });
      console.log("the response for addtocart redux", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getcart = createAsyncThunk(
  "cart/getcart",
  async (_, rejectWithValue) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return null;
      const response = await axios.get(`${APIURL}/cart/getcart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removecartitems = createAsyncThunk(
  "cart/removeitem" , async(id ,rejectWithValue)=>{
    const token  = localStorage.getItem('token')
      try {
        const response = await axios.delete(`${APIURL}/cart/removefromcart/${id}` , {
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          }
        })
        return response.data
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
  }
)

export const decreseqty = createAsyncThunk(
  "cart/decreseqty" , async(id ,rejectWithValue)=>{
    const token  = localStorage.getItem('token')
    try {
      const response = await axios.delete(`${APIURL}/cart/decreseqty/${id}` , {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const cartslice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addtocart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
        toast("item added to cart successfullly");
      })
      .addCase(addtocart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getcart.pending , (state)=>{
        state.loading = true;
      })
      .addCase(getcart.fulfilled , (state ,action)=>{
        state.loading = false;
        state.cart.push(action.payload);
      })
      .addCase(getcart.rejected ,(state,action)=>{
        state.loading = false;
        toast("login first")
      })
      .addCase(removecartitems.fulfilled,(state,action)=>{
        state.loading = false;
        toast(action.payload.message)
      })
      .addCase(decreseqty.fulfilled , (state,action)=>{
        state.loading = false;
        toast(action.payload.message)
      })
  },
});

export default cartslice.reducer;

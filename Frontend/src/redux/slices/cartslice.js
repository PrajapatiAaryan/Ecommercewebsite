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
    // console.log("the getcart function is called")
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

export const clearcart =createAsyncThunk(
  "cart/clearcart",
  async (_, rejectWithValue) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return res.json({message:"plese login first"});
      const response = await axios.delete(`${APIURL}/cart/clearcart`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          // "Content-Type":"application/json"
        },
      });
      console.log("the response for clearcart redux", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const increseqty = createAsyncThunk(
  "cart/increseqty" , async(id ,rejectWithValue)=>{
    const token  = localStorage.getItem('token')
    console.log("this is increse qty token" , token)
    try {
      const response = await axios.put(`${APIURL}/cart/increseqty/${id}` , {
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
        state.cart = [action.payload]; // ✅ Replace the cart completely
      })      
      .addCase(addtocart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getcart.pending , (state)=>{
        state.loading = true;
      })
      .addCase(getcart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = [action.payload]; // ✅ Replace the cart completely
      })
      .addCase(getcart.rejected ,(state,action)=>{
        state.loading = false;
        // toast("login first")
      })
      .addCase(removecartitems.fulfilled,(state,action)=>{
        state.loading = false;
        toast(action.payload.message)
      })
      .addCase(decreseqty.fulfilled , (state,action)=>{
        state.loading = false;
        toast(action.payload.message)
      })
      .addCase(increseqty.fulfilled , (state,action)=>{
        state.loading = false;
        toast(action.payload.message)
      })
      .addCase(clearcart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = []; // Clear cart in Redux state
      })
      
      
  },
});

export default cartslice.reducer;

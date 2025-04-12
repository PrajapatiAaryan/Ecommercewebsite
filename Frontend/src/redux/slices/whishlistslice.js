import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const APIURL = "http://localhost:4000";

export const addtowhishlist = createAsyncThunk(
  "/whishlist/addtowhishlist",
  async (whishlist, rejectWithValue) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return toast("plese login first");
      const response = await axios.post(
        `${APIURL}/whishlist/addtowhihslist`,
        whishlist,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            // "Content-Type":"application/json"
          },
        }
      );
      console.log("the response for addtocart redux", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getwhishlist = createAsyncThunk(
  "whishlist/getwhishlist",
  async (_, rejectWithValue) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return null;
      const response = await axios.get(`${APIURL}/whishlist/getwhishlist`, {
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

export const removefromwhishlist = createAsyncThunk(
  "whishlist/removefromwhishlist" , async(id ,rejectWithValue)=>{
    const token  = localStorage.getItem('token')
      try {
        const response = await axios.delete(`${APIURL}/whishlist/removewhishlist/${id}` , {
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

const whishlistslice = createSlice({
  name: "whishlist",
  initialState: {
    whishlist: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addtowhishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addtowhishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.whishlist.push(action.payload);
      })
      .addCase(addtowhishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getwhishlist.pending , (state)=>{
        state.loading = true;
      })
      .addCase(getwhishlist.fulfilled , (state ,action)=>{
        state.loading = false;
        state.whishlist.push(action.payload);
      })
      .addCase(getwhishlist.rejected ,(state,action)=>{
        state.loading = false;
      })
      .addCase(removefromwhishlist.fulfilled,(state,action)=>{
        state.loading = false;
      })
      
  },
});

export default whishlistslice.reducer;
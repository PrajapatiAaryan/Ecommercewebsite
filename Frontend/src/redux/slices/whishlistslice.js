import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify"; // Optional but better than `alert`

const APIURL = "http://localhost:4000";
// const APIURL = "https://amart-wil3.onrender.com";

// ✅ Add to Wishlist
export const addtowhishlist = createAsyncThunk(
  "/whishlist/addtowhishlist",
  async (whishlist, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return rejectWithValue("Not logged in");
      }

      const response = await axios.post(
        `${APIURL}/whishlist/addtowhihslist`,
        whishlist,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item added to wishlist");
      return response.data;
    } catch (error) {
      toast.error("Failed to add to wishlist");
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Get Wishlist
export const getwhishlist = createAsyncThunk(
  "whishlist/getwhishlist",
  async (_, { rejectWithValue }) => {
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

// ✅ Remove from Wishlist
export const removefromwhishlist = createAsyncThunk(
  "whishlist/removefromwhishlist",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${APIURL}/whishlist/removewhishlist/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Item removed from wishlist");
      return id; // ✅ return ID to filter out
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      return rejectWithValue(error.response.data);
    }
  }
);

// ✅ Slice
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
        state.whishlist.push(action.payload); // Assuming API returns one item
      })
      .addCase(addtowhishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getwhishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getwhishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.whishlist = action.payload.whishlist; // ✅ Replace with full list
      })
      .addCase(getwhishlist.rejected, (state) => {
        state.loading = false;
      })

      .addCase(removefromwhishlist.fulfilled, (state, action) => {
        // Remove the item locally in the Redux state immediately
        const id = action.meta.arg;
        state.whishlist.items = state.whishlist.items.filter(
          (item) => item.productid._id !== id
        );
      })
  },
});

export default whishlistslice.reducer;

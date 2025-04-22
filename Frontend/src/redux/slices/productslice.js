import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiurl = "https://amart-wil3.onrender.com"
// const apiurl = "http://localhost:4000"


// Async thunk for adding a product
export const addProduct = createAsyncThunk("product/addProduct", async (formData) => {
  const productData = new FormData();
  Object.keys(formData).forEach((key) => {
    if (Array.isArray(formData[key])) {
      formData[key].forEach((item) => productData.append(key, item));
    } else {
      productData.append(key, formData[key]);
    }
  });

  const response = await axios.post(`${apiurl}/product/addproduct`, productData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
});

//  Async thunk for fetching products
export const getProducts = createAsyncThunk("product/getProducts", async () => {
  const response = await axios.get(`${apiurl}/product/getproduct`);
  console.log(response , "from redux get products")
  return response.data.products; // Ensure your backend response structure matches this
});

export const getdetailproduct = createAsyncThunk("product/detailproduct" , async()=>{
  const id = localStorage.getItem("id")
  if(!id)return null
  const response = await axios.get(`${apiurl}/product/detailproduct/${id}`)
  // console.log("this is from redux product slice",response.data.product)
  return response.data.product
})

export const deleteproduct = createAsyncThunk(
  'product/deleteproduct',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiurl}/product/deleteproduct/${id}`);
      return id; // Return only the ID of the deleted product
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    detailproduct:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // addproduct cases
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // getproducts cases
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Replace existing products
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      // get detailed product 
      .addCase(getdetailproduct.fulfilled,(state ,action)=>{
        state.loading =false;
        state.detailproduct = action.payload
      })

      // delete product
      .addCase(deleteproduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter((product) => product._id !== action.payload);
      })
  },
});

export default productSlice.reducer;

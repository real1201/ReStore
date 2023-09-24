import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/model/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

export const productAdaptor = createEntityAdapter<Product>();

//create thunk redux for fetching all product
export const fetchProductsAsync = createAsyncThunk<Product[]>(
  "product/fetchProductsAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

//create thunk redux for fetching individual product
export const fetchProductAsync = createAsyncThunk<Product, string>(
  "product/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdaptor.getInitialState({
    productLoaded: false,
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    //fetching all product
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pending-fetchAll";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      productAdaptor.setAll(state, action.payload);
      state.status = "idle";
      state.productLoaded = true;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });

    //fetching individual product
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pending-fetchOne";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productAdaptor.upsertOne(state, action.payload);
      state.status = "idle";
      state.productLoaded = true;
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
  },
});

export const productSelector = productAdaptor.getSelectors(
  (state: RootState) => state.catalog
);

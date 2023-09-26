import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/model/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/model/pagination";

interface CatalogState {
  productLoaded: boolean;
  filterLoaded: boolean;
  status: string;
  brands: string[];
  types: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

export const productAdaptor = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("pageSize", productParams.pageSize.toString());
  params.append("orderBy", productParams.orderBy.toString());
  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm.toString());
  if (productParams.brands?.length > 0)
    params.append("brands", productParams.brands.toString());
  if (productParams.types?.length > 0)
    params.append("types", productParams.types.toString());

  return params;
}

//create thunk redux for fetching all product
export const fetchProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("product/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
  try {
    const response = await agent.Catalog.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});

export const fetchProductFiltersAsync = createAsyncThunk(
  "fetch/fetch ProductFiltersAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
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

function initParams() {
  return {
    pageNumber: 1,
    pageSize: 1,
    orderBy: "name",
    brands: [],
    types: [],
  };
}

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productAdaptor.getInitialState<CatalogState>({
    productLoaded: false,
    filterLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers: (builder) => {
    //fetching all product
    builder.addCase(fetchProductsAsync.pending, (state) => {
      state.status = "pending-fetchAll";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.productLoaded = true;
      productAdaptor.setAll(state, action.payload);
      state.status = "idle";
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
      state.productLoaded = true;
      productAdaptor.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      console.log(action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductFiltersAsync.pending, (state) => {
      state.status = "pending-filters";
    });
    builder.addCase(fetchProductFiltersAsync.fulfilled, (state, action) => {
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.filterLoaded = true;
    });
    builder.addCase(fetchProductFiltersAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
  },
});

export const productSelector = productAdaptor.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = catalogSlice.actions;

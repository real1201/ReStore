import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/model/basket";
import agent from "../../app/api/agent";

interface BasketState {
  basket: Basket | null;
  status: string;
}

const initialState: BasketState = {
  basket: null,
  status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
  Basket,
  { productId: string; quantity?: number }
>(
  "basket/addBasketItemAsync",
  async ({ productId, quantity = 1 }, thunkAPI) => {
    try {
      return await agent.Basket.addItem(productId, quantity);
    } catch (err: any) {
      return thunkAPI.rejectWithValue({ error: err.data });
    }
  }
);

export const removeBasketItemAsync = createAsyncThunk<
  void,
  { productId: string; quantity: number; name?: string }
>("basket/removeItemAsync", async ({ productId, quantity }, thunkAPI) => {
  try {
    await agent.Basket.removeItem(productId, quantity);
  } catch (err: any) {
    return thunkAPI.rejectWithValue({ error: err.data });
  }
});

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    // removeItem: (state, action) => {},
  },
  extraReducers: (builder) => {
    //adding product to basket or cart
    builder.addCase(addBasketItemAsync.pending, (state, action) => {
      state.status = "pending-add" + action.meta.arg.productId;
    });
    builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
      state.basket = action.payload;
      state.status = "idle";
    });
    builder.addCase(addBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });

    // removing item from basket or cart
    builder.addCase(removeBasketItemAsync.pending, (state, action) => {
      state.status =
        "pending-remove" + action.meta.arg.productId + action.meta.arg.name;
    });
    builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
      const { productId, quantity } = action.meta.arg;
      const itemIndex = state.basket?.basketItems.findIndex(
        (i) => i.productId === productId
      );
      if (itemIndex === -1 || itemIndex === undefined) return;
      state.basket!.basketItems[itemIndex].quantity -= quantity;
      if (state.basket!.basketItems[itemIndex].quantity === 0) {
        state.basket?.basketItems.splice(itemIndex, 1);
      }
      state.status = "idle";
    });
    builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
      state.status = "idle";
      console.log(action.payload);
    });
  },
});

export const { setBasket } = basketSlice.actions;

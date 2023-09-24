// import { createStore } from "redux";
// import { CounterReducer } from "../../features/contact/conterReducer";
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";
import { catalogSlice } from "../../features/catalog/catalogSlice";

//ordinary redux
// export function ConfigureStore() {
//   return createStore(CounterReducer);
// }

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispacth = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispacth>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

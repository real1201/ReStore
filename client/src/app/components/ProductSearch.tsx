import { Paper, TextField, Typography, debounce } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { useState } from "react";
import { setProductParams } from "../../features/catalog/catalogSlice";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <Paper sx={{ mb: 2, padding: 1 }}>
      <Typography variant="h6" paddingBottom="2px">
        Search Product
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm || ""}
        onChange={(event: any) => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
      />
    </Paper>
  );
}

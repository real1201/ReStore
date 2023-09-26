import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
  fetchProductFiltersAsync,
  fetchProductsAsync,
  productSelector,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import { Grid, Paper } from "@mui/material";

import ProductSearch from "../../app/components/ProductSearch";
import ProductFilter from "../../app/components/ProductFilter";
import Paginations from "../../app/components/ProductPagination";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";

const sortOptions = [
  { id: 1, value: "name", label: "Alphabetical" },
  { id: 2, value: "priceDesc", label: "Price - High to Low" },
  { id: 3, value: "price", label: "Price - Low to High" },
];

const Catalog = () => {
  const products = useAppSelector(productSelector.selectAll);
  const {
    productLoaded,
    status,
    filterLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  useEffect(() => {
    if (!filterLoaded) dispatch(fetchProductFiltersAsync());
  }, [dispatch, filterLoaded]);

  if (!filterLoaded) return <Loading message="Fetching products..." />;

  return (
    <>
      <Grid container columnSpacing={4}>
        <Grid item xs={3}>
          <ProductSearch />
          <Paper sx={{ mb: 2, padding: 2 }}>
            <RadioButtonGroup
              params={sortOptions}
              title="Price"
              selectedValue={productParams.orderBy}
              onchange={(e) =>
                dispatch(setProductParams({ orderBy: e.target.value }))
              }
            />
          </Paper>
          <ProductFilter
            title="Select Brand"
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
          <ProductFilter
            title="Select Type"
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setPageNumber({ types: items }))
            }
          />
        </Grid>
        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3} />
        <Grid item xs={9} paddingBottom={2}>
          {metaData && (
            <Paginations
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setPageNumber({ pageNumber: page }))
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Catalog;

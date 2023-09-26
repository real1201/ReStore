import { Grid } from "@mui/material";
import { Product } from "../../app/model/product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
  products: Product[];
}

function ProductList({ products }: Props) {
  const { productLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.length > 0 &&
        products.map((product) => (
          <Grid item xs={4} key={product.id}>
            {!productLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product} />
            )}
          </Grid>
        ))}
    </Grid>
  );
}

export default ProductList;

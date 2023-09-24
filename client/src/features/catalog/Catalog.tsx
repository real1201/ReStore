import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchProductsAsync, productSelector } from "./catalogSlice";

const Catalog = () => {
  const products = useAppSelector(productSelector.selectAll);
  const { productLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productLoaded) dispatch(fetchProductsAsync());
  }, [productLoaded, dispatch]);

  return (
    <>
      {status === "pending-fetchAll" ? (
        <Loading message="Fetching all products.." />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
};

export default Catalog;

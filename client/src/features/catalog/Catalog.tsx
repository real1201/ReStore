import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { Product } from "../../app/model/product";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch("http://localhost:5000/api/products")
    //   .then((res) => res.json())
    //   .then((data) => setProducts(data))
    //   .catch((err) => console.log(err));
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading message="Fetching all products.." />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
};

export default Catalog;

import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../../app/layout/App";
import HomePage from "../home/HomePage";
import Catalog from "../catalog/Catalog";
import ProductDetail from "../catalog/ProductDetail";
import AboutPage from "../about/AboutPage";
import ContactPage from "../contact/ContactPage";
import ServerError from "../../app/error/ServerError";
import NotFound from "../../app/error/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetail /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);

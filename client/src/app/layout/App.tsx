import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "../utils/util";
import agent from "../api/agent";
import Loading from "./Loading";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

const App = () => {
  // const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const paletteType = darkMode ? "dark" : "light";
  var theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleModeChange() {
    setDarkMode(!darkMode);
  }

  if (isLoading) return <Loading message="Initializing app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="top-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleChange={handleModeChange} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default App;

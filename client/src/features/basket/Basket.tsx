import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/utils/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";

export default function Baskets() {
  // const { basket, setBasket, removeItem } = useStoreContext();
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  // const handleRemoveItem = (productId: string, quantity = 1, name: string) => {
  //   setStatus({ loading: true, name });
  //   agent.Basket.removeItem(productId, quantity)
  //     .then(() => dispatch(removeItem({ productId, quantity })))
  //     .catch((err) => console.log(err))
  //     .finally(() => setStatus({ loading: false, name: "" }));
  // };

  // const handleAddItem = (productId: string, name: string) => {
  //   setStatus({ loading: true, name });
  //   agent.Basket.addItem(productId)
  //     .then((basket) => dispatch(setBasket(basket)))
  //     .catch((err) => console.log(err))
  //     .finally(() => setStatus({ loading: false, name: "" }));
  // };

  if (!basket) return <Typography variant="h3">Your are not login.</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Subtotal</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.basketItems.length > 0 ? (
              basket.basketItems.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="item">
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        style={{ height: 40, marginRight: 15 }}
                      />
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    {currencyFormat(item.price)}
                  </TableCell>
                  <TableCell align="center">
                    <LoadingButton
                      color="error"
                      loading={
                        status === "pending-remove" + item.productId + "rem"
                      }
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          })
                        )
                      }
                    >
                      <Remove sx={{ fontSize: "15px" }} />
                    </LoadingButton>

                    <span style={{ padding: "0 3px 0 3px" }}>
                      {item.quantity}
                    </span>

                    <LoadingButton
                      color="error"
                      loading={status === "pending-add" + item.productId}
                      onClick={() =>
                        dispatch(
                          addBasketItemAsync({ productId: item.productId })
                        )
                      }
                    >
                      <Add sx={{ fontSize: "15px" }} />
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="center">
                    ${((item.price / 100) * item.quantity).toFixed(2)}
                  </TableCell>

                  <TableCell align="center">
                    <LoadingButton
                      color="error"
                      loading={
                        status === "pending-remove" + item.productId + "del"
                      }
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: item.quantity,
                            name: "del",
                          })
                        )
                      }
                    >
                      <Delete />
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}>
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Your basket is empty.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Check out
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

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
import { useStoreContext } from "../../app/context/StoreContext";
import { Add, Delete, Remove } from "@mui/icons-material";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/utils/util";
import { Link } from "react-router-dom";

export default function Baskets() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  const handleRemoveItem = (productId: string, quantity = 1, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

  const handleAddItem = (productId: string, name: string) => {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((err) => console.log(err))
      .finally(() => setStatus({ loading: false, name: "" }));
  };

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
                        status.loading && status.name === "rem" + item.productId
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          1,
                          (status.name = "rem" + item.productId)
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
                      loading={
                        status.loading && status.name === "add" + item.productId
                      }
                      onClick={() =>
                        handleAddItem(
                          item.productId,
                          (status.name = "add" + item.productId)
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
                        status.loading && status.name === "del" + item.productId
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          item.quantity,
                          (status.name = "del" + item.productId)
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

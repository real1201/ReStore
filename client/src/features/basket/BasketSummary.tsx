import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
  // const { basket } = useStoreContext();
  const { basket } = useAppSelector((state) => state.basket);

  const subtotal =
    basket?.basketItems.reduce(
      (sum, item) =>
        sum + (parseInt(item.price.toFixed(2)) / 100) * item.quantity,
      0
    ) ?? 0;

  let deliveryFee = 0;
  if (basket?.basketItems != null)
    deliveryFee =
      subtotal >= 100 ? 0 : subtotal! > 0 && subtotal! < 100 ? 5 : 0;

  const total = subtotal + deliveryFee;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }}>
                $
                {subtotal?.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right" sx={{ fontSize: "20px" }}>
                $
                {deliveryFee.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: "30px", fontWeight: "bold" }}
              >
                $ {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

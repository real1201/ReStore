import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Container
      component={Paper}
      sx={{
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography gutterBottom variant="h3">
        Oops - We could not find what you are looking for.
      </Typography>
      <Divider />
      <Button fullWidth component={Link} to="/catalog">
        Back to the Home
      </Button>
    </Container>
  );
}

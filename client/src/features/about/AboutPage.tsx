import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import agent from "../../app/api/agent";
import { useState } from "react";

export default function AboutPage() {
  const [validatinError, setValidationError] = useState<string[]>([]);

  const ValidationError = () => {
    agent.TestErrors.getValidationError()
      .then(() => console.log("Should not see this message"))
      .catch((err) => setValidationError(err));
  };

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get400Error().catch((err) => console.log(err))
          }
        >
          400 Error
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get404Error().catch((err) => console.log(err))
          }
        >
          404 Error
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get401Error().catch((err) => console.log(err))
          }
        >
          401 Error
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            agent.TestErrors.get500Error().catch((err) => console.log(err))
          }
        >
          500 Error
        </Button>

        <Button variant="contained" onClick={ValidationError}>
          Validation Error
        </Button>
      </ButtonGroup>
      {validatinError.length > 0 && (
        <Alert severity="error">
          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validatinError.map((err) => (
              <ListItem key={err}>
                <ListItemText>{err}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      )}
    </Container>
  );
}

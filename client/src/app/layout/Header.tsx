import { RadarTwoTone } from "@mui/icons-material";
import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  darkMode: boolean;
  handleChange: () => void;
}

export default function Header({ darkMode, handleChange }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 3 }}>
      <Toolbar>
        <Typography variant="h6">RE-STORE</Typography>
        <Switch checked={darkMode} onChange={handleChange} />
      </Toolbar>
    </AppBar>
  );
}

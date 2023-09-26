import { Divider, Paper, Typography } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

interface Props {
  title?: string;
  items: string[];
  checked?: string[];
  onChange: (items: string[]) => void;
}

export default function ProductFilter({
  title,
  items,
  checked,
  onChange,
}: Props) {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);
    let newChecked: string[] = [];
    if (currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked.filter((item) => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
  }

  return (
    <Paper sx={{ mb: 2, padding: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {title != null ? <Divider /> : null}
      <FormGroup sx={{ padding: 2 }}>
        {items.map((item) => (
          <FormControlLabel
            key={item}
            control={
              <Checkbox
                checked={checkedItems.indexOf(item) !== -1}
                onClick={() => handleChecked(item)}
              />
            }
            label={item}
          />
        ))}
      </FormGroup>
    </Paper>
  );
}

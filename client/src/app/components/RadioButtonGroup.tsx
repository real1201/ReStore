import {
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";

type Params = {
  id: number;
  value: string;
  label: string;
};
interface Props {
  params: Params[];
  title?: string;
  onchange: (e: any) => void;

  selectedValue: string;
}

export default function RadioButtonGroup({
  params,
  title,
  selectedValue,
  onchange,
}: Props) {
  return (
    <FormControl component="fieldset" sx={{ padding: 2 }}>
      <Typography variant="h6">{title}</Typography>
      {title != null ? <Divider /> : null}
      <RadioGroup onChange={onchange} value={selectedValue}>
        {params.map(({ id, value, label }) => (
          <FormControlLabel
            key={id}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

import { FormField } from "../../store/schema";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

export default function FieldRenderer({ field }: { field: FormField }) {
  switch (field.type) {
    case "short_text":
      return <TextField fullWidth label={field.label} />;

    case "long_text":
      return <TextField fullWidth multiline rows={3} label={field.label} />;

    case "number":
      return <TextField fullWidth type="number" label={field.label} />;

    case "dropdown":
      return (
        <TextField select fullWidth label={field.label} SelectProps={{ native: true }}>
          {field.options?.map((opt) => (
            <option key={opt.id}>{opt.label}</option>
          ))}
        </TextField>
      );

    case "checkbox":
      return (
        <>
          <p>{field.label}</p>
          {field.options?.map((opt) => (
            <FormControlLabel key={opt.id} control={<Checkbox />} label={opt.label} />
          ))}
        </>
      );

    case "likert":
      return (
        <>
          <p>{field.label}</p>
          <RadioGroup row={field.orientation === "horizontal"}>
            {field.options?.map((opt) => (
              <FormControlLabel key={opt.id} value={opt.label} control={<Radio />} label={opt.label} />
            ))}
          </RadioGroup>
        </>
      );

    default:
      return null;
  }
}

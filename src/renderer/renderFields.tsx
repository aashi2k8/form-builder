import { Controller } from "react-hook-form";
import { FormField } from "../builder/store/schema";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@mui/material";

export function renderField(field: FormField, control: any) {
  switch (field.type) {
    case "short_text":
      return (
        <Controller
          name={field.id}
          control={control}
          render={({ field: f }) => (
            <TextField {...f} label={field.label} fullWidth />
          )}
        />
      );

    case "long_text":
      return (
        <Controller
          name={field.id}
          control={control}
          render={({ field: f }) => (
            <TextField {...f} label={field.label} fullWidth multiline rows={3} />
          )}
        />
      );

    case "number":
      return (
        <Controller
          name={field.id}
          control={control}
          render={({ field: f }) => (
            <TextField {...f} type="number" label={field.label} fullWidth />
          )}
        />
      );

    case "dropdown":
      return (
        <Controller
          name={field.id}
          control={control}
          render={({ field: f }) => (
            <TextField {...f} select fullWidth label={field.label} SelectProps={{ native: true }}>
              {field.options?.map((opt) => (
                <option key={opt.id}>{opt.label}</option>
              ))}
            </TextField>
          )}
        />
      );

    case "checkbox":
      return (
        <>
          <p>{field.label}</p>
          {field.options?.map((opt) => (
            <Controller
              key={opt.id}
              name={`${field.id}-${opt.id}`}
              control={control}
              render={({ field: f }) => (
                <FormControlLabel
                  label={opt.label}
                  control={<Checkbox {...f} checked={!!f.value} />}
                />
              )}
            />
          ))}
        </>
      );

    case "likert":
      return (
        <>
          <p>{field.label}</p>
          <Controller
            name={field.id}
            control={control}
            render={({ field: f }) => (
              <RadioGroup
                {...f}
                row={field.orientation === "horizontal"}
              >
                {field.options?.map((opt) => (
                  <FormControlLabel
                    key={opt.id}
                    value={opt.label}
                    control={<Radio />}
                    label={opt.label}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </>
      );

    default:
      return null;
  }
}

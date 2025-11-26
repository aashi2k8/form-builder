import { useForm } from "react-hook-form";
import { FormField } from "../builder/store/schema";
import { Box, Button } from "@mui/material";
import { renderField } from "./renderFields";

export default function DynamicFormRenderer({ schema }: { schema: FormField[] }) {
  const { handleSubmit, control } = useForm();

  const submit = (v: any) => console.log(v);

  return (
    <Box maxWidth={600}>
      <form onSubmit={handleSubmit(submit)}>
        {schema.map((f) => (
          <Box key={f.id} mb={3}>
            {renderField(f, control)}
          </Box>
        ))}

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
}

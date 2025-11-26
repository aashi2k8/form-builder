import { Box, Button } from "@mui/material";
import { useFormBuilder } from "../builder/store/FormBuilderContext";
import DynamicFormRenderer from "../renderer/DynamicFormRenderer";

export default function PreviewPage({ onBack }: { onBack: () => void }) {
  const { state } = useFormBuilder();

  return (
    <Box p={4}>
      <Button variant="outlined" onClick={onBack} sx={{ mb: 2 }}>
        Back
      </Button>

      <DynamicFormRenderer schema={state.fields} />
    </Box>
  );
}

import { Box, Button } from "@mui/material";
import ComponentPalette from "./ComponentPalette";
import FormCanvas from "./FormCanvas";
import RightInspector from "./RightInspector";

export default function BuilderPage({ onPreview }: { onPreview: () => void }) {
  return (
    <Box display="flex" height="100vh">
      <ComponentPalette />
      <FormCanvas />
      <RightInspector />

      <Button
        variant="contained"
        onClick={onPreview}
        sx={{ position: "fixed", bottom: 24, right: 24 }}
      >
        Preview Form
      </Button>
    </Box>
  );
}

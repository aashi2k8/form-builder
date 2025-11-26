import { Box, List, ListItemButton, Typography } from "@mui/material";
import { useFormBuilder } from "./store/FormBuilderContext";
import { FieldType } from "./store/schema";

const paletteItems = [
  { type: "short_text", label: "Short Text" },
  { type: "long_text", label: "Long Text" },
  { type: "number", label: "Number" },
  { type: "dropdown", label: "Dropdown" },
  { type: "checkbox", label: "Checkboxes" },
  { type: "likert", label: "Likert Scale" },
];

export default function ComponentPalette() {
  const { dispatch } = useFormBuilder();

  return (
    <Box width={260} p={2} borderRight="1px solid #ddd">
      <Typography variant="h6" mb={2}>Components</Typography>

      <List>
        {paletteItems.map((item) => (
          <ListItemButton
            key={item.type}
            onClick={() =>
              dispatch({ type: "ADD_FIELD", fieldType: item.type as FieldType })
            }
          >
            {item.label}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

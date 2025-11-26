import {
  Box,
  TextField,
  Typography,
  Button,
  Switch,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormBuilder } from "./store/FormBuilderContext";

export default function RightInspector() {
  const { state, dispatch } = useFormBuilder();
  const field = state.fields.find((f) => f.id === state.selectedFieldId);

  if (!field)
    return (
      <Box width={300} p={2} borderLeft="1px solid #ddd">
        <Typography>Select a field</Typography>
      </Box>
    );

  return (
    <Box width={300} p={2} borderLeft="1px solid #ddd">
      <Typography variant="h6">Field Settings</Typography>

      <TextField
        label="Label"
        fullWidth
        value={field.label}
        sx={{ mt: 2 }}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            id: field.id,
            patch: { label: e.target.value },
          })
        }
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={2}
        sx={{ mt: 2 }}
        value={field.description}
        onChange={(e) =>
          dispatch({
            type: "UPDATE_FIELD",
            id: field.id,
            patch: { description: e.target.value },
          })
        }
      />

      {"placeholder" in field && (
        <TextField
          label="Placeholder"
          fullWidth
          sx={{ mt: 2 }}
          value={field.placeholder}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              id: field.id,
              patch: { placeholder: e.target.value },
            })
          }
        />
      )}

      {"options" in field && (
        <>
          <Typography sx={{ mt: 3 }}>Options</Typography>

          {field.options!.map((opt, i) => (
            <Box key={opt.id} display="flex" alignItems="center" mt={1}>
              <TextField
                fullWidth
                value={opt.label}
                onChange={(e) => {
                  const newOpts = [...field.options!];
                  newOpts[i] = { ...opt, label: e.target.value };
                  dispatch({
                    type: "UPDATE_FIELD",
                    id: field.id,
                    patch: { options: newOpts },
                  });
                }}
              />
              <IconButton
                onClick={() =>
                  dispatch({
                    type: "UPDATE_FIELD",
                    id: field.id,
                    patch: {
                      options: field.options!.filter((o) => o.id !== opt.id),
                    },
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() =>
              dispatch({
                type: "UPDATE_FIELD",
                id: field.id,
                patch: {
                  options: [
                    ...field.options!,
                    { id: crypto.randomUUID(), label: "New Option" },
                  ],
                },
              })
            }
          >
            Add Option
          </Button>
        </>
      )}

      {field.type === "likert" && (
        <>
          <Typography sx={{ mt: 3 }}>Orientation</Typography>
          <Button
            variant={field.orientation === "horizontal" ? "contained" : "outlined"}
            sx={{ mr: 1 }}
            onClick={() =>
              dispatch({
                type: "UPDATE_FIELD",
                id: field.id,
                patch: { orientation: "horizontal" },
              })
            }
          >
            Horizontal
          </Button>
          <Button
            variant={field.orientation === "vertical" ? "contained" : "outlined"}
            onClick={() =>
              dispatch({
                type: "UPDATE_FIELD",
                id: field.id,
                patch: { orientation: "vertical" },
              })
            }
          >
            Vertical
          </Button>
        </>
      )}

      <Box mt={3} display="flex" alignItems="center">
        <Typography flex={1}>Required</Typography>
        <Switch
          checked={field.required}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_FIELD",
              id: field.id,
              patch: { required: e.target.checked },
            })
          }
        />
      </Box>

      <Button
        variant="outlined"
        color="error"
        sx={{ mt: 3 }}
        startIcon={<DeleteIcon />}
        onClick={() =>
          dispatch({
            type: "REMOVE_FIELD",
            id: field.id,
          })
        }
      >
        Delete Field
      </Button>
    </Box>
  );
}

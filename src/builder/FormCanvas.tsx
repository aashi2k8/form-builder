import { Box, Paper, Typography } from "@mui/material";
import { DndContext, PointerSensor, useSensor, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableField from "./dnd/DraggableField";
import { useFormBuilder } from "./store/FormBuilderContext";

export default function FormCanvas() {
  const { state, dispatch } = useFormBuilder();
  const { fields } = state;

  const sensor = useSensor(PointerSensor);

  return (
    <Box flex={1} p={2}>
      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>Scoring</Typography>

        <DndContext
          sensors={[sensor]}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (!over || active.id === over.id) return;

            const from = fields.findIndex((f) => f.id === active.id);
            const to = fields.findIndex((f) => f.id === over.id);

            dispatch({ type: "REORDER_FIELDS", from, to });
          }}
        >
          <SortableContext
            items={fields.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field) => (
              <DraggableField key={field.id} field={field} />
            ))}
          </SortableContext>
        </DndContext>
      </Paper>
    </Box>
  );
}

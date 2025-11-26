import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paper } from "@mui/material";
import { FormField } from "../store/schema";
import FieldRenderer from "../components/fields/FieldRenderer";
import { useFormBuilder } from "../store/FormBuilderContext";

export default function DraggableField({ field }: { field: FormField }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const { dispatch, state } = useFormBuilder();
  const isSelected = state.selectedFieldId === field.id;

  return (
    <Paper
      ref={setNodeRef}
      onClick={() => dispatch({ type: "SELECT_FIELD", id: field.id })}
      sx={{
        p: 2,
        mb: 2,
        cursor: "grab",
        border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      {...attributes}
      {...listeners}
    >
      <FieldRenderer field={field} />
    </Paper>
  );
}

import { FormField, FieldType } from "./schema";
import { nanoid } from "nanoid";

export interface FormBuilderState {
  fields: FormField[];
  selectedFieldId: string | null;
}

export type FormBuilderAction =
  | { type: "ADD_FIELD"; fieldType: FieldType }
  | { type: "UPDATE_FIELD"; id: string; patch: Partial<FormField> }
  | { type: "REMOVE_FIELD"; id: string }
  | { type: "REORDER_FIELDS"; from: number; to: number }
  | { type: "SELECT_FIELD"; id: string | null };

export const initialState: FormBuilderState = {
  fields: [],
  selectedFieldId: null,
};

export function formBuilderReducer(
  state: FormBuilderState,
  action: FormBuilderAction
): FormBuilderState {
  switch (action.type) {
    case "ADD_FIELD": {
      const newField: FormField = {
        id: nanoid(),
        type: action.fieldType,
        label: "Untitled",
        description: "",
        placeholder: "",
        width: "full",
        required: false
      } as FormField;

      if (["dropdown", "checkbox", "likert"].includes(action.fieldType)) {
        (newField as any).options = [
          { id: nanoid(), label: "Option 1" },
          { id: nanoid(), label: "Option 2" }
        ];
      }

      if (action.fieldType === "likert") {
        (newField as any).orientation = "horizontal";
      }

      return { ...state, fields: [...state.fields, newField] };
    }

    case "UPDATE_FIELD":
      return {
        ...state,
        fields: state.fields.map((f) =>
          f.id === action.id ? { ...f, ...action.patch } : f
        ),
      };

    case "REMOVE_FIELD":
      return {
        ...state,
        fields: state.fields.filter((f) => f.id !== action.id),
        selectedFieldId:
          state.selectedFieldId === action.id ? null : state.selectedFieldId,
      };

    case "REORDER_FIELDS": {
      const updated = [...state.fields];
      const [moved] = updated.splice(action.from, 1);
      updated.splice(action.to, 0, moved);
      return { ...state, fields: updated };
    }

    case "SELECT_FIELD":
      return { ...state, selectedFieldId: action.id };

    default:
      return state;
  }
}

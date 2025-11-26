export type FieldWidth = "full" | "half";

export type FieldType =
  | "short_text"
  | "long_text"
  | "long_text"
  | "number"
  | "dropdown"
  | "checkbox"
  | "likert";

export interface BaseField {
  id: string;
  type: FieldType;
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  width: FieldWidth;
}

export interface Option {
  id: string;
  label: string;
}

export interface DropdownField extends BaseField {
  type: "dropdown";
  options: Option[];
}

export interface CheckboxField extends BaseField {
  type: "checkbox";
  options: Option[];
}

export interface LikertField extends BaseField {
  type: "likert";
  options: Option[];
  orientation: "horizontal" | "vertical";
}

export type FormField =
  | BaseField
  | DropdownField
  | CheckboxField
  | LikertField;

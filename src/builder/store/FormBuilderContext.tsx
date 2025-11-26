import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  Dispatch,
} from "react";
import {
  formBuilderReducer,
  initialState,
  FormBuilderState,
  FormBuilderAction,
} from "./formBuilderReducer";

interface Ctx {
  state: FormBuilderState;
  dispatch: Dispatch<FormBuilderAction>;
}

const FormBuilderContext = createContext<Ctx | undefined>(undefined);

export function FormBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(formBuilderReducer, initialState);

  return (
    <FormBuilderContext.Provider value={{ state, dispatch }}>
      {children}
    </FormBuilderContext.Provider>
  );
}

export function useFormBuilder() {
  const ctx = useContext(FormBuilderContext);
  if (!ctx) throw new Error("useFormBuilder must be inside provider");
  return ctx;
}

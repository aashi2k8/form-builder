import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { FormBuilderProvider } from "./builder/store/FormBuilderContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FormBuilderProvider>
      <App />
    </FormBuilderProvider>
  </React.StrictMode>
);

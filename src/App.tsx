import { useState } from "react";
import BuilderPage from "./builder/BuilderPage";
import PreviewPage from "./preview/PreviewPage";

export default function App() {
  const [preview, setPreview] = useState(false);

  return preview ? (
    <PreviewPage onBack={() => setPreview(false)} />
  ) : (
    <BuilderPage onPreview={() => setPreview(true)} />
  );
}

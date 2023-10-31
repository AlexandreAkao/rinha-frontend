"use client";

import InputFile from "@/components/InputFile";
import JsonTreeViewer from "@/components/JsonTreeViewer";
import { useState } from "react";

export default function Home() {
  const [hasError, setHasError] = useState(false);
  const [jsonContent, setJsonContent] = useState<JSONType>();

  const clearJson = () => {
    setJsonContent(undefined);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {jsonContent ? (
        <>
          <JsonTreeViewer json={jsonContent} />
          <button
            className="bg-gradient-to-t from-neutral-100 to-neutral-200 border border-black px-3 py-1.5 rounded cursor-pointer"
            onClick={clearJson}
          >
            Voltar
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-5xl font-bold">JSON Tree Viewer</h1>
          <span className="text-2xl">
            Simple JSON Viewer that runs completely on-client. No data exchange
          </span>
          <InputFile
            label="Load JSON"
            setHasError={setHasError}
            setJsonContent={setJsonContent}
          />
          {hasError && (
            <span className="text-base text-red-700 ">
              Invalid file. Please load a valid JSON file.
            </span>
          )}
        </div>
      )}
    </main>
  );
}

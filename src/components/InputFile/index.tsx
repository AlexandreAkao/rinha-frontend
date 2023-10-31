import { ChangeEvent } from "react";

interface IInputFileProps {
  label: string;
  setHasError: (v: boolean) => void;
  setJsonContent: (v: JSONType) => void;
}

function InputFile({ label, setHasError, setJsonContent }: IInputFileProps) {
  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const chunkSize = 64 * 1024;
    const offset = 0;

    if (!(event.target.files && event.target.files.length > 0)) {
      setHasError(true);
      return;
    }
    const file = event.target.files[0];

    if (file.type !== "application/json") {
      setHasError(true);
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", (event) => {
      try {
        const content = event.target?.result?.toString() ?? "";
        const jsonContent = JSON.parse(content) as JSONType;
        setJsonContent(jsonContent);
      } catch (error) {
        setHasError(true);
      }
    });

    reader.addEventListener("progress", (event) => {
      console.log(event);
    });

    reader.readAsText(file);

    setHasError(false);
  };

  return (
    <div>
      <label
        className="bg-gradient-to-t from-neutral-100 to-neutral-200 border border-black px-3 py-1.5 rounded cursor-pointer"
        htmlFor="json-file"
      >
        {label}
      </label>
      <input
        type="file"
        name="json-file"
        id="json-file"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

export default InputFile;

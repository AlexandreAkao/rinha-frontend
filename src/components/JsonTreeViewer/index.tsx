import React from "react";

interface IJsonTreeViewerProps {
  json: JSONType;
  limit?: number;
}

const getOpenAndCloseChar = (value: JSONType) => {
  const isArray = Array.isArray(value);
  const openChar = isArray ? "[" : "{";
  const closeChar = isArray ? "]" : "}";

  return { openChar, closeChar };
};

const normalizeValues = (value: string | number | boolean) => {
  const type = typeof value;
  if (type === "boolean" || type === "number") {
    return value.toString();
  } else if (type === "string") {
    return `"${value}"`;
  } else if (value === null) {
    return "null";
  } else if (value === undefined) {
    return "undefined";
  }

  return value;
};

const isObj = (value: JSONType) => {
  return typeof value === "object" && value !== null && value !== undefined;
};

function JsonTreeViewer({ json, limit = 10 }: IJsonTreeViewerProps) {
  const initialIsArray = Array.isArray(json);
  const initialOpenChar = initialIsArray ? "[" : "{";
  const initialCloseChar = initialIsArray ? "]" : "}";

  const handleJson = (json: JSONType) => {
    const isArray = Array.isArray(json);
    const values: [string, JSONType][] = Object.entries(json);

    return (
      <div>
        {values.map(([key, value], index) => {
          return (
            <div className="pl-6 border-l-2" key={key}>
              {!isArray && `${key}: `}
              {isObj(value) && getOpenAndCloseChar(value).openChar}
              {isObj(value)
                ? handleJson(value)
                : normalizeValues(value as string | number | boolean)}
              {isObj(value) && getOpenAndCloseChar(value).closeChar}
              {values.length - 1 !== index && ","}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <span>{initialOpenChar}</span>
      {handleJson(json)}
      <span>{initialCloseChar}</span>
    </div>
  );
}

export default JsonTreeViewer;

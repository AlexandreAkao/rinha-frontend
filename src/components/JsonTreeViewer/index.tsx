import React, { useLayoutEffect, useMemo, useState } from "react";

function JsonTreeViewer({ json, limit = 100 }: IJsonTreeViewerProps) {
  const [offset, setOffset] = useState(0);
  const threshold = 30;
  const itemHeight = 24;

  const jsonText = useMemo(
    () => JSON.stringify(json, null, 2).split("\n"),
    [json]
  );

  const handleJson = useMemo(() => {
    const jsonContent = jsonText.slice(0, offset + limit).map((text, index) => {
      return <span key={`${text.trim}-${index}`}>{text}</span>;
    });

    return jsonContent;
  }, [jsonText, limit, offset]);

  useLayoutEffect(() => {
    function scrollHandler() {
      const scrollPosition = window.scrollY;
      const { clientHeight } = document.body;
      const clientHeightSize = window.innerHeight;

      if (
        clientHeightSize + scrollPosition >=
        clientHeight - itemHeight * threshold
      ) {
        setOffset((curr) => curr + limit);
      }
    }

    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [handleJson, limit]);

  return <div className="flex flex-col whitespace-pre-wrap">{handleJson}</div>;
}

export default JsonTreeViewer;

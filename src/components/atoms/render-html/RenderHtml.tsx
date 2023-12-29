import React from 'react';

interface RenderHtmlProps {
  html?: string | null,
}

const RenderHtml: React.FC<RenderHtmlProps> = (props) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: props?.html ?? "",
      }}
    />
  );
};

export { RenderHtml };

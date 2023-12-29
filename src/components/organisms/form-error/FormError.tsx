import React from 'react';

interface FormErrorProps {
  show?: boolean | string | null,
  title?: string | null,
  style?: React.CSSProperties,
}

const FormError: React.FC<FormErrorProps> = (props) => {
  return (
    <>
      {props?.show && props?.title && (
        <div style={{
          fontSize: 15,
          color: "red",
          ...props?.style,
        }}>
          {props?.title}
        </div>
      )}
    </>
  );
};

export { FormError };

import React from "react";
import FieldLabel from "./FieldLabel";

/**
 * FormGroup component - wrapper with label and children
 */
export default function FormGroup({
  label,
  hint,
  indicator,
  source,
  children
}) {
  return (
    <div className="fg">
      <FieldLabel
        hint={hint}
        indicator={indicator}
        source={source}
      >
        {label}
      </FieldLabel>
      {children}
    </div>
  );
}

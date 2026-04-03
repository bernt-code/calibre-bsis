import React from "react";
import FormGroup from "./FormGroup";

/**
 * TextArea component - textarea with label
 */
export default function TextArea({
  label,
  hint,
  indicator,
  value,
  onChange,
  rows = 3,
  source
}) {
  return (
    <FormGroup
      label={label}
      hint={hint}
      indicator={indicator}
      source={source}
    >
      <textarea
        rows={rows}
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter description…"
      />
    </FormGroup>
  );
}

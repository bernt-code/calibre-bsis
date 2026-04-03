import React from "react";
import FormGroup from "./FormGroup";

/**
 * TextInput component - text/number input with optional prefix/suffix
 */
export default function TextInput({
  label,
  hint,
  indicator,
  prefix,
  suffix,
  value,
  onChange,
  placeholder,
  source,
  type = "text"
}) {
  const inputType = type === "text" ? "text" : "number";

  let input;

  if (prefix) {
    input = (
      <div className="pfx">
        <span>{prefix}</span>
        <input
          type={inputType}
          value={value ?? ""}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? "0"}
        />
      </div>
    );
  } else if (suffix) {
    input = (
      <div className="sfx">
        <input
          type={inputType}
          value={value ?? ""}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder ?? "0"}
        />
        <span>{suffix}</span>
      </div>
    );
  } else {
    input = (
      <input
        type={inputType}
        value={value ?? ""}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? "0"}
      />
    );
  }

  return (
    <FormGroup
      label={label}
      hint={hint}
      indicator={indicator}
      source={source}
    >
      {input}
    </FormGroup>
  );
}

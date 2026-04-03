import React from "react";
import FormGroup from "./FormGroup";

/**
 * ListInput component - dynamic list with add/remove items
 */
export default function ListInput({
  label,
  hint,
  indicator,
  items,
  onChange,
  placeholder = "Enter item…",
  source
}) {
  const itemList = Array.isArray(items) ? items : [];

  const handleChangeItem = (index, value) => {
    const newItems = [...itemList];
    newItems[index] = value;
    onChange(newItems);
  };

  const handleRemoveItem = (index) => {
    onChange(itemList.filter((_, i) => i !== index));
  };

  const handleAddItem = () => {
    onChange([...itemList, ""]);
  };

  return (
    <FormGroup
      label={label}
      hint={hint}
      indicator={indicator}
      source={source}
    >
      <div className="dlist">
        {itemList.map((item, index) => (
          <div key={index} className="dlist-item">
            <span className="dlist-idx">{index + 1}</span>
            <input
              type="text"
              value={item}
              onChange={e => handleChangeItem(index, e.target.value)}
              placeholder={placeholder}
            />
            <button
              className="rm-btn"
              onClick={() => handleRemoveItem(index)}
            >
              ×
            </button>
          </div>
        ))}
        <div className="dlist-add" onClick={handleAddItem}>
          + Add row
        </div>
      </div>
    </FormGroup>
  );
}

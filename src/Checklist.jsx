import React from "react";

export default function Checklist({ title, items, selected, onToggle }) {
  return (
    <div style={{ marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "1rem" }}>
      <h3>{title}</h3>
      {items.map((item) => (
        <label key={item} style={{ display: "block", margin: "5px 0" }}>
          <input
            type="checkbox"
            checked={selected[item] || false}
            onChange={() => onToggle(item)}
          />{" "}
          {item}
        </label>
      ))}
    </div>
  );
}

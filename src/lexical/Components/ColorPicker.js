import React, { useRef, useState } from "react";
import { SketchPicker } from "react-color";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ColorPicker({ color, onChange, icon }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => setIsOpen(true)}
      >
        {icon}
      </button>
      {isOpen && (
        <div
          ref={ref}
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            zIndex: 10,
            userSelect: "none",
            background: "white",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <SketchPicker
            color={color}
            onChangeComplete={(color) => onChange(color.hex)}
          />
        </div>
      )}
    </div>
  );
}

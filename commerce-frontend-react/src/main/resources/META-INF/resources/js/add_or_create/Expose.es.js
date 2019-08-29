import React from "react";

export default function Expose({active, onClose, children}) {
  const [height, setHeight] = React.useState(0);
  const content = React.useRef();

  React.useEffect(() => {
    const handleEscKey = (e) => (e.key === "Escape") && onClose();

    if (active) {
      setHeight(content.current.getBoundingClientRect().height);
      window.addEventListener("keydown", handleEscKey);
    } else {
      setHeight(0);
      window.removeEventListener("keydown", handleEscKey);
    }
  }, [active, onClose]);

  return (
    <div
      className={`expose ${height ? "is-open" : "is-closed"}`}
      style={height ? { height } : {}}
    >
      <div className="backdrop" onClick={onClose} />
      <div className="content" ref={content}>
        {children}
      </div>
    </div>
  );
}

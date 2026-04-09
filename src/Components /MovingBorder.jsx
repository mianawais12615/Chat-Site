import { useRef, useEffect } from "react";
import "./MovingBorder.css";

const MovingBorder = ({ children, className = "", borderRadius = "6px", duration = "3s" }) => {
  const borderRef = useRef(null);

  return (
    <div className={`moving-border-wrapper ${className}`} style={{ borderRadius }}>
      <div 
        ref={borderRef} 
        className="moving-border-gradient" 
        style={{ 
          borderRadius,
          animationDuration: duration 
        }}
      />
      <div className="moving-border-content" style={{ borderRadius }}>
        {children}
      </div>
    </div>
  );
};

export default MovingBorder;

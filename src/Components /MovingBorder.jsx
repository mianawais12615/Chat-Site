import "./MovingBorder.css";

const MovingBorder = ({ children, className = "", borderRadius = "12px", duration = "3s" }) => {
  return (
    <div className={`moving-border-wrapper ${className}`} style={{ borderRadius }}>
      <div 
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

import React from "react";

function ProgressBar({ bgcolor, progress, height }) {
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    borderRadius: 40,
  };

  const Childdiv = {
    height: "100%",
    width: `${progress}%`,
    backgroundColor: bgcolor,
    borderRadius: 40,
    textAlign: "right",
  };

  const progresstext = {
    padding: 120
  };

  return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{``}</span>
      </div>
    </div>
  );
}

export default ProgressBar;

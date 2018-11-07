import React from "react";

const Spinner = () => (
  <div
    className="preloader-wrapper active"
    style={{ position: "absolute", top: "50%", left: "50%" }}
  >
    <div className="spinner-layer spinner-teal-only">
      <div className="circle-clipper left">
        <div className="circle" />
      </div>
      <div className="gap-patch">
        <div className="circle" />
      </div>
      <div className="circle-clipper right">
        <div className="circle" />
      </div>
    </div>
  </div>
);

export default Spinner;

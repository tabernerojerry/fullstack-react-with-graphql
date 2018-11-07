import React from "react";
import PropTypes from "prop-types";

const Error = ({ error }) => (
  <div className="input-field col s12 z-depth-1 red darken-2">
    <p className="white-text">{error.message}</p>
  </div>
);

Error.propTypes = {
  error: PropTypes.object.isRequired
};

export default Error;

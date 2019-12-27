import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Label = ({ content, focused }) => (
  <div className={classnames("lunatic-dropdown-label", { focused })}>
    {content}
  </div>
);

Label.propTypes = {
  content: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

export default Label;

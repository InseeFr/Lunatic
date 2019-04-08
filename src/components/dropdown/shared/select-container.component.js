import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import keycode from "keycode";

class SelectContainer extends React.Component {
  handleKeyPressed = e => {
    switch (keycode(e)) {
      case "up":
        e.preventDefault();
        return this.props.up();
      case "down":
        e.preventDefault();
        return this.props.down();
      case "home":
        e.preventDefault();
        return this.props.home();
      case "end":
        e.preventDefault();
        return this.props.end();
      default:
        return;
    }
  };

  handleClickOptions = (value, index) => {
    if (this.state.value !== value && !this.props.readOnly) {
      this.setState({ expanded: undefined, value, index });
      return this.props.onChange ? this.props.onChange(value) : false;
    }
    return false;
  };

  render() {
    const { className, children, id } = this.props;
    return (
      <div
        id={id}
        className={classnames({ [className]: className })}
        onBlur={this.props.onBlur}
        onKeyDown={this.handleKeyPressed}
      >
        {children}
      </div>
    );
  }
}

SelectContainer.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  up: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired,
  home: PropTypes.func.isRequired,
  end: PropTypes.func.isRequired
};

export default SelectContainer;

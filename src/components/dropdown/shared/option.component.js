import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

class Option extends React.Component {
  html = React.createRef();
  componentDidMount() {
    if (this.props.validate) {
      this.props.validate(this.props.index, this.html);
    }
  }
  render() {
    const {
      value,
      children,
      onClick,
      selected,
      id,
      index,
      hidden,
      component: Component
    } = this.props;

    return (
      <li
        ref={this.html}
        role="option"
        id={id}
        aria-selected={selected ? "true" : undefined}
        className={classnames("option", { selected, hidden })}
        aria-hidden={hidden ? true : undefined}
        onClick={e => {
          e.stopPropagation(e);
          return onClick ? onClick(value, index) : null;
        }}
      >
        {Component ? (
          <Component index={index} value={value} label={children} />
        ) : (
          children
        )}
      </li>
    );
  }
}

Option.propTypes = {
  id: PropTypes.string,
  component: PropTypes.func,
  index: PropTypes.number,
  selected: PropTypes.bool,
  hidden: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.string,
    PropTypes.object
  ])
};

export default Option;

export const getValuesFromProps = ({ children, options }) => {
  const witch = options || children;
  if (witch) {
    const options = Array.isArray(witch) ? witch : [witch];
    return options
      .filter(option => option.type === Option)
      .map(({ props: { value, children } }, index) => ({
        index,
        value,
        label: children
      }))
      .reduce((a, { index, ...rest }) => ({ ...a, [index]: { ...rest } }), {});
  }
  return {};
};

import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Option from "./option.component";

class SelectPanel extends React.Component {
  domUl = React.createRef();
  domOptions = {};
  index = -1;

  constructor(props) {
    super(props);
    this.index = props.index;
  }

  componentDidUpdate() {
    if (this.index !== this.props.index) {
      this.validateScroll(this.props.index);
      this.index = this.props.index;
    }
  }

  validateScroll = index => {
    const domLi = this.domOptions[index];
    if (domLi && domLi.current && this.domUl.current) {
      const top = domLi.current.offsetTop;
      const bottom = top + domLi.current.offsetHeight;
      const topLim = this.domUl.current.scrollTop;
      const bottomLim = topLim + this.domUl.current.offsetHeight;
      if (bottom > bottomLim) {
        this.domUl.current.scrollTop = bottom - this.domUl.current.offsetHeight;
      } else if (top < topLim) {
        this.domUl.current.scrollTop = top;
      }
    }
  };

  handleClick = (value, index, label) => {
    if (this.props.onClickOption) {
      this.props.onClickOption(value, index, label);
    }
    return false;
  };

  handlePanelEnter = () => {
    this.props.handleHover(true);
  };

  handlePanelLeave = () => {
    this.props.handleHover(false);
  };

  render() {
    const { expanded, index, getId, children, prefix } = this.props;
    return (
      <ul
        className={classnames("options", { hidden: !expanded })}
        onMouseEnter={this.handlePanelEnter}
        onMouseLeave={this.handlePanelLeave}
        role="listbox"
        tabIndex="0"
        aria-activedescendant={getId(this.props.index)}
        ref={this.domUl}
      >
        {React.Children.toArray(children)
          .filter(({ hidden }) => !hidden)
          .map(({ props: { children, value: val, ...rest } }, i) => (
            <Option
              {...rest}
              hidden={
                prefix ? (children.startsWith(prefix) ? false : true) : false
              }
              key={i}
              value={val}
              selected={i === index}
              onClick={() => this.handleClick(val, i, children)}
              id={getId(i)}
              index={i}
              validate={(i, html) => {
                this.domOptions[i] = html;
              }}
            >
              {children}
            </Option>
          ))}
      </ul>
    );
  }
}

SelectPanel.propTypes = {
  prefix: PropTypes.string,
  index: PropTypes.number,
  getId: PropTypes.func.isRequired,
  expanded: PropTypes.bool.isRequired,
  hidden: PropTypes.bool,
  handleHover: PropTypes.func.isRequired,
  onClickOption: PropTypes.func.isRequired,
  children: (content, propName, componentName) =>
    React.Children.toArray(content[propName]).reduce(
      (a, p) =>
        p.type !== Option
          ? new Error(`${componentName} children should be of type Option.`)
          : a,
      null
    )
};

export default SelectPanel;

import React from "react";
import PropTypes from "prop-types";
import SelectPanel from "./select-panel.component";
import SelectContainer from "./select-container.component";
import { getValuesFromProps } from "./option.component";

let __SELECT_ID__ = 1;

class SelectBase extends React.Component {
  state = { index: -1 };
  overPanel = false;
  values = [];
  nbOptions = -1;

  constructor(props) {
    super(props);
    this.idSequence = __SELECT_ID__++;
  }

  componentDidMount() {
    this.values = getValuesFromProps(this.props);
    this.nbOptions = Object.keys(this.values).length;
    if (this.props.value) {
      const current = Object.entries(this.values).reduce(
        (a, [i, { label, value }]) =>
          value === this.props.value
            ? { index: Number.parseInt(i), label, value }
            : a,
        null
      );
      if (current) {
        const { index, label, value } = current;
        this.setState({ index });
        this.props.setValue(value, label);
      }
    }
  }

  up = () => this.validateIndex(Math.max(0, this.state.index - 1));

  down = () =>
    this.validateIndex(Math.min(this.nbOptions - 1, this.state.index + 1));

  home = () => this.validateIndex(0);

  end = () => this.validateIndex(this.nbOptions - 1);

  validateIndex = index => {
    const finalValue = this.values[index];
    if (this.state.value !== finalValue.value) {
      this.setState({ index });
      this.props.setValue(finalValue.value, finalValue.label);
    }
    return index;
  };

  handleClick = () => {
    this.props.setExpanded(!this.props.expanded);
  };

  handleClickOptions = (value, index, label) => {
    if (this.state.value !== value && !this.props.readOnly) {
      this.setState({ index });
      this.props.setExpanded(false);
      this.props.setValue(value, label);
    }
    return false;
  };

  handleOnBlur = e => {
    if (!this.overPanel) {
      this.props.setExpanded(false);
    }
  };

  render() {
    const { index } = this.state;
    const {
      children,
      options,
      id,
      expanded,
      prefix,
      value,
      ...rest
    } = this.props;
    return (
      <SelectContainer
        id={getSelectId(id)(this.idSequence)}
        onBlur={this.handleOnBlur}
        up={this.up}
        down={this.down}
        home={this.home}
        end={this.end}
        {...rest}
      >
        {children}
        <SelectPanel
          value={value}
          index={index}
          prefix={prefix}
          expanded={expanded}
          getId={getOptionId(id)(this.idSequence)}
          onClickOption={this.handleClickOptions}
          handleHover={over => (this.overPanel = over)}
        >
          {options}
        </SelectPanel>
      </SelectContainer>
    );
  }
}

SelectBase.propTypes = {
  prefix: PropTypes.string,
  placeHolder: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.func, PropTypes.array]),
  setExpanded: PropTypes.func.isRequired
};

const getSelectId = name => id => (id ? `${name}-${id}` : undefined);
const getOptionId = name => idSelect => index =>
  index ? `${name}-${idSelect}-${index}` : undefined;

export default SelectBase;

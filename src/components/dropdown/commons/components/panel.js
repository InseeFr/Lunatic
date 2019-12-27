import React, { useRef } from "react";
import PropTypes from "prop-types";

/**
 *
 */
const Panel = ({
  options = [],
  display,
  handleActive,
  prefix,
  activeIndex,
  selectedOption,
  onSelect,
  idDropdown,
  optionComponent: Option
}) => {
  const ulRef = useRef();

  return display ? (
    <div className="lunatic-dropdown-panel-container">
      <ul className="lunatic-dropdown-panel" ref={ulRef} tabIndex="-1">
        {options.map(({ label, value }, index) => (
          <li
            key={value}
            id={`${idDropdown}-option-${value}`}
            onMouseEnter={() => handleActive(index)}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
              onSelect({ label, value });
            }}
          >
            <Option
              label={label}
              value={value}
              prefix={prefix}
              active={activeIndex === index}
              selected={selectedOption && selectedOption.value === value}
            />
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

const propTypesOption = PropTypes.shape({
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.symbol,
    PropTypes.bool
  ])
});

Panel.propTypes = {
  idDropdown: PropTypes.string.isRequired,
  prefix: PropTypes.string,
  onSelect: PropTypes.func,
  handleActive: PropTypes.func.isRequired,
  activeIndex: PropTypes.number,
  selectedOption: propTypesOption,
  display: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(propTypesOption)
};

Panel.defaultProps = {
  options: [],
  onSelect: () => null,
  selectedOption: undefined
};

export default Panel;

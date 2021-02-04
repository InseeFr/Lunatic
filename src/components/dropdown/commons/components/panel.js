import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ReactLargeList } from 'react-scrollable-div';

function ItemRenderer({ item, height }) {
	const { label } = item;
	console.log(item);
	return <div>{label}</div>;
}

/**
 *
 */
function Panel({
	options = [],
	display,
	handleActive,
	prefix,
	activeIndex,
	selectedOption,
	onSelect,
	idDropdown,
	optionComponent: Option,
	visible,
}) {
	const ulRef = useRef();
	/*
return {
      id: `Element-${i}`,
      value,
      __height: 30 + randomInt(30),
      __width: value.length,
    };
*/

	const liste = options.map(function ({ label, value }) {
		return {
			__height: 20,
			__width: label.length * 10,
			value,
			label,
			id: `${idDropdown}-option-${value}`,
		};
	});

	return display ? (
		<div
			className={classnames('lunatic-dropdown-panel-container', { visible })}
		>
			<ReactLargeList
				className="toto"
				list={liste}
				itemRenderer={ItemRenderer}
			/>
		</div>
	) : null;
}

{
	/* <ul className="lunatic-dropdown-panel" ref={ulRef} tabIndex="-1">
				{options.map(({ label, value }, index) => (
					<li
						key={value}
						id={`${idDropdown}-option-${value}`}
						onMouseEnter={() => handleActive(index)}
						onMouseDown={(e) => {
							e.stopPropagation();
							e.preventDefault();
							if (e.button === 0) {
								onSelect({ label, value });
							}
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
			</ul> */
}

const propTypesOption = PropTypes.shape({
	label: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object,
		PropTypes.number,
		PropTypes.symbol,
		PropTypes.bool,
	]),
});

Panel.propTypes = {
	idDropdown: PropTypes.string.isRequired,
	prefix: PropTypes.string,
	onSelect: PropTypes.func,
	handleActive: PropTypes.func.isRequired,
	activeIndex: PropTypes.number,
	selectedOption: propTypesOption,
	display: PropTypes.bool.isRequired,
	options: PropTypes.arrayOf(propTypesOption),
};

Panel.defaultProps = {
	options: [],
	onSelect: () => null,
	selectedOption: undefined,
};

export default Panel;

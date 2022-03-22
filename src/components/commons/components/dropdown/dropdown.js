import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownContent from './dropdown-content';
import Selection from './selection';
import Panel from './panel';
import Delete from './selection/delete';
import createCustomizableLunaticField from '../../create-customizable-field';
import DefaultOptionRenderer from './panel/default-option-renderer';
import './dropdown.scss';

function Dropdown({
	className,
	classStyle,
	placeholder,
	labelledBy,
	optionRenderer,
	labelRenderer,

	onDelete,
	onKeyDown,
	onChange,
	onClickOption,

	value,
	disabled,
	displayLabel,

	messageError,
	search,

	editable,
	id,
	options,
}) {
	const [focused, setFocused] = useState(false);
	const [expended, setExpended] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(undefined);

	const onFocus = useCallback(function () {
		setExpended(true);
		setFocused(true);
	}, []);

	const onBlur = useCallback(function () {
		setExpended(false);
		setFocused(false);
	}, []);

	const handleClickOption = useCallback(
		function (index) {
			setSelectedIndex(index);
			setExpended(false);
			onClickOption(options[index].id);
		},
		[options]
	);

	if (messageError) {
		return <div className="lunatic-dropdown-message-error">{messageError}</div>;
	}

	return (
		<div
			className={classnames(
				'lunatic-dropdown-container',
				className,
				classStyle
			)}
		>
			<DropdownContent
				id={id}
				focused={focused}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
			>
				<Selection
					labelRenderer={labelRenderer}
					placeholder={placeholder}
					labelledBy={labelledBy}
					search={search}
					expended={expended}
					id={id}
					disabled={disabled}
					focused={focused}
					editable={editable}
					displayLabel={displayLabel}
					selectedIndex={selectedIndex}
					options={options}
					onChange={onChange}
				/>
				<Panel
					optionRenderer={optionRenderer}
					value={value}
					options={options}
					focused={focused}
					selectedIndex={selectedIndex}
					expended={expended}
					id={id}
					search={search}
					onClickOption={handleClickOption}
				/>
			</DropdownContent>
			<Delete
				className={classnames({ focused })}
				search={search}
				onClick={onDelete}
			/>
		</div>
	);
}

Dropdown.propTypes = {
	classStyle: PropTypes.string,
	placeholder: PropTypes.string,
	editable: PropTypes.bool,
	onClickOption: PropTypes.func,
};

Dropdown.defaultProps = {
	classStyle: 'default-style',
	optionRenderer: DefaultOptionRenderer,
	placeholder: 'Please, do something...',
	editable: false,
	onClickOption: () => null,
};

export default createCustomizableLunaticField(Dropdown);

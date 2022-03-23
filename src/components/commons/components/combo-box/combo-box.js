import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ComboBoxContent from './combo-box-content';
import Selection from './selection';
import Panel from './panel';
import Delete from './selection/delete';
import ComboBoxContainer from './combo-box-container';
import createCustomizableLunaticField from '../../create-customizable-field';
import DefaultOptionRenderer from './panel/default-option-renderer';
import onKeyDownCallback from './on-keydown-callback';
import './combo-box.scss';

const EMPTY_SEARCH = '';

function ComboBox({
	className,
	classStyle,
	placeholder,
	labelledBy,
	htmlFor,
	optionRenderer,
	labelRenderer,

	onChange, // change search
	onSelect, // select option

	value,
	disabled,

	messageError,

	editable,
	id,
	options,
}) {
	const [focused, setFocused] = useState(false);
	const [expended, setExpended] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(undefined);
	const [search, setSearch] = useState(EMPTY_SEARCH);

	const onFocus = useCallback(function () {
		setExpended(true);
		setFocused(true);
	}, []);

	const onBlur = useCallback(function () {
		setExpended(false);
		setFocused(false);
	}, []);

	const handleSelect = useCallback(
		function (index) {
			setSelectedIndex(index);
			setExpended(false);
			// TODO safety
			onSelect(options[index].id);
		},
		[options]
	);

	const handleChange = useCallback(
		function (s) {
			setSearch(s);
			onChange(s);
		},
		[onChange]
	);

	const onKeyDown = useCallback(
		function (e) {
			const {
				index,
				expended: nExpended,
				focused,
			} = onKeyDownCallback(e, {
				selectedIndex,
				options,
				expended,
			});

			setSelectedIndex(index);
			setExpended(nExpended);
			setFocused(focused);
		},
		[selectedIndex, options, expended]
	);

	const onDelete = useCallback(
		function () {
			setSearch(EMPTY_SEARCH);
			onChange(EMPTY_SEARCH);
		},
		[onChange]
	);

	if (messageError) {
		return (
			<div className="lunatic-combo-box-message-error">{messageError}</div>
		);
	}

	return (
		<ComboBoxContainer id={id} classStyle={classStyle} className={className}>
			<ComboBoxContent
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
					htmlFor={htmlFor}
					search={search}
					expended={expended}
					id={id}
					disabled={disabled}
					focused={focused}
					editable={editable}
					selectedIndex={selectedIndex}
					options={options}
					onChange={handleChange}
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
					onSelect={handleSelect}
				/>
			</ComboBoxContent>
			<Delete
				className={classnames({ focused })}
				search={search}
				onClick={onDelete}
				editable={editable}
			/>
		</ComboBoxContainer>
	);
}

ComboBox.propTypes = {
	classStyle: PropTypes.string,
	placeholder: PropTypes.string,
	htmlFor: PropTypes.string.isRequired,
	labelledBy: PropTypes.string.isRequired,
	editable: PropTypes.bool,
	onSelect: PropTypes.func,
	onChange: PropTypes.func,
};

ComboBox.defaultProps = {
	classStyle: 'default-style',
	optionRenderer: DefaultOptionRenderer,
	placeholder: 'Please, do something...',
	editable: false,
	onSelect: () => null,
	onChange: () => null,
};

export default createCustomizableLunaticField(ComboBox);

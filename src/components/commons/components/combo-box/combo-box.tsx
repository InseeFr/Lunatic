import classnames from 'classnames';
import { useState, type ReactNode } from 'react';
import { between, forceInt } from '../../../../utils/number';
import type { LunaticBaseProps } from '../../../type';
import { createCustomizableLunaticField } from '../../index';
import Label from '../label';
import ComboBoxContainer from './combo-box-container';
import ComboBoxContent from './combo-box-content';
import './combo-box.scss';
import type { ComboBoxOptionType } from './combo-box.type';
import { KEYBOARD_KEY_CODES } from './keyboard-key-codes';
import { Panel, type PanelProps } from './panel/panel';
import { ClearButton } from './selection/clear-button';
import { Selection, type SelectionProps } from './selection/selection';

const EMPTY_SEARCH = '';

type Props = SelectionProps &
	PanelProps & {
		className?: string;
		classNamePrefix?: string;
		classStyle?: string;
		value: string | null;
		messageError?: string;
		getOptionValue?: (o: ComboBoxOptionType) => string;
		label?: ReactNode;
		description?: ReactNode;
		errors?: LunaticBaseProps['errors'];
		onChange?: (s: string | null) => void;
		onSelect: (s: string | null) => void;
		options: ComboBoxOptionType[];
	};

function ComboBox({
	className,
	classNamePrefix,
	classStyle = 'default-style',
	placeholder = 'Commencez votre saisie...',
	editable = false,
	disabled,
	id,
	optionRenderer,
	labelRenderer,
	onChange,
	onSelect,
	value,
	options,
	messageError,
	search: searchProps = EMPTY_SEARCH,
	getOptionValue = getDefaultOptionValue,
	label,
	description,
	errors,
}: Props) {
	const [expanded, setExpanded] = useState(false);
	const [focused, setFocused] = useState(false);
	const [search, setSearch] = useState(searchProps ?? '');
	const selectedIndex = getIndexFromOptions(options, value, getOptionValue);

	const labelId = `label-${id}`;

	const handleFocus = () => {
		if (disabled) {
			return;
		}
		setExpanded(true);
		setFocused(true);
	};

	const handleBlur = () => {
		if (disabled) {
			return;
		}
		setExpanded(false);
		setFocused(false);
	};

	const handleSelect = (index: string | number, close = true) => {
		const indexNumber = between(forceInt(index), 0, options.length);
		const option = options[indexNumber];
		if (close) {
			setExpanded(false);
		}
		onSelect(getOptionValue(option));
	};

	const handleChange = (s: string | null) => {
		setSearch(s ?? '');
		onChange?.(s);
	};

	const handleClear = () => {
		setSearch('');
		setExpanded(false);
		onChange?.(EMPTY_SEARCH);
		onSelect(null);
	};

	const onKeyDown = (key: string) => {
		const length = options.length;
		switch (key) {
			case KEYBOARD_KEY_CODES.Tab:
			case KEYBOARD_KEY_CODES.Escape:
				setExpanded(false);
				return;
			case KEYBOARD_KEY_CODES.ArrowDown:
				handleSelect((selectedIndex ?? -1) + 1, false);
				return;
			case KEYBOARD_KEY_CODES.ArrowUp:
				handleSelect((selectedIndex ?? length) - 1, false);
				return;
			case KEYBOARD_KEY_CODES.Home:
				handleSelect(0, false);
				return;
			case KEYBOARD_KEY_CODES.End:
				handleSelect(length - 1, false);
				return;
			case KEYBOARD_KEY_CODES.Enter:
				setExpanded((v) => !v);
				return;
		}
	};
	const showClearButton = !disabled;

	if (messageError) {
		return (
			<div className="lunatic-combo-box-message-error">{messageError}</div>
		);
	}

	return (
		<ComboBoxContainer
			id={id}
			className={className}
			classStyle={classStyle}
			classNamePrefix={classNamePrefix}
			errors={errors}
		>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<ComboBoxContent
				focused={focused}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={onKeyDown}
				classNamePrefix={classNamePrefix}
			>
				<Selection
					labelRenderer={labelRenderer}
					placeholder={placeholder}
					search={search}
					expanded={expanded}
					id={id}
					labelId={labelId}
					disabled={disabled}
					focused={focused}
					editable={editable}
					selectedIndex={selectedIndex}
					options={options}
					onChange={handleChange}
					classNamePrefix={classNamePrefix}
				/>
				<Panel
					optionRenderer={optionRenderer}
					options={options}
					focused={focused}
					selectedIndex={selectedIndex}
					expanded={expanded}
					id={id}
					search={search}
					onSelect={handleSelect}
				/>
			</ComboBoxContent>
			{showClearButton && (
				<ClearButton
					className={classnames({ focused })}
					search={search}
					onClick={handleClear}
					editable={editable}
				/>
			)}
		</ComboBoxContainer>
	);
}

function getIndexFromOptions(
	options: ComboBoxOptionType[],
	value: string | null,
	getOptionValue: (o: ComboBoxOptionType) => string
): number | undefined {
	if (!Array.isArray(options)) {
		return undefined;
	}
	return options.map(getOptionValue).findIndex((v) => v === value);
}

/**
 * Extract value from an option item
 */
function getDefaultOptionValue(option: ComboBoxOptionType = { value: '' }) {
	const { id, value } = option;
	return id || value;
}

export default createCustomizableLunaticField(ComboBox, 'ComboBox');

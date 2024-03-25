import classnames from 'classnames';
import { type ReactNode, useState } from 'react';
import { ComboboxContainer } from './ComboboxContainer';
import { ComboboxContent } from './ComboboxContent';
import type {
	ComboboxOptionType,
	ComboboxPanelProps,
	ComboboxSelectionProps,
} from './ComboboxType';
import { KEYBOARD_KEY_CODES } from './constants';
import { ComboboxPanel } from './Panel/ComboboxPanel';
import { ComboboxClearButton } from './Selection/ComboboxClearButton';
import { ComboboxSelection } from './Selection/ComboboxSelection';
import { between, forceInt } from '../../../utils/number';
import { Label } from '../Label/Label';
import { slottableComponent } from '../HOC/slottableComponent';
import type { LunaticError } from '../../../use-lunatic/type';

const EMPTY_SEARCH = '';

type Props = ComboboxSelectionProps &
	ComboboxPanelProps & {
		className?: string;
		classNamePrefix?: string;
		classStyle?: string;
		value: string | null;
		messageError?: string;
		getOptionValue?: (o: ComboboxOptionType) => string;
		label?: ReactNode;
		description?: ReactNode;
		errors?: LunaticError[];
		onChange?: (s: string | null) => void;
		onSelect: (s: string | null) => void;
		onBlur?: () => void;
		onFocus?: () => void;
		options: ComboboxOptionType[];
		readOnly?: boolean;
		isLoading?: boolean;
	};

function LunaticComboBox({
	className,
	classNamePrefix,
	classStyle = 'default-style',
	placeholder = 'Commencez votre saisie...',
	editable = false,
	disabled,
	readOnly,
	id,
	optionRenderer,
	labelRenderer,
	onChange,
	onSelect,
	value,
	options,
	messageError,
	search = EMPTY_SEARCH,
	getOptionValue = getDefaultOptionValue,
	label,
	description,
	errors,
	onBlur,
	onFocus,
	isLoading,
}: Props) {
	const [expanded, setExpanded] = useState(false);
	const [focused, setFocused] = useState(false);
	const selectedIndex = getIndexFromOptions(options, value, getOptionValue);

	const labelId = `label-${id}`;

	const handleFocus = () => {
		if (disabled || readOnly) {
			return;
		}
		onFocus?.();
		setExpanded(true);
		setFocused(true);
	};

	const handleBlur = () => {
		if (disabled || readOnly) {
			return;
		}
		setExpanded(false);
		setFocused(false);
		onBlur?.();
	};

	const handleSelect = (index: string | number, close = true) => {
		const indexNumber = between(forceInt(index), 0, options.length);
		const option = options[indexNumber];
		if (close) {
			setExpanded(false);
			onBlur?.();
		}
		onSelect(getOptionValue(option));
	};

	const handleChange = (s: string | null) => {
		onChange?.(s);
	};

	const handleClear = () => {
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
	const showClearButton = !disabled || !readOnly;

	if (messageError) {
		return (
			<div className="lunatic-combo-box-message-error">{messageError}</div>
		);
	}

	return (
		<ComboboxContainer
			id={id}
			className={className}
			classStyle={classStyle}
			classNamePrefix={classNamePrefix}
			errors={errors}
		>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<ComboboxContent
				focused={focused}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onKeyDown={onKeyDown}
				classNamePrefix={classNamePrefix}
			>
				<ComboboxSelection
					labelRenderer={labelRenderer}
					placeholder={placeholder}
					search={search}
					expanded={expanded}
					id={id}
					labelId={labelId}
					disabled={disabled}
					readOnly={readOnly}
					focused={focused}
					editable={editable}
					selectedIndex={selectedIndex}
					options={options}
					onChange={handleChange}
					classNamePrefix={classNamePrefix}
					invalid={!!errors}
				/>
				<ComboboxPanel
					isLoading={isLoading}
					optionRenderer={optionRenderer}
					options={options}
					focused={focused}
					selectedIndex={selectedIndex}
					expanded={expanded}
					id={id}
					search={search}
					onSelect={handleSelect}
				/>
			</ComboboxContent>
			{showClearButton && (
				<ComboboxClearButton
					className={classnames({ focused })}
					search={search}
					onClick={handleClear}
					editable={editable}
				/>
			)}
		</ComboboxContainer>
	);
}

function getIndexFromOptions(
	options: ComboboxOptionType[],
	value: string | null,
	getOptionValue: (o: ComboboxOptionType) => string
): number | undefined {
	if (!Array.isArray(options)) {
		return undefined;
	}
	return options.map(getOptionValue).findIndex((v) => v === value);
}

/**
 * Extract value from an option item
 */
function getDefaultOptionValue(option: ComboboxOptionType = { value: '' }) {
	const { id, value } = option;
	return id || value;
}

export const Combobox = slottableComponent('Combobox', LunaticComboBox);

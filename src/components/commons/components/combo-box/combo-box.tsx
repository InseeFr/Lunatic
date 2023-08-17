import { useCallback, useReducer, useEffect, ReactNode } from 'react';
import classnames from 'classnames';
import { ClearButton } from './selection/clear-button';
import { INITIAL_STATE, reducer, actions } from './state-management';
import './combo-box.scss';
import { ComboBoxOptionType } from './combo-box.type';
import { SelectionProps, Selection } from './selection/selection';
import { Panel, PanelProps } from './panel/panel';
import ComboBoxContainer from './combo-box-container';
import ComboBoxContent from './combo-box-content';
import { LunaticBaseProps } from '../../../type';
import Label from '../label';
import { createCustomizableLunaticField } from '../../index';

const EMPTY_SEARCH = '';

type Props = SelectionProps &
	PanelProps & {
		className?: string;
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
	classStyle = 'default-style',
	placeholder = 'Please, do something...',
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
	const labelId = `label-${id}`;
	const [state, dispatch] = useReducer(reducer, {
		...INITIAL_STATE,
		search: searchProps,
	});
	const { focused, expanded, search, selectedIndex } = state;

	useEffect(
		function () {
			dispatch(actions.onInit({ options, value, getOptionValue }));
		},
		[options, value, getOptionValue]
	);

	useEffect(
		function() {
			if (selectedIndex) {
				const option = options[selectedIndex]
				onSelect(getOptionValue(option))
			}
		}, [selectedIndex, options, getOptionValue, onSelect]
	)

	const onFocus = useCallback(function () {
		dispatch(actions.onFocus());
	}, []);

	const onBlur = useCallback(function () {
		dispatch(actions.onBlur());
	}, []);

	const handleSelect = useCallback(
		(index: string) => {
			const indexNumber = parseInt(index, 10);
			const option = options[indexNumber];
			dispatch(actions.onSelect(indexNumber));
			onSelect(getOptionValue(option));
		},
		[options, onSelect, getOptionValue]
	);

	const handleChange = useCallback(
		(s: string | null) => {
			dispatch(actions.onChange(s));
			onChange?.(s);
		},
		[onChange]
	);

	const onKeyDown = useCallback(
		(key: string) => {
			const { length } = options;
			dispatch(actions.onKeydown(key, length));
		},
		[options]
	);

	const onDelete = useCallback(
		function () {
			dispatch(actions.onDelete());
			onChange?.(EMPTY_SEARCH);
		},
		[onChange]
	);

	if (messageError) {
		return (
			<div className="lunatic-combo-box-message-error">{messageError}</div>
		);
	}

	return (
		<ComboBoxContainer
			id={id}
			classStyle={classStyle}
			className={className}
			errors={errors}
		>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<ComboBoxContent
				focused={focused}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				className={className}
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
					className={className}
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
			<ClearButton
				className={classnames({ focused })}
				search={search}
				onClick={onDelete}
				editable={editable}
			/>
		</ComboBoxContainer>
	);
}

function getDefaultOptionValue(option: ComboBoxOptionType = { value: '' }) {
	const { id, value } = option;
	return id || value;
}

export default createCustomizableLunaticField(ComboBox, 'ComboBox');

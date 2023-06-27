import { useCallback, useReducer, useEffect, ReactNode } from 'react';
import classnames from 'classnames';
import { Delete } from './selection/delete';
import { INITIAL_STATE, reducer, actions } from './state-management';
import './combo-box.scss';
import { ComboBoxOption } from './combo-box.type';
import { SelectionProps, Selection } from './selection/selection';
import { Panel, PanelProps } from './panel/panel';
import { ComboBoxContainer } from './combo-box-container';
import ComboBoxContent from './combo-box-content';
import { LunaticBaseProps } from '../../../type';
import Label from '../label';
import Errors from '../errors';
import { createCustomizableLunaticField } from '../../index';

const EMPTY_SEARCH = '';

type Props = SelectionProps &
	PanelProps & {
		className?: string;
		classStyle?: string;
		value: string | null;
		messageError?: string;
		getOptionValue?: (o: ComboBoxOption) => string;
		label?: ReactNode;
		description?: LunaticBaseProps['description'];
		errors?: LunaticBaseProps['errors'];
		onChange?: (s: string | null) => void;
		onSelect: (s: string | null) => void;
		options: ComboBoxOption[];
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
		<ComboBoxContainer id={id} classStyle={classStyle} className={className}>
			<Label htmlFor={id} id={labelId} description={description}>
				{label}
			</Label>
			<ComboBoxContent
				focused={focused}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
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
			<Delete
				className={classnames({ focused })}
				search={search}
				onClick={onDelete}
				editable={editable}
			/>
			{errors && <Errors errors={errors} activeId={id} />}
		</ComboBoxContainer>
	);
}

function getDefaultOptionValue(option: ComboBoxOption = { value: '' }) {
	const { id, value } = option;
	return id || value;
}

export default createCustomizableLunaticField(ComboBox, 'ComboBox');

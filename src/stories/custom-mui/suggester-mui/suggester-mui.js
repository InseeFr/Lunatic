import React, { useCallback, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import InputBase from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

function getSelection(options, selectedIndex) {
	if (selectedIndex !== undefined) {
		return options[selectedIndex];
	}
	return undefined;
}

function SuggesterContainer({
	children,
	onBlur,
	onKeyDown,
	labelledBy,
	focused,
	id,
	className,
}) {
	const handleClickAway = useCallback(
		function () {
			onBlur();
		},
		[onBlur]
	);
	const zIndex = focused ? 1 : 0;
	return (
		<ClickAwayListener
			mouseEvent="onMouseDown"
			touchEvent="onTouchStart"
			onClickAway={handleClickAway}
		>
			<Box
				id={id}
				aria-labelledby={labelledBy}
				sx={{ position: 'relative', zIndex }}
				onKeyDown={onKeyDown}
				className={className}
			>
				{children}
			</Box>
		</ClickAwayListener>
	);
}

function getContent(selection, search) {
	if (selection) {
		const { id, label } = selection;
		return `${id} - ${label}`;
	}
	return search ?? '';
}

function Delete({ onClick }) {
	return (
		<IconButton
			color="primary"
			sx={{ p: '8px', float: 'right' }}
			aria-label="delete"
			onClick={onClick}
		>
			<ClearIcon />
		</IconButton>
	);
}

function nothing() {}

const SelectionInput = React.forwardRef(function SelectionInput(
	{ value, placeholderList, onFocus, onChange = nothing, onDelete },
	inputRef
) {
	return (
		<Paper
			component="form"
			sx={{
				p: '2px 4px',
				display: 'flex',
				alignItems: 'center',
				width: 'fit-content',
			}}
		>
			<InputBase
				value={value}
				onFocus={onFocus}
				ref={inputRef}
				placeholder={placeholderList}
				onChange={onChange}
			/>
			<Delete onClick={onDelete} />
		</Paper>
	);
});

const Selection = React.forwardRef(function Selection(
	{
		search,
		onChange,
		onFocus,
		displayLabel,
		placeholderList,
		selection,
		onDelete,
	},
	inputRef
) {
	if (displayLabel) {
		return (
			<SelectionInput
				value={getContent(selection, search)}
				onFocus={onFocus}
				ref={inputRef}
				placeholder={placeholderList}
				onDelete={onDelete}
			/>
		);
	}
	return (
		<SelectionInput
			value={search}
			onChange={onChange}
			onFocus={onFocus}
			ref={inputRef}
			placeholder={placeholderList}
			onDelete={onDelete}
		/>
	);
});

function OptionMUI({ label, id, selected, onClickOption, index, onBlur }) {
	const onClick = useCallback(
		function () {
			onClickOption(index);
			onBlur();
		},
		[index, onClickOption, onBlur]
	);
	const backgroundColor = selected ? 'gold' : 'transparent';
	return (
		<MenuItem onClick={onClick} sx={{ backgroundColor }}>
			<Stack direction="row" spacing={1} alignItems="center">
				<Typography>{id}</Typography>
				<Typography>{label}</Typography>
			</Stack>
		</MenuItem>
	);
}

function Panel({
	options,
	expended,
	selectedIndex,
	anchorEl,
	onClickOption,
	onBlur,
}) {
	if (Array.isArray(options) && options.length && expended) {
		const items = options.map(function (option, index) {
			const { label, id } = option;
			const selected = index === selectedIndex;
			return (
				<OptionMUI
					key={id}
					id={id}
					label={label}
					selected={selected}
					index={index}
					onBlur={onBlur}
					onClickOption={onClickOption}
				/>
			);
		});
		return (
			<Popper
				open={expended}
				placement="bottom-start"
				disablePortal={true}
				anchorEl={anchorEl}
			>
				<Paper sx={{ backgroundColor: 'snow', zIndex: 10 }} elevation={2}>
					<MenuList className="lunatic-suggester-mui-panel">{items}</MenuList>
				</Paper>
			</Popper>
		);
	}
	return null;
}

function SuggesterMui({
	className,
	placeholderList,
	labelledBy,
	// optionRenderer,
	// labelRenderer,
	// onSelect,
	onBlur,
	onDelete,
	onKeyDown,
	onChange,
	onClickOption,
	onFocus,
	disabled,
	id,
	messageError,
	// value,
	search,
	focused,
	options,
	expended,
	selectedIndex,
	displayLabel,
}) {
	const inputEl = useRef();
	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);
	const selection = getSelection(options, selectedIndex);

	return (
		<SuggesterContainer
			id={id}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
			labelledBy={labelledBy}
			focused={focused}
			className={className}
		>
			<Selection
				ref={inputEl}
				search={search}
				onChange={onChangeEx}
				onFocus={onFocus}
				displayLabel={displayLabel}
				selection={selection}
				placeholderList={placeholderList}
				onDelete={onDelete}
			/>
			<Panel
				options={options}
				expended={expended}
				selectedIndex={selectedIndex}
				anchorEl={inputEl.current}
				onClickOption={onClickOption}
				onBlur={onBlur}
			/>
		</SuggesterContainer>
	);
}

export default SuggesterMui;

import React, { useCallback, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
import InputBase from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';

// function getSelection(options, selectedIndex) {
// 	if (selectedIndex !== undefined) {
// 		return options[selectedIndex];
// 	}
// 	return undefined;
// }

function SuggesterContainer({
	children,
	onKeyDown,
	labelledBy,
	id,
	className,
	onBlur,
	expended,
}) {
	// const handleClickAway = useCallback(function () {
	// 	onBlur();
	// }, []);
	const zIndex = expended ? '1' : '0';
	return (
		<ClickAwayListener
			mouseEvent="onMouseDown"
			touchEvent="onTouchStart"
			onClickAway={onBlur}
		>
			<Box
				id={id}
				aria-labelledby={labelledBy}
				sx={{ position: 'relative', zIndex }}
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
			C
		</IconButton>
	);
}

function nothing() {}

const SelectionInput = React.forwardRef(function SelectionInput(
	{ value, placeholder, onFocus, onChange = nothing, onDelete },
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
				placeholder={placeholder}
				onChange={onChange}
			/>
			<Delete onClick={onDelete} />
		</Paper>
	);
});

const Selection = React.forwardRef(function Selection(
	{ value, onChange, placeholderList, selection, onDelete, expended, onFocus },
	inputRef
) {
	if (!expended) {
		return (
			<SelectionInput
				value={getContent(selection, value)}
				ref={inputRef}
				placeholder={placeholderList}
				onDelete={onDelete}
				onFocus={onFocus}
			/>
		);
	}

	return (
		<SelectionInput
			value={value}
			onChange={onChange}
			ref={inputRef}
			placeholder={placeholderList}
			onDelete={onDelete}
		/>
	);
});

// const Selection = React.forwardRef(function Selection(
// 	{ placeholder, onChange, onDelete, value, onFocus },
// 	ref
// ) {
// 	return (
// 		<Paper
// 			component="form"
// 			sx={{
// 				p: '2px 4px',
// 				display: 'flex',
// 				alignItems: 'center',
// 				width: 'fit-content',
// 			}}
// 		>
// 			<SelectionInput
// 				value={value}
// 				placeholder={placeholder}
// 				onChange={onChange}
// 				ref={ref}
// 				onFocus={onFocus}
// 			/>
// 			<Delete onClick={onDelete} />
// 		</Paper>
// 	);
// });

function OptionMUI({ label, id, selected, onClick, index }) {
	const handleClick = useCallback(
		function () {
			onClick(index);
		},
		[index, onClick]
	);

	const backgroundColor = selected ? 'gold' : 'transparent';
	return (
		<MenuItem onClick={handleClick} sx={{ backgroundColor }}>
			<Stack direction="row" spacing={1} alignItems="center">
				<Typography>{id}</Typography>
				<Typography>{label}</Typography>
			</Stack>
		</MenuItem>
	);
}

function Panel({ options, expended, anchorEl, onClick, selectedIndex, index }) {
	if (Array.isArray(options) && options.length && expended) {
		const items = options.map(function (option, index) {
			const { label, id } = option;

			return (
				<OptionMUI
					key={id}
					id={id}
					label={label}
					selected={index === selectedIndex}
					index={index}
					onClick={onClick}
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
	labelledBy,
	placeholder,
	optionRenderer,
	onSelect,
	options,
	onChange,
	labelRenderer,
	value,
	disabled,
	id,
}) {
	const inputEl = useRef();

	const [search, setSearch] = useState('');
	const [expended, setExpended] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(undefined);
	const [selection, setSelection] = useState(undefined);

	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
			setSearch(e.target.value);
			console.log(e.target.value);
		},
		[onChange]
	);

	const onDelete = useCallback(function () {
		setSearch('');
		setSelectedIndex(undefined);
		setSelection(undefined);
	}, []);

	const onBlur = useCallback(function () {
		setExpended(false);
	}, []);

	const onFocus = useCallback(function () {
		setExpended(true);
	}, []);

	const onClick = useCallback(
		function (index) {
			setSelectedIndex(index);
			setSelection(options[index]);
		},
		[options]
	);

	return (
		<SuggesterContainer
			id={id}
			labelledBy={labelledBy}
			className={className}
			onBlur={onBlur}
			expended={expended}
		>
			<Selection
				placeholder={placeholder}
				onChange={onChangeEx}
				onDelete={onDelete}
				value={search}
				onFocus={onFocus}
				ref={inputEl}
				expended={expended}
				selection={selection}
			/>
			<Panel
				options={options}
				expended={expended}
				anchorEl={inputEl.current}
				onClick={onClick}
				selectedIndex={selectedIndex}
			/>
		</SuggesterContainer>
	);
}

export default SuggesterMui;

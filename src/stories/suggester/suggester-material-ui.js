import React, { useCallback, useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useDocumentAddEventListener from '../../utils/to-expose/hooks/use-document-add-event-listener';
import './lunatic-suggester-mui.scss';

function SuggesterContainer({
	children,
	onBlur,
	onFocus,
	onKeyDown,
	labelledBy,
}) {
	const handleClickAway = useCallback(
		function (e) {
			onBlur();
		},
		[onBlur]
	);

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<>{children}</>
		</ClickAwayListener>
	);
	// const ref = useRef();

	// const onClick = useCallback(
	// 	function (e) {
	// 		const { current } = ref;
	// 		if (!current.contains(e.target)) {
	// 			onBlur();
	// 		}
	// 	},
	// 	[ref, onBlur]
	// );

	// useDocumentAddEventListener('mousedown', onClick);

	// return (
	// 	<div
	// 		className="lunatic-suggester-mui"
	// 		ref={ref}
	// 		onFocus={onFocus}
	// 		onBlur={onBlur}
	// 		onKeyDown={onKeyDown}
	// 	>
	// 		<div className="lunatic-suggester-mui-content">{children}</div>
	// 	</div>
	// );
}

function Selection({ search, onChange }) {
	return (
		<TextField
			value={search}
			onChange={onChange}
			className="lunatic-suggester-mui-selection"
		/>
	);
}

function OptionMUI({ label, id, selected }) {
	return (
		<MenuItem
			className={classnames('lunatic-suggester-mui-option', { selected })}
		>
			<Stack direction="row" spacing={1} alignItems="center">
				<Typography>{id}</Typography>
				<Typography>{label}</Typography>
			</Stack>
		</MenuItem>
	);
}

function Panel({ options, expended, selectedIndex }) {
	console.log({ options, expended });
	if (Array.isArray(options) && options.length && expended) {
		const items = options.map(function (option, index) {
			const { label, id } = option;
			const selected = index === selectedIndex;
			return <OptionMUI key={id} id={id} label={label} selected={selected} />;
		});
		return (
			<Paper>
				<MenuList className="lunatic-suggester-mui-panel">{items}</MenuList>
			</Paper>
		);
	}
	return null;
}

function SuggesterMaterialUI({
	className,
	placeholderList,
	labelledBy,
	optionRenderer,
	labelRenderer,
	onSelect,
	onBlur,
	onDelete,
	onKeyDown,
	onChange,
	onClickOption,
	value,
	onFocus,
	disabled,
	id,
	messageError,
	search,
	focused,
	options,
	expended,
	selectedIndex,
	displayLabel,
}) {
	const onChangeEx = useCallback(
		function (e) {
			onChange(e.target.value);
		},
		[onChange]
	);

	return (
		<SuggesterContainer
			onBlur={onBlur}
			onFocus={onFocus}
			onKeyDown={onKeyDown}
			labelledBy={labelledBy}
		>
			<Selection search={search} onChange={onChangeEx} />
			<Panel
				options={options}
				expended={expended}
				selectedIndex={selectedIndex}
			/>
		</SuggesterContainer>
	);
}

export default SuggesterMaterialUI;

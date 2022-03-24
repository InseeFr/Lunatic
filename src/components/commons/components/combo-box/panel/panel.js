import React from 'react';
import PanelContainer from './panel-container';
import OptionContainer from './option-container';

function getContent({
	options,
	optionRenderer: OptionRender,
	selectedIndex,
	expended,
	value,
	search,
	onSelect,
}) {
	if (expended) {
		return options.map(function (option, index) {
			const { id } = option;
			const selected = selectedIndex === index;
			return (
				<OptionContainer
					key={id}
					index={index}
					selected={id === value}
					onSelect={onSelect}
				>
					<OptionRender option={option} selected={selected} search={search} />
				</OptionContainer>
			);
		});
	}
	return null;
}

function Panel({
	optionRenderer,
	value,
	options,
	focused,
	selectedIndex,
	expended,
	id,
	search,
	onSelect,
}) {
	const content = getContent({
		options,
		optionRenderer,
		selectedIndex,
		expended,
		value,
		search,
		onSelect,
	});

	return (
		<PanelContainer expended={expended} focused={focused} id={`${id}-list`}>
			{content}
		</PanelContainer>
	);
}

export default Panel;

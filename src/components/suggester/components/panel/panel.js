import React, { useContext } from 'react';
import { SuggesterContext } from '../../state-management';
import PanelContainer from './panel-container';
import OptionContainer from './option-container';

function getContent({
	options,
	OptionRender,
	selectedIndex,
	expended,
	value,
	search,
}) {
	if (expended) {
		return options.map(function (option, index) {
			const { id } = option;
			const selected = selectedIndex === index;
			return (
				<OptionContainer key={id} index={index} selected={id === value}>
					<OptionRender option={option} selected={selected} search={search} />
				</OptionContainer>
			);
		});
	}
	return undefined;
}

function Panel({ optionRenderer: OptionRender, value }) {
	const [state] = useContext(SuggesterContext);
	const { options, focused, selectedIndex, expended, id, search } = state;
	const content = getContent({
		options,
		OptionRender,
		selectedIndex,
		expended,
		value,
		search,
	});

	return (
		<PanelContainer expended={expended} focused={focused} id={`${id}-list`}>
			{content}
		</PanelContainer>
	);
}

export default Panel;

import React from 'react';
import { shallow } from 'enzyme';
import { Declarations } from 'components';
import * as C from 'utils/constants';

const defaultProps = { id: 'id', label: 'label' };
const declarations = [
	{
		position: C.AFTER_QUESTION_TEXT,
		id: 'id1',
		label: 'label',
		declarationType: C.INSTRUCTION,
	},
	{
		position: C.BEFORE_QUESTION_TEXT,
		id: 'id2',
		label: 'label',
		declarationType: C.INSTRUCTION,
	},
];

describe('declarations', () => {
	it('minimalist renders without crashing', () => {
		shallow(<Declarations {...defaultProps} />);
	});
	it('returns no declaration', () => {
		const wrapper = shallow(
			<Declarations
				{...defaultProps}
				type={C.DETACHABLE}
				declarations={declarations}
			/>
		);
		expect(wrapper.find('.declarations-lunatic').children()).toHaveLength(0);
	});
	it('returns one declaration', () => {
		const wrapper = shallow(
			<Declarations
				{...defaultProps}
				type={C.AFTER_QUESTION_TEXT}
				declarations={declarations}
			/>
		);
		expect(wrapper.find('.declarations-lunatic').children()).toHaveLength(1);
	});
});

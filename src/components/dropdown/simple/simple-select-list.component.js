import React from 'react';
import PropTypes from 'prop-types';
import Select from './simple-select-nested.component';
import Option from '../shared/option.component';
import { selectCommonPropTypes, allowedTypes } from './prop-types';

class SimpleSelect extends React.Component {
	render() {
		return (
			<Select {...this.props}>
				{this.props.options.map(({ label, value }, i) => (
					<Option key={i} value={value}>
						{label}
					</Option>
				))}
			</Select>
		);
	}
}

SimpleSelect.propTypes = {
	...selectCommonPropTypes,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: allowedTypes,
		})
	),
};

export default SimpleSelect;

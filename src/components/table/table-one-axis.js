import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as lunatic from '../';
import { columnsPropTypes } from '../../utils/prop-types';
import './table.scss';

class TableOneAxis extends Component {
	render() {
		const {
			id: tableId,
			label,
			columns,
			axis,
			handleChange,
			positioning,
			readOnly,
			focused,
		} = this.props;
		return (
			<React.Fragment>
				{label && (
					<label
						htmlFor={`table-one-axis-${tableId}`}
						id={`table-one-axis-label-${tableId}`}
					>
						{label}
					</label>
				)}
				<table id={`table-one-axis-${tableId}`} className="table-lunatic">
					{columns.filter(c => c.title).length !== 0 && (
						<thead>
							<tr>
								{['', ...columns].map(c => (
									<td
										id={`table-${tableId}-cell-${c.id}`}
										key={`table-${tableId}-cell-${c.id}`}
										style={{ width: `${100 / (columns.length + 1)}%` }}
									>
										{c.title}
									</td>
								))}
							</tr>
						</thead>
					)}
					<tbody>
						{axis.map(({ label, value }, i) => (
							<tr key={`table-${tableId}-line-${value}`}>
								<td
									id={`table-${tableId}-axis-${i}`}
									key={`table-${tableId}-axis-${i}`}
									className="table-cell-axis"
								>
									{label}
								</td>
								{columns.map(({ id, componentType, options }, j) => {
									const Component = lunatic[componentType];
									return (
										<td
											id={`table-${tableId}-td-${id}-${i}`}
											key={`table-${tableId}-td-${id}-${i}`}
										>
											<Component
												id={`table-${tableId}-cell-${id}-${i}`}
												handleChange={handleChange}
												options={options}
												positioning={positioning}
												readOnly={readOnly}
												focused={i === 0 && j === 0 && focused}
											/>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</React.Fragment>
		);
	}
}

TableOneAxis.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	columns: columnsPropTypes.isRequired,
	axis: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		})
	).isRequired,
	handleChange: PropTypes.func.isRequired,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	readOnly: PropTypes.bool,
	focused: PropTypes.bool,
	style: PropTypes.object,
};

TableOneAxis.defaultProps = {
	declarations: [],
	positioning: 'DEFAULT',
	readOnly: false,
	focused: false,
	style: {},
};

export default TableOneAxis;

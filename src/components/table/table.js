import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as lunatic from 'components';
import './table.scss';

class Table extends Component {
	constructor(props) {
		super();
		const minLines = props.lines ? props.lines.min : undefined;
		const maxLines = props.lines ? props.lines.max : undefined;
		this.state = { lines: minLines, minLines, maxLines };
		this.addLine = () => this.setState({ lines: this.state.lines + 1 });
	}

	render() {
		const {
			id: tableId,
			label: tableLabel,
			cells,
			handleChange,
			positioning,
			focused,
		} = this.props;
		const { lines, minLines, maxLines } = this.state;
		const width = `${100 / Math.max(...cells.map(line => line.length))}%`;
		const Button = lunatic.Button;
		return (
			<React.Fragment>
				{tableLabel && (
					<label
						htmlFor={`table-one-axis-${tableId}`}
						id={`table-one-axis-label-${tableId}`}
					>
						{tableLabel}
					</label>
				)}
				<table id={`table-${tableId}`} className="table-lunatic">
					<tbody>
						{(minLines ? cells.slice(0, lines + 1) : cells).map((line, i) => (
							<tr key={`table-${tableId}-line${i}`}>
								{line.map(
									(
										{
											label,
											headerCell,
											colspan,
											rowspan,
											componentType,
											...props
										},
										j
									) => {
										if (componentType) {
											const Component = lunatic[componentType];
											return (
												<td
													key={`table-${tableId}-line${i}-cell-${j}`}
													style={{ width }}
												>
													<Component
														label={label}
														{...props}
														handleChange={console.log}
													/>
												</td>
											);
										}
										const cellOptions = {
											key: `table-${tableId}-line${i}-cell-${j}`,
											style: { width },
											colSpan: colspan || 1,
											rowSpan: rowspan || 1,
										};
										return headerCell ? (
											<th {...cellOptions}>{label}</th>
										) : (
											<td {...cellOptions}>{label}</td>
										);
									}
								)}
							</tr>
						))}
					</tbody>
				</table>
				{minLines && (
					<Button
						label="addLine"
						value="Add a line"
						onClick={this.addLine}
						disabled={minLines && lines >= maxLines}
					/>
				)}
			</React.Fragment>
		);
	}
}

Table.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	//cells: columnsPropTypes.isRequired,
	handleChange: PropTypes.func.isRequired,
	focused: PropTypes.bool,
	style: PropTypes.object,
};

Table.defaultProps = {
	declarations: [],
	focused: false,
	style: {},
};

export default Table;

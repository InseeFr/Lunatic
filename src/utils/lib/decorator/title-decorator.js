import React, { Component } from 'react';

const titleDecorator = WrappedComponent => {
	class TitleComponent extends Component {
		render() {
			const { title } = this.props;
			return (
				<React.Fragment>
					<h1>{title}</h1>
					<WrappedComponent />
				</React.Fragment>
			);
		}
	}
	return TitleComponent;
};

export default titleDecorator;

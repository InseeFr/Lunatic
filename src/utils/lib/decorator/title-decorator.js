import React from 'react';

const titleDecorator = WrappedComponent => {
	const TitleComponent = props => {
		const { title } = props;
		return (
			<>
				<h1>{title}</h1>
				<WrappedComponent />
			</>
		);
	};
	return TitleComponent;
};

export default titleDecorator;

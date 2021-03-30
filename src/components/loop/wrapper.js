import React from 'react';
import Loop from '../loop/component';
import PaginatedLoop from '../loop/paginated-component';
import BlockForLoop from '../loop-constructor/block';

const LoopWrapper = (props) => {
	const { iterations, pagination } = props;
	if (iterations) {
		if (pagination) return <PaginatedLoop {...props} />;
		return <Loop {...props} />;
	}
	return <BlockForLoop {...props} />;
};

export default LoopWrapper;

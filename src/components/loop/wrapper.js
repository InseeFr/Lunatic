import React from 'react';
import Loop from './component';
import BlockForLoop from '../loop-constructor/block';

const LoopWrapper = (props) => {
	const { iterations } = props;
	if (iterations) {
		return <Loop {...props} />;
	}
	return <BlockForLoop {...props} />;
};

export default LoopWrapper;

import React, { useState } from 'react';
import * as lunatic from 'components';

// const { id, componentType } = component;
// 					const Component = lunatic[componentType];

function Row({ components, valueMap = {} }) {
	const what = components.map(function (component) {
		const { response } = component;
		const { name } = response;
		const value = valueMap[name];

		return null;
	});

	return null;
}

function LoopOrchestrator({ components, nbRows, handleChange, valueMap }) {
	return new Array(nbRows).fill(0).map(function (_, index) {
		return <Row key={index} components={components} valueMap={valueMap} />;
	});
}

export default LoopOrchestrator;

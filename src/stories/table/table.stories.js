import React from 'react';
import Orchestrator from '../utils/orchestrator';
import source from './source.json';
import data from './data.json';

const TableStory = {
	title: 'table-default',
	component: <Orchestrator source={source} data={data} />,
};

export default TableStory;

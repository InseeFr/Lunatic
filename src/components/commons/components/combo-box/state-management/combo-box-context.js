import React from 'react';

const ComboBoxContext = React.createContext({
	dispatch: (state) => state,
	state: {},
});

export default ComboBoxContext;

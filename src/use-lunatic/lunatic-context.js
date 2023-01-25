import { createContext } from 'react';

const lunaticContext = {
	custom: undefined, // object with custom components with their names as keys (need TS ;)
};

export default createContext(lunaticContext);

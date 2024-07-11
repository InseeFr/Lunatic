type LoggerMessage =
	| {
			type: 'ERROR';
			error: Error;
	  }
	| {
			type: 'WARNING';
			message: string;
	  };

export type LunaticLogger = (msg: LoggerMessage) => void;

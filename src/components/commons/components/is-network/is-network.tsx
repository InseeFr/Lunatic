import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import useOnlineStatus from './use-online-status';
import { NetworkIcon } from '../../icons';

function getTitle(online?: boolean) {
	return `Network ${online ? 'on' : 'off'}`;
}

type Props = {
	notify?: (v: boolean) => void;
	className?: string;
};

function IsNetwork({ notify = () => null, className }: Props) {
	const [online, setOnline] = useState(window.navigator.onLine);
	const onlineCallback = useCallback(
		function () {
			setOnline(true);
			notify?.(true);
		},
		[notify]
	);
	const offlineCallback = useCallback(
		function () {
			setOnline(false);
			notify?.(false);
		},
		[notify]
	);

	useOnlineStatus(onlineCallback, offlineCallback);

	return (
		<div
			className={classnames('is-network', className, { online })}
			title={getTitle(online)}
		>
			<NetworkIcon />
		</div>
	);
}

export default IsNetwork;

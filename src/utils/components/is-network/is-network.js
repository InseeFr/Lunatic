import React, { useCallback, useState } from 'react';
import classnames from 'classnames';
import useOnlineStatus from './use-online-status';
import NetworkIcon from '../../icons/network.icon';

function IsNetwork({ notify = () => null, className }) {
	const [online, setOnline] = useState(window.navigator.onLine);
	const onlineCallback = useCallback(function () {
		setOnline(true);
		notify(true);
	}, []);
	const offlineCallback = useCallback(function () {
		setOnline(false);
		notify(false);
	}, []);

	useOnlineStatus(onlineCallback, offlineCallback);

	return (
		<div className={classnames('is-network', className, { online })}>
			<NetworkIcon />
		</div>
	);
}

export default IsNetwork;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useState } from 'react';

const LatestV = () => {
	const [appVersion, setAppVersion] = useState('');

	{
		/* Fetch latest version */
	}
	useEffect(() => {
		const fetchVersion = async () => {
			const version = __APP_VERSION__;
			setAppVersion(version);
		};

		fetchVersion();
	}, []);

	return (
		<>
			<p className="rgbEffect font-semibold text-xl">Current v{appVersion}</p>
		</>
	);
};

export default LatestV;

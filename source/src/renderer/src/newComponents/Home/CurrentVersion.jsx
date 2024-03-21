/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useEffect, useState } from 'react';

const LatestV = () => {
	const [appVersion, setAppVersion] = useState('');

	useEffect(() => {
		const fetchVersion = async () => {
			const version = __APP_VERSION__;
			setAppVersion(version);
		};

		fetchVersion();
	}, []);

	return (
		<>
			<p className="text-white font-semibold text-xl">
				latest version
				<span className="text-green-500 font-semibold text-xl">
					{' '}
					v{appVersion}
				</span>
			</p>
		</>
	);
};

export default LatestV;

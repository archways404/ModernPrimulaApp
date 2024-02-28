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
			<p className="rgbEffect font-semibold mb-2">v{appVersion}</p>
			{/* RGB TEXT */}
			<style>
				{`
          @keyframes rgbTextEffect {
            0% { color: #ff0000; } /* Red */
            33% { color: #00ff00; } /* Green */
            66% { color: #0000ff; } /* Blue */
            100% { color: #ff0000; } /* Red again */
          }

          .rgbEffect {
            animation: rgbTextEffect 10s infinite linear;
          }
        `}
			</style>
			{/* RGB EFFECT */}
			<style>
				{`
              @keyframes rgbEffect {
                0% { background-color: #ff0000; } /* Red */
                33% { background-color: #00ff00; } /* Green */
                66% { background-color: #0000ff; } /* Blue */
                100% { background-color: #ff0000; } /* Red */
              }
              
              .rgb-hover {
                animation: rgbEffect 3s infinite;
              }
            `}
			</style>
		</>
	);
};

export default LatestV;

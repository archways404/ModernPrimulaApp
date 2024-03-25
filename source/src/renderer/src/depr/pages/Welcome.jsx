/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';
import ToS from '../components/ToS';

const Welcome = () => {
	let navigate = useNavigate();

	return (
		<>
			<div className="flex flex-col justify-between items-center min-h-screen bg-zinc-900 text-gray-300 text-center px-4 w-full">
				<div className="space-y-8 mt-40">
					<Logo />
					<CurrentVersion />
					<button
						className="mt-8 bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-full transition ease-in-out duration-300"
						onClick={() => navigate('/home')}>
						Continue
					</button>
				</div>
				<ToS className="mb-8" />
			</div>
		</>
	);
};

export default Welcome;

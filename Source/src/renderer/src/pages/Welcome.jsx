/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';
import ToS from '../components/ToS';

const Welcome = () => {
	let navigate = useNavigate();
	return (
		<>
			<div className="flex flex-col justify-between items-center min-h-screen bg-gray-800 text-center px-4 w-full">
				<ToastContainer />
				<div className="space-y-4">
					<Logo />
					<CurrentVersion />
					<br></br>
					<button
						className="mt-20 rgb-hover text-white font-bold py-2 px-4 rounded transition-colors duration-300"
						onClick={() => navigate('/home')}>
						Continue
					</button>
				</div>
				<ToS />
			</div>
		</>
	);
};

export default Welcome;

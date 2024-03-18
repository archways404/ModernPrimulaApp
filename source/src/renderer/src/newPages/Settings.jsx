import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../newComponents/Home/Logo';
import ToS from '../newComponents/Welcome/ToS';
import LoginComponent from '../newComponents/Settings/LoginComponent';
import DetailsComponent from '../newComponents/Settings/DetailsComponent';

import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import HomeBTN from '@heroicons/react/24/solid/HomeIcon';
import SettingsBTN from '@heroicons/react/24/solid/Cog6ToothIcon';

const Settings = () => {
	const navigate = useNavigate();

	return (
		<div className="relative min-h-screen bg-zinc-900 text-white px-4">
			<div className="absolute top-0 left-2">
				<div className="mx-4 my-4">
					<Logo />
				</div>
			</div>
			<ToastContainer />

			{/* Main Content container */}
			<div className="flex flex-col justify-between h-full pt-16 pb-24 mx-24">
				{/* Row container for side-by-side components */}
				<div className="flex flex-row justify-between space-x-4">
					{/* Left Column for LoginComponent */}
					<div className="flex-1 px-4 mt-4">
						<h1 className="text-xl font-bold pb-10">Login details</h1>
						<LoginComponent />
					</div>
					{/* Right Column for DetailsComponent */}
					<div className="flex-1 px-4 mt-4">
						<h1 className="text-xl font-bold pb-10">Personal information</h1>
						<DetailsComponent />
					</div>
				</div>
			</div>

			{/* Back button with hover label */}
			<div className="absolute group bottom-48 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/home')}
					className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<BackBTN className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
						Go Back
					</span>
				</button>
			</div>

			{/* Home button with hover label */}
			<div className="absolute group bottom-28 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/home')}
					className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<HomeBTN className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
						Home
					</span>
				</button>
			</div>

			{/* Settings button with hover label */}
			<div className="absolute group bottom-6 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/settings')}
					className="flex items-center text-green-500 hover:text-green-500 font-bold p-2 ml-2 transform scale-125 hover:scale-125 transition ease-in-out duration-300">
					<SettingsBTN className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded group-hover:flex">
						Settings
					</span>
				</button>
			</div>

			{/* Terms of Service */}
			<div className="absolute bottom-0 left-0 right-0 mx-auto">
				<div className="text-center">
					<ToS />
				</div>
			</div>
		</div>
	);
};

export default Settings;

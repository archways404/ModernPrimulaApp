import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../newComponents/Home/Logo';
import ToS from '../newComponents/Welcome/ToS';

import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import NewTicketBTN from '@heroicons/react/24/solid/DocumentPlusIcon';
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

			{/* Content container */}
			<div className="flex flex-col justify-between h-full pt-16 pb-24 mx-24">
				<div className="px-4 mt-4">
					<h1 className="text-xl font-bold">Settings</h1>
					<p className="mt-2">
						This is the summary text that gives users an insight into the
						content of the page...
					</p>
				</div>

				<div className="px-4 mt-4">
					<h2 className="text-lg font-bold">RSS Feed</h2>
					{/* You would populate this container with your RSS feed content */}
					<div className="mt-2 bg-zinc-900 p-4 rounded-lg">
						content goes here...
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

			{/* New Ticket button with hover label */}
			<div className="absolute group bottom-28 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/NewTicket')}
					className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<NewTicketBTN className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
						Create a ticket
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

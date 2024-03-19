import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../newComponents/Ticket/Logo';
import ToS from '../newComponents/Welcome/ToS';

import SetupCredentials from '../newComponents/Ticket/SetupCredentials';
import SetupInformation from '../newComponents/Ticket/SetupInformation';
import DatePicker from '../newComponents/Ticket/DatePicker';

import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import NewTicketBTN from '@heroicons/react/24/solid/DocumentPlusIcon';
import SettingsBTN from '@heroicons/react/24/solid/Cog6ToothIcon';

const Ticket = () => {
	const navigate = useNavigate();
	const username = localStorage.getItem('username');
	const password = localStorage.getItem('password');
	const name = localStorage.getItem('name');
	const salary = localStorage.getItem('salary');

	// Determine initial display states based on localStorage
	const [displayLoginForm, setDisplayLoginForm] = useState(
		!username || !password
	);
	const [displayInputForm, setDisplayInputForm] = useState(
		username && password && (!name || !salary)
	);

	useEffect(() => {
		ipcRenderer.on('verifyLoginDetails-complete', (event, arg) => {
			console.log(arg);
			if (arg.status === 'success') {
				localStorage.setItem('username', arg.username);
				localStorage.setItem('password', arg.password);
				setDisplayLoginForm(false);
				setDisplayInputForm(true);
				window.location.reload();
			} else {
				console.log('username and/or password is not defined or incorrect');
				console.log('status: ', arg.status);
			}
		});

		return () => {
			ipcRenderer.removeAllListeners('verifyLoginDetails-task-complete');
		};
	}, []);

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
					{displayLoginForm ? (
						<div className="pt-20">
							<SetupCredentials />
						</div>
					) : displayInputForm ? (
						<div className="pt-20">
							<SetupInformation />
						</div>
					) : (
						<DatePicker />
					)}
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
					className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<SettingsBTN className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
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

export default Ticket;

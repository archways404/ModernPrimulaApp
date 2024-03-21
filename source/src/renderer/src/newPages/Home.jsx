import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../newComponents/Home/Logo';
import ToS from '../newComponents/Welcome/ToS';
import NewsFeed from '../newComponents/Home/NewsFeed';

import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import NewTicketBTN from '@heroicons/react/24/solid/DocumentPlusIcon';
import SettingsBTN from '@heroicons/react/24/solid/Cog6ToothIcon';

import github from '../assets/github.svg';
import mail from '../assets/email.svg';

const Home = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		checkForUpdates();

		ipcRenderer.on('update_available', () => {
			console.log('update_available');
			setUpdateAvailable(true);
			navigate('/');
		});

		ipcRenderer.on('update-not-available', () => {
			console.log('update-not-available');
		});

		ipcRenderer.on('update-error', (err) => {
			console.log('update-error', err);
		});

		return () => {
			ipcRenderer.removeAllListeners('update_available');
		};
	}, []);

	const checkForUpdates = () => {
		ipcRenderer.send('check_for_updates');
		console.log('update_check');
	};

	const openInBrowser = (url) => {
		window.electron.ipcRenderer.send('open-in-browser', url);
	};

	return (
		<div className="relative min-h-screen bg-zinc-900 text-white px-4">
			<div className="absolute top-0 left-2">
				<div className="mx-4 my-4">
					<Logo />
				</div>
			</div>
			{/* Content container */}
			<div className="flex flex-col justify-between h-full pt-16 mx-24">
				<div className="px-4 mt-4">
					<h1 className="text-xl font-bold">
						Welcome to <span className="gradient-text">ModernPrimula</span>
					</h1>
					<NewsFeed />
					{/* Button for test of TicketResult */}
					{/* 
          <button
						onClick={() => navigate('/ticketresult')}
						className="flex items-center text-zinc-900 hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
						<BackBTN className="h-6 w-6" />
					</button> 
          */}
				</div>
			</div>
			{/* Developer credit section */}
			<div className="pt-16 mx-24 bg-zinc-900 p-4 rounded-lg flex flex-col items-center justify-center text-center">
				<p>
					This software is created & maintained by{' '}
					<strong className="gradient-text">archways404</strong>
				</p>
				<div className="flex items-center justify-center mt-4 gap-4">
					<a
						href="mailto:archways@gmx.us"
						className="text-green-500 hover:text-green-700">
						<img
							className="w-7 h-7"
							src={mail}></img>
					</a>
					<a
						onClick={(e) => {
							e.preventDefault();
							openInBrowser('https://github.com/archways404');
						}}
						className="text-green-500 hover:text-green-700 cursor-pointer">
						<img
							className="w-6 h-6"
							src={github}
							alt="GitHub"
						/>
					</a>
				</div>
			</div>
			{/* Back button with hover label */}
			<div className="absolute group bottom-48 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/')}
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
					onClick={() => navigate('/ticket')}
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

export default Home;

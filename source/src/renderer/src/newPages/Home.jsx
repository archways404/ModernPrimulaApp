import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../newComponents/Home/Logo';
import ToS from '../newComponents/Welcome/ToS';

import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import NewTicketBTN from '@heroicons/react/24/solid/DocumentPlusIcon';
import SettingsBTN from '@heroicons/react/24/solid/Cog6ToothIcon';

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

	return (
		<div className="relative min-h-screen bg-zinc-900 text-white px-4">
			{' '}
			<div className="absolute top-0 left-2">
				<div className=" mx-4 my-4">
					<Logo />
				</div>
			</div>
			{/* Absolute container for the settings button at the bottom right corner with some margin */}
			<div className="absolute bottom-6 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/settings')}
					className="mt-8 text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<SettingsBTN className="h-6 w-6" />
				</button>
			</div>
			<div className="absolute bottom-28 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/')}
					className="mt-8 text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<NewTicketBTN className="h-6 w-6" />
				</button>
			</div>
			<div className="absolute bottom-48 left-0 mb-4 mr-2">
				<button
					onClick={() => navigate('/')}
					className="mt-8 text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<BackBTN className="h-6 w-6" />
				</button>
			</div>
			<div className="absolute bottom-0 left-0 right-0 mx-auto">
				<div className="text-center">
					<ToS />
				</div>
			</div>
		</div>
	);
};

export default Home;

/*


<div className="flex flex-col items-center space-y-4">
  <button
    onClick={() => navigate('/automatic')}
    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition ease-in-out duration-300">
    Create a ticket
  </button>

  <button
    onClick={() => navigate('/settings')}
    className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition ease-in-out duration-300">
    Settings
  </button>
</div>

*/

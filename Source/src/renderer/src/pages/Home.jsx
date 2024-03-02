import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';
import ToS from '../components/ToS';

const Home = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [updateDownloaded, setUpdateDownloaded] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		checkForUpdates();

		ipcRenderer.on('update_available', () => {
			console.log('update_available');
			setUpdateAvailable(true);
		});

		ipcRenderer.on('update-not-available', () => {
			console.log('update-not-available');
		});

		ipcRenderer.on('update-error', (err) => {
			console.log('update-error', err);
		});

		ipcRenderer.on('update_downloaded', () => {
			console.log('update_downloaded');
			setUpdateDownloaded(true);
		});

		return () => {
			ipcRenderer.removeAllListeners('update_available');
			ipcRenderer.removeAllListeners('update_downloaded');
		};
	}, []);

	const checkForUpdates = () => {
		ipcRenderer.send('check_for_updates');
		console.log('update_check');
	};

	const downloadUpdate = () => {
		ipcRenderer.send('download_update');
		console.log('download_update');
	};

	const restartApp = () => {
		ipcRenderer.send('restart_app');
		console.log('restart_app');
	};

	return (
		<div className="flex flex-col items-center justify-between min-h-screen bg-gray-800 text-white px-4">
			{/* Logo at the top with some margin below it */}
			<div className="mt-10 mb-1">
				<Logo />
				<div className="text-center">
					<CurrentVersion />
				</div>
			</div>

			{/* Conditional rendering for the update buttons with adjusted margin */}
			{updateAvailable && (
				<div className="mb-5">
					{!updateDownloaded ? (
						<button
							className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5"
							onClick={downloadUpdate}>
							Download Update
						</button>
					) : (
						<button
							className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-5"
							onClick={restartApp}>
							Restart to Install Update
						</button>
					)}
				</div>
			)}

			{/* Buttons with increased margin and corrected classes */}
			<div className="flex flex-col items-center space-y-4 mb-5">
				<button
					onClick={() => navigate('/automatic')}
					className={`rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 ${
						updateAvailable
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-gray-700'
					}`}
					disabled={updateAvailable}>
					Automatic
				</button>

				<button
					onClick={() => navigate('/manual')}
					className={`mt-20 rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 ${
						updateAvailable
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-gray-700'
					}`}
					disabled={updateAvailable}>
					Manual
				</button>

				<button
					onClick={() => navigate('/settings')}
					className={`mt-20 rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 ${
						updateAvailable
							? 'opacity-50 cursor-not-allowed'
							: 'hover:bg-gray-700'
					}`}
					disabled={updateAvailable}>
					Settings
				</button>
			</div>

			{/* Terms of Service acting as a footer with additional margin */}
			<div className="mt-10">
				<ToS />
			</div>
		</div>
	);
};

export default Home;

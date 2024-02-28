import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../components/Logo';
import LatestV from '../components/LatestV';
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
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center p-10">
			<Logo />
			<br></br>
			{updateAvailable ? (
				!updateDownloaded ? (
					<button
						className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
						onClick={downloadUpdate}>
						Download Update
					</button>
				) : (
					<button
						className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-2"
						onClick={restartApp}>
						Restart to Install Update
					</button>
				)
			) : (
				<LatestV />
			)}
			<br></br>
			<div className="flex flex-col items-center space-y-4">
				<button
					onClick={() => navigate('/automatic')}
					className={`className="mt-20 rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 ${
						updateAvailable
							? 'opacity-50 cursor-not-allowed'
							: 'hover:rgb-background'
					}`}
					disabled={updateAvailable}>
					<span
						className={`rgb-text ${updateAvailable ? '' : 'hover:rgb-text'}`}>
						Automatic
					</span>
				</button>

				<button
					onClick={() => navigate('/manual')}
					className={`className="mt-20 rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 ${
						updateAvailable
							? 'opacity-50 cursor-not-allowed'
							: 'hover:rgb-background'
					}`}
					disabled={updateAvailable}>
					Manual
				</button>
				<button
					onClick={() => navigate('/settings')}
					className={`className="mt-20 rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 ${
						updateAvailable
							? 'opacity-50 cursor-not-allowed'
							: 'hover:rgb-background'
					}`}
					disabled={updateAvailable}>
					Settings
				</button>
			</div>
		</div>
	);
};

export default Home;

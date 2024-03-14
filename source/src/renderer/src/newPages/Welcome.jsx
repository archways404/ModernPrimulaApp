import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

import Logo from '../newComponents/Welcome/Logo';
import CurrentVersion from '../newComponents/Welcome/CurrentVersion';
import ToS from '../newComponents/Welcome/ToS';

const Welcome = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [updateDownloaded, setUpdateDownloaded] = useState(false);

	let navigate = useNavigate();

	useEffect(() => {
		checkForUpdates();

		ipcRenderer.on('update_available', () => {
			console.log('Update available');
			setUpdateAvailable(true);
		});

		ipcRenderer.on('update-not-available', () => {
			console.log('No update available');
		});

		ipcRenderer.on('update-error', (err) => {
			console.error('Update error', err);
		});

		ipcRenderer.on('update_downloaded', () => {
			console.log('Update downloaded');
			setUpdateDownloaded(true);
		});

		return () => {
			ipcRenderer.removeAllListeners('update_available');
			ipcRenderer.removeAllListeners('update_downloaded');
		};
	}, []);

	const checkForUpdates = () => {
		ipcRenderer.send('check_for_updates');
	};

	const downloadUpdate = () => {
		ipcRenderer.send('download_update');
	};

	const restartApp = () => {
		ipcRenderer.send('restart_app');
	};

	return (
		<>
			<div className="flex flex-col justify-between items-center min-h-screen bg-zinc-900 text-gray-300 text-center px-4 w-full">
				<div className="space-y-8 mt-40">
					<Logo />
					{updateAvailable && !updateDownloaded ? (
						<>
							<p>Update is available!</p>
							<button
								className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition ease-in-out duration-300"
								onClick={downloadUpdate}>
								Download Update
							</button>
						</>
					) : null}
					{updateDownloaded ? (
						<>
							<p>Update downloaded. Restart to install.</p>
							<button
								className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full transition ease-in-out duration-300"
								onClick={restartApp}>
								Restart to Install
							</button>
						</>
					) : null}
					{!updateAvailable && !updateDownloaded ? (
						<>
							<CurrentVersion />
							<button
								className="mt-8 bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-full transition ease-in-out duration-300"
								onClick={() => navigate('/home')}>
								Continue
							</button>
						</>
					) : null}
				</div>
				<ToS className="mb-8" />
			</div>
		</>
	);
};

export default Welcome;

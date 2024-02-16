import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const Home = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [updateDownloaded, setUpdateDownloaded] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		ipcRenderer.on('update_available', () => {
			console.log('update_available');
			setUpdateAvailable(true);
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
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center pt-20 pr-10 pl-20">
			<h1 className="text-6xl font-bold tracking-tighter mb-10">
				<span className="text-red-500">M</span>
				<span className="text-yellow-500">o</span>
				<span className="text-green-500">d</span>
				<span className="text-blue-500">e</span>
				<span className="text-indigo-500">r</span>
				<span className="text-purple-500">n</span>
				<span className="text-pink-500">P</span>
				<span className="text-red-500">r</span>
				<span className="text-yellow-500">i</span>
				<span className="text-green-500">m</span>
				<span className="text-blue-500">u</span>
				<span className="text-indigo-500">l</span>
				<span className="text-purple-500">a</span>
			</h1>
			<div className="flex flex-col items-center space-y-4">
				<div>
					{updateAvailable && !updateDownloaded && (
						<button onClick={downloadUpdate}>Download Update</button>
					)}
					{updateDownloaded && (
						<button onClick={restartApp}>Restart to Install Update</button>
					)}
					{!updateAvailable && !updateDownloaded && (
						<button onClick={checkForUpdates}>Check for Updates</button>
					)}
				</div>{' '}
				<button
					onClick={() => navigate('/automatic')}
					className={`bg-red-500 text-black w-32 h-8 rounded-xl ${
						updateAvailable ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={updateAvailable}>
					Automatic
				</button>
				<button
					onClick={() => navigate('/home')}
					className={`bg-yellow-500 text-black w-32 h-8 rounded-full ${
						updateAvailable ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={updateAvailable}>
					Manual
				</button>
				<button
					onClick={() => navigate('/settings')}
					className={`bg-green-500 text-black w-32 h-8 rounded-t-3xl ${
						updateAvailable ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={updateAvailable}>
					Settings
				</button>
			</div>
		</div>
	);
};

export default Home;

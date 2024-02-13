import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const Home = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		ipcRenderer.on('update_available', () => {
			setUpdateAvailable(true);
		});

		ipcRenderer.on('update_downloaded', () => {
			// Code to prompt the user to install the update can go here
		});

		// Cleanup listeners when component unmounts or updates
		return () => {
			ipcRenderer.removeAllListeners('update_available');
			ipcRenderer.removeAllListeners('update_downloaded');
		};
	}, []);

	const restartApp = () => {
		ipcRenderer.send('restart_app');
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
				{updateAvailable && (
					<button
						className="mt-8 bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded"
						onClick={restartApp}>
						Update & Restart
					</button>
				)}
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

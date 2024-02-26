import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
const { ipcRenderer } = window.require('electron');

const Home = () => {
	const [updateAvailable, setUpdateAvailable] = useState(false);
	const [updateDownloaded, setUpdateDownloaded] = useState(false);
	const [appVersion, setAppVersion] = useState('');

	const navigate = useNavigate();

	// Welcome.jsx
	useEffect(() => {
		const fetchVersion = async () => {
			const version = __APP_VERSION__;
			setAppVersion(version);
		};

		fetchVersion();
	}, []);

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
			<style>
				{`
            @keyframes rgbTextEffect {
              0% { color: #ff0000; } /* Red */
              33% { color: #00ff00; } /* Green */
              66% { color: #0000ff; } /* Blue */
              100% { color: #ff0000; } /* Red again */
            }

            .rgbEffect {
              animation: rgbTextEffect 10s infinite linear;
            }
          `}
			</style>

			<h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter leading-none">
				<span className="rgbEffect">M</span>
				<span className="rgbEffect">o</span>
				<span className="rgbEffect">d</span>
				<span className="rgbEffect">e</span>
				<span className="rgbEffect">r</span>
				<span className="rgbEffect">n</span>
				<span className="rgbEffect">P</span>
				<span className="rgbEffect">r</span>
				<span className="rgbEffect">i</span>
				<span className="rgbEffect">m</span>
				<span className="rgbEffect">u</span>
				<span className="rgbEffect">l</span>
				<span className="rgbEffect">a</span>
			</h1>
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
				<p className="text-green-500 font-semibold mb-2">
					Latest version v{appVersion}
				</p>
			)}
			<div className="flex flex-col items-center space-y-4">
				<button
					onClick={() => navigate('/automatic')}
					className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ${
						updateAvailable ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={updateAvailable}>
					Automatic
				</button>
				<button
					onClick={() => navigate('/manual')}
					className={`bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-full ${
						updateAvailable ? 'opacity-50 cursor-not-allowed' : ''
					}`}
					disabled={updateAvailable}>
					Manual
				</button>
				<button
					onClick={() => navigate('/settings')}
					className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ${
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

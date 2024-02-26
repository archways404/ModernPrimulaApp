/* eslint-disable no-unused-vars */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Welcome = () => {
	let navigate = useNavigate();

	const [appVersion, setAppVersion] = useState('');

	// Welcome.jsx
	useEffect(() => {
		const fetchVersion = async () => {
			const version = __APP_VERSION__;
			setAppVersion(version);
		};

		fetchVersion();
	}, []);

	return (
		<>
			<div
				key="1"
				className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-center px-4">
				<ToastContainer />
				<h1 className="text-9xl font-bold tracking-tighter">
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
				<p className="text-2xl font-bold text-white tracking-tighter">
					v{appVersion}
				</p>

				<button
					className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => navigate('/home')}>
					Proceed
				</button>
			</div>
		</>
	);
};

export default Welcome;

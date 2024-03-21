import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { ipcRenderer } = window.require('electron');

const Results = () => {
	const [storedData, setStoredData] = useState([]); // Initialize state to store the results

	const navigate = useNavigate();

	useEffect(() => {
		// Retrieve the results from sessionStorage
		const storedResults = sessionStorage.getItem('result');
		if (storedResults) {
			console.log('storedResults: ', storedResults);
			try {
				const results = JSON.parse(storedResults);
				setStoredData(results); // Assuming `results` is appropriately structured
			} catch (error) {
				console.error('Error parsing JSON from sessionStorage:', error);
				// Handle error or set to a default value
				setStoredData([]);
			}
		}
	}, []);

	const handleRemove = async (e) => {
		e.preventDefault();
		console.log('removeTicket');
		ipcRenderer.send('removeTicket');
		//navigate('/home');
	};

	const handleSend = async (e) => {
		e.preventDefault();
		console.log('sendTicket');
		ipcRenderer.send('sendTicket');
		//navigate('/home');
	};

	useEffect(() => {
		const handleDetails = (event, details) => {
			console.log('details:', details);
			navigate('/home');
		};

		// Set up the event listener
		ipcRenderer.on('details', handleDetails);

		// Clean up
		return () => {
			ipcRenderer.removeListener('details', handleDetails);
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white pt-10 px-10">
			<h1 className="text-5xl font-bold tracking-tighter mb-12">
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

			<div className="flex flex-wrap justify-center gap-5 mb-10">
				{storedData.map((result, index) => (
					<div
						key={index}
						className="flex flex-col p-4 bg-gray-100 shadow-md rounded-lg min-w-[200px] max-w-sm text-gray-800">
						<p>
							<span className="font-semibold">Löneart:</span> {result.Löneart}
						</p>
						<p>
							<span className="font-semibold">Datum:</span> {result.From}
						</p>
						<p>
							<span className="font-semibold">Timmar:</span> {result.Antal}
						</p>
						<p>
							<span className="font-semibold">Pris:</span> {result.Belopp}
						</p>
					</div>
				))}
			</div>

			<div className="space-x-4 mb-5">
				<button
					onClick={handleRemove}
					className="bg-red-500 hover:bg-red-600 text-white font-semibold w-32 h-10 rounded-xl shadow">
					REMOVE
				</button>

				<button
					onClick={handleSend}
					className="bg-green-500 hover:bg-green-600 text-white font-semibold w-32 h-10 rounded-xl shadow">
					SEND
				</button>

				<button
					onClick={() => navigate('/home')}
					className="bg-blue-500 hover:bg-blue-600 text-white font-semibold w-32 h-10 rounded-xl shadow">
					Home
				</button>
			</div>
		</div>
	);
};

export default Results;

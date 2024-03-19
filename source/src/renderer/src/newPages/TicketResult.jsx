import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

import Logo from '../newComponents/Home/Logo';
import ToS from '../newComponents/Welcome/ToS';

import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import RemoveTicketBTN from '@heroicons/react/24/solid/TrashIcon';
import SubmitTicketBTN from '@heroicons/react/24/solid/PaperAirplaneIcon';

const TicketResult = () => {
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
		<div className="relative max-h-screen bg-zinc-900 text-white px-4">
			<div className="absolute top-0 left-2">
				<div className="mx-4 my-4">
					<Logo />
				</div>
			</div>

			{/* Content container */}
			<div className="mx-24 overflow-auto">
				<div className="flex items-center justify-center px-4">
					<table className="min-w-full text-white">
						<thead>
							<tr>
								<th className="p-1 bg-zinc-800 shadow-md">Löneart</th>
								<th className="p-1 bg-zinc-800 shadow-md">Datum</th>
								<th className="p-1 bg-zinc-800 shadow-md">Timmar</th>
								<th className="p-1 bg-zinc-800 shadow-md">Pris</th>
							</tr>
						</thead>
						<tbody>
							{storedData.map((result, index) => (
								<tr
									key={index}
									className="bg-zinc-800 shadow-md">
									<td className="p-1">{result.Löneart}</td>
									<td className="p-1">{result.From}</td>
									<td className="p-1">{result.Antal}</td>
									<td className="p-1">{result.Belopp}</td>
								</tr>
							))}
						</tbody>
					</table>
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

			{/* Remove ticket button with hover label */}
			<div className="absolute group bottom-28 left-0 mb-4 mr-2">
				<button
					onClick={handleRemove}
					className="flex items-center text-red-400 hover:text-red-700 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<RemoveTicketBTN className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
						Remove Ticket
					</span>
				</button>
			</div>

			{/* Submit ticket button with hover label */}
			<div className="absolute group bottom-6 left-0 mb-4 mr-2">
				<button
					onClick={handleSend}
					className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
					<SubmitTicketBTN className="h-6 w-6" />
					{/* Hover label */}
					<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
						Submit Ticket
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

export default TicketResult;

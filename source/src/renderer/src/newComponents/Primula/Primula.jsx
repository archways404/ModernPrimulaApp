import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

import AddBTN from '@heroicons/react/24/solid/PlusIcon';
import SendBTN from '@heroicons/react/24/solid/CheckIcon';
import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import DeleteBTN from '@heroicons/react/24/solid/TrashIcon';

const Primula = () => {
	const [inputGroups, setInputGroups] = useState([]);
	const [renderForm, setRenderForm] = useState(true);
	const [renderMFA, setRenderMFA] = useState(false);
	const [mfaCode, setMfaCode] = useState('');
	const [renderEMP, setRenderEMP] = useState(false);
	const [empOptions, setEmpOptions] = useState([]);
	const [empSelected, setEmpSelected] = useState(null);
	const [renderResult, setRenderResult] = useState(false);
	const [resValues, setResValues] = useState({});
	const [showLoading, setShowLoading] = useState(false);

	let navigate = useNavigate();

	// Fetch schedule
	useEffect(() => {
		setShowLoading(true);
		ipcRenderer.on('fetchSchedule-task-complete', (event, arg) => {
			console.log(arg);
			const formattedData = arg.map((item) => {
				const parts = item.split(',');
				return { Date: parts[0], Hours: parts[1] };
			});
			setInputGroups(formattedData);
			setShowLoading(false);
		});

		// Clean up
		return () => {
			ipcRenderer.removeAllListeners('fetchSchedule-task-complete');
		};
	}, []);

	// Form addEntry
	const handleAddRow = () => {
		setInputGroups([...inputGroups, { Date: '', Hours: '' }]);
	};

	// Form change
	const handleInputChange = (index, field, value) => {
		const updatedGroups = [...inputGroups];
		updatedGroups[index][field] = value;
		setInputGroups(updatedGroups);
	};

	// Form submit
	const handleSubmit = () => {
		setRenderForm(false);
		setShowLoading(true);
		console.log('Submitting:', inputGroups);
		const username = localStorage.getItem('username');
		const password = localStorage.getItem('password');
		const month = localStorage.getItem('month');
		const salary = localStorage.getItem('salary');
		ipcRenderer.send('start-formSubmit-task', {
			data: inputGroups,
			username: username,
			password: password,
			month: month,
			salary: salary,
		});
	};

	// Form delete
	const handleDelete = (index) => {
		const updatedGroups = inputGroups.filter((_, i) => i !== index);
		setInputGroups(updatedGroups);
	};

	// MFA
	useEffect(() => {
		const handleMFA = (event, data) => {
			console.log('MFA code received:', data);
			setMfaCode(data);
			setShowLoading(false);
			setRenderMFA(true);
		};

		// Set up the event listener
		ipcRenderer.on('MFA', handleMFA);

		// Clean up
		return () => {
			ipcRenderer.removeListener('MFA', handleMFA);
		};
	}, []);

	// EMP
	useEffect(() => {
		const handleEMP = (event, getOptions) => {
			console.log('EMPDATA:', getOptions);
			const processedOptions = getOptions.map((option) => {
				const [value, text] = option;
				const displayText = text; // Adjust based on your data format
				return { value, displayText };
			});
			setEmpOptions(processedOptions);
			setRenderMFA(false);
			setRenderEMP(true);
			setShowLoading(false);
		};

		// Set up the event listener
		ipcRenderer.on('EMP', handleEMP);

		// Clean up
		return () => {
			ipcRenderer.removeListener('EMP', handleEMP);
		};
	}, []);

	// EMP change
	const handleEmpSelectionChange = (e) => {
		console.log('Selected value:', e.target.value);
		setEmpSelected(e.target.value);
	};

	// EMP submit
	const EMPhandleSubmit = async (e) => {
		e.preventDefault();
		// Check if a value is selected
		if (empSelected === null || empSelected === '') {
			console.log('No option selected');
			return; // Exit if no option is selected
		}
		console.log('EMP_data', empSelected);
		const month = localStorage.getItem('month');
		const salary = localStorage.getItem('salary');

		ipcRenderer.send('EMP_data', {
			empValue: empSelected,
			data: inputGroups,
			month: month,
			salary: salary,
		});
		setRenderEMP(false);
		setShowLoading(true);
	};

	// RESULTS
	useEffect(() => {
		const handleResult = (event, data) => {
			console.log('Data sent:', data);
			sessionStorage.setItem('result', JSON.stringify(data));
			setResValues(data);
			setShowLoading(false);
			navigate('/ticketresult');
		};

		// Set up the event listener
		ipcRenderer.on('Results', handleResult);

		// Clean up
		return () => {
			ipcRenderer.removeListener('Results', handleResult);
		};
	}, []);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen scrollbar-hide">
			{showLoading ? (
				<div className="loading-screen">
					<ColorRing
						visible={true}
						height="80"
						width="80"
						ariaLabel="blocks-loading"
						wrapperStyle={{}}
						wrapperClass="blocks-wrapper"
						colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
					/>
				</div>
			) : (
				<>
					<div className="flex flex-col h-screen pt-20">
						{renderForm && (
							<div className="overflow-auto h-full">
								<div className="flex flex-wrap">
									{/* Header for the first column */}
									<div className="w-full md:w-1/2 p-1">
										<div className="flex justify-between px-1 text-xs text-gray-200 font-bold">
											<span>Date</span>
											<span>Hours</span>
											<span> </span>
										</div>
									</div>

									{/* Header for the second column */}
									<div className="hidden md:block md:w-1/2 p-1">
										<div className="flex justify-between px-1 text-xs text-gray-200 font-bold">
											<span>Date</span>
											<span>Hours</span>
											<span> </span>
										</div>
									</div>

									{/* Input groups */}
									{inputGroups.map((group, index) => (
										<div
											key={index}
											className="w-full md:w-1/2 p-1">
											<div className="bg-zinc-900 p-1 rounded-md mb-1 flex flex-col md:flex-row md:items-center md:justify-between">
												<input
													type="text"
													placeholder="Date"
													className={`flex-1 h-8 px-1 text-xs rounded-md ${
														group.Date ? 'bg-zinc-900' : 'bg-red-700'
													} text-gray-200 w-full`}
													value={group.Date}
													onChange={(e) =>
														handleInputChange(index, 'Date', e.target.value)
													}
												/>
												<input
													type="text"
													placeholder="Hours"
													className={`flex-1 h-8 px-1 text-xs rounded-md ${
														group.Hours ? 'bg-zinc-900' : 'bg-red-700'
													} text-gray-200 w-full ml-2`}
													value={group.Hours}
													onChange={(e) =>
														handleInputChange(index, 'Hours', e.target.value)
													}
												/>
												<button
													onClick={() => handleDelete(index)}
													className="text-red-400 hover:text-red-700 font-bold py-1 px-2 rounded-md transition ease-in-out duration-300 ml-2">
													<DeleteBTN className="h-5 w-5" />
												</button>
											</div>
										</div>
									))}
								</div>
								{/* Back button with hover label */}
								<div className="absolute group bottom-48 left-0 mb-4 mr-2">
									<button
										onClick={() => navigate('/home')}
										className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
										<BackBTN className="h-6 w-6" />
										{/* Hover label */}
										<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
											Go Back
										</span>
									</button>
								</div>

								{/* New row button with hover label */}
								<div className="absolute group bottom-28 left-0 mb-4 mr-2">
									<button
										onClick={handleAddRow}
										className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
										<AddBTN className="h-6 w-6" />
										{/* Hover label */}
										<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
											New row
										</span>
									</button>
								</div>

								{/* Submit ticket button with hover label */}
								<div className="absolute group bottom-6 left-0 mb-4 mr-2">
									<button
										onClick={handleSubmit}
										className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
										<SendBTN className="h-6 w-6" />
										{/* Hover label */}
										<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
											Submit Ticket
										</span>
									</button>
								</div>
							</div>
						)}
						<div>
							{renderMFA && (
								<div>
									<h1 className="text-white text-2xl font-bold tracking-tighter mb-10">
										MFA
									</h1>
									<h1 className="text-white text-4xl font-bold tracking-tighter mb-10">
										{mfaCode}
									</h1>
									{/* Back button with hover label */}
									<div className="absolute group bottom-48 left-0 mb-4 mr-2">
										<button
											onClick={() => navigate('/home')}
											className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
											<BackBTN className="h-6 w-6" />
											{/* Hover label */}
											<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
												Go Back
											</span>
										</button>
									</div>
								</div>
							)}
							{renderEMP && (
								<div>
									<select
										className="w-64 h-12 px-4 rounded-md bg-zinc-900 text-gray-200"
										value={empSelected}
										onChange={handleEmpSelectionChange}>
										<option
											selected
											value=""
											disabled>
											Select option
										</option>
										{empOptions.map((option) => (
											<option
												key={option.value}
												value={option.value}>
												{option.displayText}
											</option>
										))}
									</select>
									<button
										className="bg-green-500 text-white w-24 h-12 rounded-full my-4"
										onClick={EMPhandleSubmit}>
										Select
									</button>
									{/* Back button with hover label */}
									<div className="absolute group bottom-48 left-0 mb-4 mr-2">
										<button
											onClick={() => navigate('/home')}
											className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
											<BackBTN className="h-6 w-6" />
											{/* Hover label */}
											<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
												Go Back
											</span>
										</button>
									</div>
								</div>
							)}
							{renderResult && (
								<div>
									<p>{resValues}</p>
									{/* Back button with hover label */}
									<div className="absolute group bottom-48 left-0 mb-4 mr-2">
										<button
											onClick={() => navigate('/home')}
											className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
											<BackBTN className="h-6 w-6" />
											{/* Hover label */}
											<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
												Go Back
											</span>
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Primula;

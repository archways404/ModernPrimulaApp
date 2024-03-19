import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

import BtnHome from '../components/Buttons/btnHome';
import BtnAdd from '@heroicons/react/24/solid/PlusIcon';
import BtnSend from '@heroicons/react/24/solid/CheckIcon';

import BackBTN from '@heroicons/react/24/solid/ArrowUturnLeftIcon';
import NewTicketBTN from '@heroicons/react/24/solid/DocumentPlusIcon';
import SettingsBTN from '@heroicons/react/24/solid/Cog6ToothIcon';
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
			navigate('/results');
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
					<div className="flex flex-col h-screen">
						{renderForm && (
							<div className="overflow-auto">
								<table className="min-w-full w-auto mx-auto">
									<thead>
										<tr>
											<th className="text-xs font-medium text-gray-200 px-4 py-2 text-left w-1/6">
												Date
											</th>
											<th className="text-xs font-medium text-gray-200 px-4 py-2 text-left w-1/4">
												Hours
											</th>
											<th className="text-xs font-medium text-gray-200 px-4 py-2 text-left w-1/2">
												Actions
											</th>
										</tr>
									</thead>
									<tbody>
										{inputGroups.map((group, index) => (
											<tr
												key={index}
												className="bg-zinc-900">
												<td className="px-2 py-2 whitespace-nowrap text-xs text-gray-200 w-1/6">
													<input
														type="text"
														className="h-8 px-2 text-xs rounded-md bg-zinc-900 text-gray-200 w-full"
														value={group.Date}
														onChange={(e) =>
															handleInputChange(index, 'Date', e.target.value)
														}
													/>
												</td>
												<td className="px-4 py-2 whitespace-nowrap text-xs text-gray-200 w-1/4">
													<input
														type="text"
														className="w-full h-8 px-2 text-xs rounded-md bg-zinc-900 text-gray-200"
														value={group.Hours}
														onChange={(e) =>
															handleInputChange(index, 'Hours', e.target.value)
														}
													/>
												</td>
												<td className="px-4 py-2 whitespace-nowrap text-xs font-medium w-1/2">
													<button
														onClick={() => handleDelete(index)}
														className="flex items-center text-white hover:text-green-500 font-bold p-1 ml-2 transform scale-100 hover:scale-110 transition ease-in-out duration-300">
														<DeleteBTN className="h-4 w-4" />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
						<div className="mt-auto">
							<button
								className="hover:bg-green-700 bg-green-500 text-white font-bold py-2 px-4 rounded"
								onClick={handleAddRow}>
								Add New Row
							</button>
						</div>
					</div>

					<div>
						{renderMFA && (
							<div>
								<h1 className="text-white text-2xl font-bold tracking-tighter mb-10">
									MFA
								</h1>
								<h1 className="text-white text-4xl font-bold tracking-tighter mb-10">
									{mfaCode}
								</h1>
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
							</div>
						)}
						{renderResult && (
							<div>
								<p>{resValues}</p>
							</div>
						)}
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

					{/* New Ticket button with hover label */}
					<div className="absolute group bottom-28 left-0 mb-4 mr-2">
						<button
							onClick={() => navigate('/NewTicket')}
							className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
							<NewTicketBTN className="h-6 w-6" />
							{/* Hover label */}
							<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
								Create a ticket
							</span>
						</button>
					</div>

					{/* Settings button with hover label */}
					<div className="absolute group bottom-6 left-0 mb-4 mr-2">
						<button
							onClick={() => navigate('/settings')}
							className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
							<SettingsBTN className="h-6 w-6" />
							{/* Hover label */}
							<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
								Settings
							</span>
						</button>
					</div>

					<div className="fixed top-4 left-4">
						<BtnHome />
						<div className="pt-10">
							<button
								className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-zinc-900 rgbEffect transition-colors duration-400"
								onClick={handleAddRow}>
								<BtnAdd className="h-5 w-5 mr-2" />
							</button>
							<div className="pt-10">
								<button
									className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-zinc-900 rgbEffect transition-colors duration-400"
									onClick={handleSubmit}>
									<BtnSend className="h-5 w-5 mr-2" />
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Primula;

import { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';
import BtnHome from '../components/Buttons/btnHome';

import BtnAdd from '@heroicons/react/24/solid/PlusIcon';
import BtnSend from '@heroicons/react/24/solid/CheckIcon';

const EditDatesForm = () => {
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
	const handleAddEntry = () => {
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
					{renderForm && (
						<>
							<div className="flex flex-wrap -mx-2 overflow-hidden scrollbar-hide">
								{inputGroups.map((group, index) => (
									<div
										key={index}
										className="p-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
										<div className="flex items-center justify-between space-x-3 mb-2 bg-gray-900 p-3 rounded-lg">
											<div className="flex-1 min-w-0">
												<label className="text-gray-200 text-sm">Date</label>
												<input
													type="text"
													className="w-full h-10 px-3 text-sm rounded-md bg-gray-800 text-gray-200"
													value={group.Date}
													onChange={(e) =>
														handleInputChange(index, 'Date', e.target.value)
													}
												/>
											</div>
											<div className="flex-1 min-w-0">
												<label className="text-gray-200 text-sm">Hours</label>
												<input
													type="text"
													className="w-full h-10 px-3 text-sm rounded-md bg-gray-800 text-gray-200"
													value={group.Hours}
													onChange={(e) =>
														handleInputChange(index, 'Hours', e.target.value)
													}
												/>
											</div>
											<button
												className="hover:bg-red-700 bg-red-500 hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400"
												onClick={() => handleDelete(index)}>
												Delete
											</button>
										</div>
									</div>
								))}
							</div>

							<div>
								<button
									className="rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 mb-2 ml-2 mr-2"
									onClick={handleSubmit}>
									Submit
								</button>
								<button
									className="rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400 mb-2 ml-2 mr-2"
									onClick={handleAddEntry}>
									Add Entry
								</button>
							</div>
						</>
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
							</div>
						)}
						{renderEMP && (
							<div>
								<select
									className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
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
					<div className="fixed top-4 left-4">
						<BtnHome />
						<div className="pt-10">
							<button
								className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-gray-700 rgbEffect transition-colors duration-400"
								onClick={handleAddEntry}>
								<BtnAdd className="h-5 w-5 mr-2" />
							</button>
							<div className="pt-10">
								<button
									className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-gray-700 rgbEffect transition-colors duration-400"
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

export default EditDatesForm;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { ipcRenderer } = window.require('electron');

import EditDatesForm from '../components/EditDatesForm';

const Primulafunction = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const name = localStorage.getItem('name');
		const month = localStorage.getItem('month');
		const salary = localStorage.getItem('salary');

		ipcRenderer.send('start-fetchSchedule-task', {
			name: name,
			month: month,
			salary: salary,
		});
	}, []);

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
			<EditDatesForm />
			<button
				onClick={() => navigate('/home')}
				className="bg-green-500 text-black w-32 h-8 rounded-t-3xl">
				Home
			</button>
		</div>
	);
};

export default Primulafunction;
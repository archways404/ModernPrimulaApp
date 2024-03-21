import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const { ipcRenderer } = window.require('electron');

import EditDatesForm from '../components/EditDatesForm';

import Logo from '../components/Logo';
import CurrentVersion from '../components/CurrentVersion';

const Primulafunction = () => {
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
		<>
			<div className="flex flex-col items-center min-h-screen bg-gray-800 text-white px-4 scrollbar-hide">
				<div className="mt-10 mb-2">
					{' '}
					{/* Reduce bottom margin */}
					<Logo />
					<div className="text-center mb-2 mt-2">
						{' '}
						{/* Adjusted margins */}
						<CurrentVersion />
					</div>
				</div>
				<div className="pl-16 pr-16 scrollbar-hide">
					<EditDatesForm />
				</div>
			</div>
		</>
	);
};

export default Primulafunction;

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const { ipcRenderer } = window.require('electron');

import Primula from '../newComponents/Primula';
import Logo from '../newComponents/Ticket/Logo';
import ToS from '../newComponents/Welcome/ToS';

const PrimulaFunction = () => {
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
			<div className="relative max-h-screen bg-zinc-900 text-white px-4">
				<div className="absolute top-0 left-2">
					<div className="mx-4 my-4">
						<Logo />
					</div>
				</div>

				{/* Content container */}
				<div className="mx-24">
					<div className="flex flex-col items-center bg-zinc-900 text-white px-4 scrollbar-hide">
						<div className="pl-14 pr-14 scrollbar-hide">
							<Primula />
						</div>
					</div>
				</div>

				{/* Terms of Service */}
				<div className="absolute bottom-0 left-0 right-0 mx-auto">
					<div className="text-center">
						<ToS />
					</div>
				</div>
			</div>
		</>
	);
};

export default PrimulaFunction;

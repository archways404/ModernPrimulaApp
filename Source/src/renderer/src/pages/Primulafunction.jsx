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
			<style>
				{`
            @keyframes rgbTextEffect {
              0% { color: #ff0000; } /* Red */
              33% { color: #00ff00; } /* Green */
              66% { color: #0000ff; } /* Blue */
              100% { color: #ff0000; } /* Red again */
            }

            .rgbEffect {
              animation: rgbTextEffect 3s infinite linear;
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

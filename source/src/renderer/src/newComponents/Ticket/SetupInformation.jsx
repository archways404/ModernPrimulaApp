import { useState } from 'react';

import ArrowRight from '@heroicons/react/24/solid/ArrowLongRightIcon';

const SetupInformation = () => {
	const [formName, setFormName] = useState('');
	const [formSalary, setFormSalary] = useState('');

	// Example inside AutomaticForm component
	const handleChangeName = (event) => {
		setFormName(event.target.value);
	};

	const handleChangeSalary = (event) => {
		setFormSalary(event.target.value);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent default form submission behavior
		console.log(formName, formSalary);
		try {
			localStorage.setItem('name', formName);
			localStorage.setItem('salary', formSalary);
			window.location.reload();
		} catch (error) {
			console.error('There was an error submitting the form:', error);
			// Handle error
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col items-center space-y-4">
					{' '}
					<input
						className="w-64 h-12 px-4 rounded-md bg-zinc-900 text-gray-200"
						placeholder="Name"
						type="text"
						onChange={handleChangeName}
					/>
					<input
						className="w-64 h-12 px-4 rounded-md bg-zinc-900 text-gray-200"
						placeholder="Salary"
						type="text"
						onChange={handleChangeSalary}
					/>
					<button
						type="submit"
						className="flex items-center text-white hover:text-green-500 font-bold p-2 ml-2 transform scale-100 hover:scale-125 transition ease-in-out duration-300">
						<ArrowRight className="h-6 w-6" />
						{/* Hover label */}
						<span className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 p-1 text-xs text-white bg-zinc-900 rounded hidden group-hover:flex">
							Next
						</span>
					</button>
				</div>
			</form>
		</>
	);
};

export default SetupInformation;

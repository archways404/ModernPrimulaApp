import { useState } from 'react';

import ArrowRight from '@heroicons/react/24/solid/ArrowLongRightIcon'; // Adjusted for Heroicons v2

const AutomaticForm = () => {
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
						className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
						placeholder="Name"
						type="text"
						onChange={handleChangeName}
					/>
					<input
						className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
						placeholder="Salary"
						type="text"
						onChange={handleChangeSalary}
					/>
					<button
						type="submit"
						className="flex pl-2 pt-1 pb-1 items-center justify-center hover:bg-gray-700 rgbEffect transition-colors duration-400">
						<ArrowRight className="h-7 w-7 mr-2" />
					</button>
				</div>
			</form>
		</>
	);
};

export default AutomaticForm;

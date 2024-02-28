import { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditInformation = () => {
	const storedName = localStorage.getItem('name');
	const storedSalary = localStorage.getItem('salary');
	const [formName, setFormName] = useState(storedName || '');
	const [formSalary, setFormSalary] = useState(storedSalary || '');
	const [showLoading, setShowLoading] = useState(false);

	const handleChangeName = (event) => {
		setFormName(event.target.value);
	};

	const handleChangeSalary = (event) => {
		setFormSalary(event.target.value);
	};

	const handleSubmit = async (e) => {
		setShowLoading(true);
		e.preventDefault(); // Prevent default form submission behavior
		console.log('FormName: ', formName, ' FormSalary: ', formSalary);

		try {
			localStorage.setItem('name', formName);
			localStorage.setItem('salary', formSalary);
			setShowLoading(false);

			// Show a success toast notification
			toast.success('Data successfully updated!', {
				position: toast.POSITION.TOP_CENTER,
			});
		} catch (error) {
			setShowLoading(false);
			console.error('There was an error submitting the form:', error);

			// Optionally, show an error toast notification
			toast.error('Failed to update data.', {
				position: toast.POSITION.TOP_CENTER,
			});
		}
	};

	return (
		<div className="flex flex-col items-center space-y-4">
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
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col items-center space-y-4">
						{' '}
						<label className="text-white">Change Information</label>
						<input
							className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
							placeholder="Name"
							type="text"
							value={formName}
							onChange={handleChangeName}
						/>
						<input
							className="w-64 h-12 px-4 rounded-md bg-gray-900 text-gray-200"
							placeholder="Salary"
							type="text"
							value={formSalary}
							onChange={handleChangeSalary}
						/>
						<button
							type="submit"
							className="rgb-hover hover:text-gray-800 text-white font-bold py-2 px-4 rounded transition-colors duration-400">
							Change
						</button>
					</div>
				</form>
			)}
		</div>
	);
};

export default EditInformation;

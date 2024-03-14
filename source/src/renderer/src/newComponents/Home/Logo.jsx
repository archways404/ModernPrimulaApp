import React from 'react';

const Logo = () => {
	return (
		<div
			className="mx-4 my-4"
			style={{ transform: 'rotate(90deg)', transformOrigin: 'top left' }}>
			<h1 className="text-4xl font-bold tracking-tighter leading-none gradient-text">
				ModernPrimula
			</h1>
		</div>
	);
};

export default Logo;

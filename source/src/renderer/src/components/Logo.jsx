/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Logo = () => {
	return (
		<>
			<div className="space-y-4">
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
			</div>
			{/* RGB TEXT */}
			<style>
				{`
          @keyframes rgbTextEffect {
            0% { color: #ff0000; } /* Red */
            33% { color: #00ff00; } /* Green */
            66% { color: #0000ff; } /* Blue */
            100% { color: #ff0000; } /* Red again */
          }

          .rgbEffect {
            animation: rgbTextEffect 10s infinite linear;
          }
        `}
			</style>
			{/* RGB EFFECT */}
			<style>
				{`
              @keyframes rgbEffect {
                0% { background-color: #ff0000; } /* Red */
                33% { background-color: #00ff00; } /* Green */
                66% { background-color: #0000ff; } /* Blue */
                100% { background-color: #ff0000; } /* Red */
              }
              
              .rgb-hover {
                animation: rgbEffect 3s infinite;
              }
            `}
			</style>
		</>
	);
};

export default Logo;

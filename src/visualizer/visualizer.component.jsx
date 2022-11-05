import React from 'react';
import './visualizer.styles.scss';

const Visualizer = ({ arr }) => {
	return (
		<div className='visualizer'>
			{arr.map((i, idx) => {
				return (
					<div
						key={idx}
						id={`bar${idx}`}
						className='bar'
						style={{
							height: `${i}px`,
							width: `${arr.length}%`,
						}}
					></div>
				);
			})}
		</div>
	);
};

export default Visualizer;

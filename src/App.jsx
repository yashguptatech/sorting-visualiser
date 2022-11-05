import React, { useState, useEffect } from 'react';

import Visualizer from './visualizer/visualizer.component';

import { newArray } from './utilityFunctions/helpperFunctions';
import sorting from './utilityFunctions/sortingAlgorithms';

import './App.scss';

const App = () => {
	let [size, setSize] = useState(50);
	let [array, setArray] = useState(newArray(size));
	let [sortMethod, setSortMethod] = useState('selectSort');
	let [speed, setSpeed] = useState(10);
	//testing sorting algorithms using useEffect
	// useEffect(async (tests = 1000) => {
	// 	for (let i = 0; i < tests; i++) {
	// 		let flag = true;
	// 		let array = newArray(Math.floor(Math.random() * 700));
	// 		let [updatedArray, animations] = sorting.mergeSort(array);
	// 		array.sort((x, y) => x - y);
	// 		if (array.size !== updatedArray.size) flag = false;
	// 		for (let i = 0; i < array.size && flag; i++)
	// 			if (array[i] !== updatedArray[i]) flag = false;
	// 		console.log(flag);
	// 	}
	// });
	useEffect(() => removeColors());

	const disableButtons = (val) => {
		if (val) {
			document.querySelector('#sortButton').setAttribute('disabled', val);
			document.querySelector('#sizeSlider').setAttribute('disabled', val);
			document.querySelector('#speedSlider').setAttribute('disabled', val);
			document.querySelector('#generateNewArray').setAttribute('disabled', val);
			document.querySelector('#sortingMethod').setAttribute('disabled', val);
		} else {
			document.querySelector('#sortButton').removeAttribute('disabled');
			document.querySelector('#sizeSlider').removeAttribute('disabled');
			document.querySelector('#speedSlider').removeAttribute('disabled');
			document.querySelector('#generateNewArray').removeAttribute('disabled');
			document.querySelector('#sortingMethod').removeAttribute('disabled');
		}
	};

	const removeColors = () => {
		document.querySelectorAll('.bar').forEach((bar) => {
			bar.classList.remove('compare', 'swap', 'sorted', 'correct');
		});
	};

	const sortAnimation = (arr, sort) => {
		removeColors();
		disableButtons(true);
		let [updatedArray, animation] = sort(arr);
		animation.map(({ classname, pos, firstCall, value }, c) =>
			setTimeout(() => {
				pos.map((i) => {
					if (classname !== 'sorted')
						document.querySelector(`#bar${i}`).classList.toggle(classname);
					else document.querySelector(`#bar${i}`).classList.add(classname);
				});
				if (classname === 'swap' && firstCall)
					[
						document.querySelector(`#bar${pos[0]}`).style.height,
						document.querySelector(`#bar${pos[1]}`).style.height,
					] = [
						document.querySelector(`#bar${pos[1]}`).style.height,
						document.querySelector(`#bar${pos[0]}`).style.height,
					];
				if (classname === 'write' && firstCall)
					document.querySelector(`#bar${pos[0]}`).style.height = `${value}px`;
			}, c * speed)
		);
		setTimeout(() => disableButtons(false), animation.length * speed);
		array = updatedArray;
	};

	return (
		<div>
			<nav className='navbar'>
				<div className='navbar-container'>
					<button
						className='btn btn-lg btn-dark'
						onClick={() => setArray(newArray(size))}
						id='generateNewArray'
					>
						Genrate Array
					</button>

					<select
						id='sortingMethod'
						className='form-select'
						aria-label='Default select example'
						style={{ width: '200px' }}
						defaultValue='selectSort'
						onChange={(e) => setSortMethod(e.target.value)}
					>
						<option value='selectSort'>Select Sort</option>
						<option value='bubbleSort'>Bubble Sort</option>
						<option value='insertSort'>Insert Sort</option>
						<option value='mergeSort'>Merge Sort</option>
						<option value='quickSort'>Quick Sort</option>
					</select>

					<span className='inputArea'>
						<label htmlFor='sizeSlider'>Size:</label>
						<input
							type='range'
							min='5'
							max='450'
							defaultValue='100'
							className='slider'
							id='sizeSlider'
							onChange={(e) => {
								setSize(e.target.value);
								setArray(newArray(size));
							}}
						/>
					</span>
					<span className='inputArea'>
						<label htmlFor='speedSlider'>Speed:</label>
						<input
							type='range'
							min='1'
							max='200'
							defaultValue='190'
							className='slider'
							id='speedSlider'
							onChange={(e) => {
								setSpeed(201 - e.target.value);
							}}
						/>
					</span>

					<button
						className='btn btn-lg btn-dark'
						id='sortButton'
						onClick={() => {
							sortAnimation(array, sorting[sortMethod]);
						}}
					>
						Sort
					</button>
				</div>
			</nav>
			<Visualizer arr={array} />
		</div>
	);
};

export default App;

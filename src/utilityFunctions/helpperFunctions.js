const generateArray = (size) => {
	let arr = [];
	for (let i = 0; i < size; i++)
		arr[i] = Math.floor(Math.random() * (600 - 50) + 50);
	return arr;
};
export const newArray = generateArray;

let sorting = {};
sorting.selectSort = (arr) => {
	let updatedArray = arr.slice(),
		animations = [];
	for (let i = 0; i < updatedArray.length - 1; i++) {
		let min_idx = i;
		animations.push({ classname: 'compare', pos: [min_idx] });
		for (let j = i + 1; j < updatedArray.length; j++) {
			animations.push({ classname: 'compare', pos: [j] });
			animations.push({ classname: 'compare', pos: [j] });
			if (updatedArray[min_idx] > updatedArray[j]) {
				animations.push({ classname: 'compare', pos: [min_idx] });
				min_idx = j;
				animations.push({ classname: 'compare', pos: [min_idx] });
			} else {
				animations.push({ classname: 'correct', pos: [j] });
				animations.push({ classname: 'correct', pos: [j] });
			}
		}
		animations.push({ classname: 'compare', pos: [min_idx] });
		animations.push({ classname: 'swap', pos: [i, min_idx], firstCall: true });
		animations.push({ classname: 'swap', pos: [i, min_idx], firstCall: false });
		[updatedArray[i], updatedArray[min_idx]] = [
			updatedArray[min_idx],
			updatedArray[i],
		];
		animations.push({ classname: 'sorted', pos: [i] });
	}
	animations.push({ classname: 'sorted', pos: [updatedArray.length - 1] });
	return [updatedArray, animations];
};

sorting.bubbleSort = (arr) => {
	let updatedArray = arr.slice(),
		animations = [];
	for (let i = 0; i < updatedArray.length - 1; i++) {
		for (let j = 0; j < updatedArray.length - i - 1; j++) {
			animations.push({ classname: 'compare', pos: [j, j + 1] });
			if (updatedArray[j] > updatedArray[j + 1]) {
				animations.push({
					classname: 'swap',
					pos: [j, j + 1],
					firstCall: true,
				});
				[updatedArray[j], updatedArray[j + 1]] = [
					updatedArray[j + 1],
					updatedArray[j],
				];
				animations.push({
					classname: 'swap',
					pos: [j, j + 1],
					firstCall: false,
				});
			}
			animations.push({ classname: 'compare', pos: [j, j + 1] });
		}
		animations.push({
			classname: 'sorted',
			pos: [updatedArray.length - i - 1],
		});
	}
	animations.push({ classname: 'sorted', pos: [0] });
	return [updatedArray, animations];
};

sorting.insertSort = (arr) => {
	let updatedArray = arr.slice(),
		animations = [];
	for (let i = 1; i < updatedArray.length; i++) {
		for (let j = i; j > 0; j--) {
			animations.push({ classname: 'compare', pos: [j, j - 1] });
			if (updatedArray[j] < updatedArray[j - 1]) {
				animations.push({
					classname: 'swap',
					pos: [j, j - 1],
					firstCall: true,
				});
				[updatedArray[j], updatedArray[j - 1]] = [
					updatedArray[j - 1],
					updatedArray[j],
				];
				animations.push({
					classname: 'swap',
					pos: [j, j - 1],
					firstCall: false,
				});
			}
			animations.push({ classname: 'compare', pos: [j, j - 1] });
		}
	}
	for (let i = updatedArray.length - 1; i >= 0; i--)
		animations.push({ classname: 'sorted', pos: [i] });
	return [updatedArray, animations];
};

sorting.quickSort = (arr) => {
	let animations = [],
		updatedArray = arr.slice();
	let pivot = (arr, l, h) => {
		animations.push({ classname: 'pivot', pos: [h] });
		let i = l - 1,
			j = l;
		for (; j < h; j++) {
			animations.push({ classname: 'compare', pos: i >= 0 ? [i, j] : [j] });
			animations.push({ classname: 'compare', pos: i >= 0 ? [i, j] : [j] });
			if (arr[j] < arr[h]) {
				i++;
				animations.push({ classname: 'swap', pos: [i, j], firstCall: true });
				[arr[i], arr[j]] = [arr[j], arr[i]];
				animations.push({ classname: 'swap', pos: [i, j], firstCall: false });
			}
		}
		animations.push({ classname: 'pivot', pos: [h] });
		animations.push({ classname: 'swap', pos: [i + 1, h], firstCall: true });
		[arr[i + 1], arr[h]] = [arr[h], arr[i + 1]];
		animations.push({ classname: 'swap', pos: [i, h], firstCall: false });
		animations.push({ classname: 'sorted', pos: [i + 1] });
		return i + 1;
	};
	let quick = (arr, i, j) => {
		if (i < j) {
			let p = pivot(arr, i, j);
			quick(arr, i, p - 1);
			quick(arr, p + 1, j);
		} else if (i === j) animations.push({ classname: 'sorted', pos: [i] });
	};
	quick(updatedArray, 0, updatedArray.length - 1);
	return [updatedArray, animations];
};

sorting.mergeSort = (arr) => {
	let animations = [],
		updatedArray = arr.slice();
	let merge = (arr, l, m, r, maxEle) => {
		let i = l;
		let j = m + 1;
		let k = l;
		while (i <= m && j <= r) {
			animations.push({ classname: 'compare', pos: [i, j] });
			animations.push({ classname: 'compare', pos: [i, j] });
			if (arr[i] % maxEle <= arr[j] % maxEle) {
				animations.push({
					classname: 'write',
					pos: [k, i],
					firstCall: true,
					value: arr[i] < maxEle ? arr[i] : Math.flor(arr[i] / maxEle),
				});
				animations.push({ classname: 'write', pos: [k, i], firstCall: false });
				arr[k] = arr[k] + (arr[i] % maxEle) * maxEle;
				k++;
				i++;
			} else {
				animations.push({
					classname: 'write',
					pos: [k, j],
					firstCall: true,
					value: arr[j] < maxEle ? arr[i] : Math.flor(arr[i] / maxEle),
				});
				animations.push({ classname: 'write', pos: [k, j], firstCall: false });
				arr[k] = arr[k] + (arr[j] % maxEle) * maxEle;
				k++;
				j++;
			}
		}
		while (i <= m) {
			animations.push({
				classname: 'write',
				pos: [k, i],
				firstCall: true,
				value: arr[i] < maxEle ? arr[i] : Math.flor(arr[i] / maxEle),
			});
			animations.push({ classname: 'write', pos: [k, i], firstCall: false });
			arr[k] = arr[k] + (arr[i] % maxEle) * maxEle;
			k++;
			i++;
		}
		while (j <= r) {
			animations.push({
				classname: 'write',
				pos: [k, j],
				firstCall: true,
				value: arr[j] < maxEle ? arr[i] : Math.flor(arr[i] / maxEle),
			});
			animations.push({ classname: 'write', pos: [k, j], firstCall: false });
			arr[k] = arr[k] + (arr[j] % maxEle) * maxEle;
			k++;
			j++;
		}
		for (i = l; i <= r; i++) {
			arr[i] = Math.floor(arr[i] / maxEle);
		}
	};
	let mergeSortRec = (arr, l, r, maxEle) => {
		if (l < r) {
			let mid = Math.floor((l + r) / 2);
			animations.push({ classname: 'pivot', pos: [mid] });
			mergeSortRec(arr, l, mid, maxEle);
			mergeSortRec(arr, mid + 1, r, maxEle);
			animations.push({ classname: 'pivot', pos: [mid] });
			merge(arr, l, mid, r, maxEle);
		}
	};
	let mergesort = (arr, n) => {
		let maxEle = Math.max(...arr) + 1;
		mergeSortRec(arr, 0, n - 1, maxEle);
	};
	mergesort(updatedArray, updatedArray.length);
	return [updatedArray, animations];
};

export default sorting;

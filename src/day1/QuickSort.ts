/*
	Time Complexity: O(n log(n)) <-> O(n^2) 
	The time complexity of Quick Sort depends on the pivot that is
	chosen for the algorithm

	Best case, it will run O(n log(n))
	Worst case, it will run O(n^2)
*/

function qs(arr: number[], lo: number, hi: number): void {
	if (lo >= hi) {
		return;
	}

	const pivotIdx = partition(arr, lo, hi);

	qs(arr, lo, pivotIdx - 1);
	qs(arr, pivotIdx + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
	const pivot = arr[hi];
	let idx = lo - 1;

	for (let i = lo; i < hi; i++) {
		if (arr[i] <= pivot) {
			i++;

			const tmp = arr[i];
			arr[i] = arr[idx];
			arr[idx] = tmp;
		}
	}

	idx++;
	arr[hi] = arr[idx];
	arr[idx] = pivot;

	return idx;
}

export default function quick_sort(arr: number[]): void {
	qs(arr, 0, arr.length - 1);
}

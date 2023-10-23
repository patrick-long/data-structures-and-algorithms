/*
	search(arr, lo, hi, needle)

	midpoint = lo + (hi - lo) / 2
	value = arr[midpoint]

	if value is equal to needle, then return true

	[ = inclusive, ) = exclusive
	[lo, hi)
	if value is larger than midpoint, then lo should now equal midpoint + 1
	if value is smaller than midpoint, then hi should now equal midpoint

	while lo is less than hi, recursively call function with new parameters


  Time Complexity: O(log n)
*/

export default function bs_list(haystack: number[], needle: number): boolean {
  let lo = 0;
  let hi = haystack.length;

  do {
    const midpoint = Math.floor(lo + (hi - lo) / 2);
    const value = haystack[midpoint];

    if (value === needle) {
      return true;
    } else if (value > needle) {
      hi = midpoint;
    } else {
      lo = midpoint + 1;
    }
  } while (lo < hi);

  return false;
}

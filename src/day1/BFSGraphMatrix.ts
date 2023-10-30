/*
	Adjacency List: list of paths that a each vertex can take to other vertices
		[
			[
				{
					to: 1,
					w: 10
				}
			],
			[],
			[
				{
					to: 0,
					w: __
				}
			],
			[
				{
					to: __,
					w: __
				},
				{
					to: __,
					w: __
				}
			]
		]

	Adjacency Matrix: matrix of values that represent weights between vertex n
		to vertex m
		[
					0   1   2   3
			0	[ 0,  10, 0,  0]
			1 [ 0,  5,  0,  0]
			2 [ 0,  5,  5,  0]
			3 [10,  0,  0,  0]
		]
*/

export default function bfs(
  graph: WeightedAdjacencyMatrix,
  source: number,
  needle: number,
): number[] | null {}

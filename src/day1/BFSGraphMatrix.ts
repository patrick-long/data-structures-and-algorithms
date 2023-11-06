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
  needle: number
): number[] | null {
  const seen = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);

  seen[source] = true;
  const queue: number[] = [source];

  while (queue.length) {
    const curr = queue.shift() as number;

    if (curr === needle) {
      break;
    }

    const adjacencies = graph[curr];

    for (let i = 0; i < graph.length; i++) {
      if (adjacencies[i] === 0 || seen[i]) {
        continue;
      }

      seen[i] = true;
      prev[i] = curr;
      queue.push(i);
    }

    seen[curr] = true;
  }

  let curr = needle;
  const out: number[] = [];

  while (prev[curr] !== -1) {
    out.push(curr);
    curr = prev[curr];
  }

  return out.length ? [source].concat(out.reverse()) : null;
}

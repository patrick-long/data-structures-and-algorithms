/*
	Maze Solver:
		- "#" = wall
		- "E" = end
		- "S" = start
		- space = traversable path

	we are going to solve this with recursion

	Base Case:
		1. off the map
		2. it's a wall
		3. it's the end 
		4. if we have seen it

	Recursive Case:
		- go up, go right, go down, go left
*/

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function walk(
  maze: string[],
  wall: string,
  curr: Point,
  end: Point,
  seen: boolean[][],
  path: Point[],
): boolean {
  // Base Case - off the map
  if (
    curr.x < 0 ||
    curr.x >= maze[0].length ||
    curr.y < 0 ||
    curr.y >= maze[0].length
  ) {
    return false;
  }

  // Base Case - it's a wall
  if (maze[curr.y][curr.x] === wall) {
    return false;
  }

  // Base Case - it's the end
  if (curr.x === end.x && curr.y === end.y) {
    path.push(end);
    return true;
  }

  // Base Case - if we have seen it
  if (seen[curr.y][curr.x]) {
    return false;
  }

  // 3 steps to recursion
  // pre
  seen[curr.y][curr.x] = true;
  path.push(curr);

  //recurse
  for (let i = 0; i < dir.length; i++) {
    const [x, y] = dir[i];
    const newCurr = {
      x: curr.x + x,
      y: curr.y + y,
    };

    const walkIsTrue = walk(maze, wall, newCurr, end, seen, path);

    if (walkIsTrue) {
      return true;
    }
  }

  // post
  path.pop();

  return false;
}

export default function solve(
  maze: string[],
  wall: string,
  start: Point,
  end: Point,
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; i++) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}

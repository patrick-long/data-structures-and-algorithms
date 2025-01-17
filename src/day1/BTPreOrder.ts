function walk(curr: BinaryNode<number> | null, path: number[]): number[] {
  if (!curr) {
    return path;
  }

  // recursion
  // pre
  path.push(curr.value);

  // recurse
  walk(curr.left, path);
  walk(curr.right, path);

  // post
  // do nothing for BT in order search

  return path;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
  return walk(head, []);
}

/*
	A Queue is simply a FIFO implementation of a Linked List

	Time Complexity:
		- enqueue: O(1)
		- deque: O(1)
		- peek: O(1)
*/

type Node<T> = {
  value: T;
  next?: Node<T>;
};

export default class Queue<T> {
  public length: number;
  private head?: Node<T>;
  private tail?: Node<T>;

  constructor() {
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const node = { value: item } as Node<T>;
    this.length++;

    if (!this.tail) {
      this.tail = this.head = node;
      return;
    }

    this.tail.next = node;
    this.tail = node;
  }

  deque(): T | undefined {
    if (!this.head) {
      return undefined;
    }

    this.length--;

    const tmp = this.head;
    this.head = this.head.next;

    // free
    tmp.next = undefined;

    return tmp.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}

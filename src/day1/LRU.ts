type Node<T> = {
  value: T;
  next?: Node<T>;
  prev?: Node<T>;
};

function createNode<V>(value: V): Node<V> {
  return { value };
}

export default class LRU<K, V> {
  private capacity: number;
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;

  constructor(capacity: number = 10) {
    this.capacity = capacity;
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {
    // does the key exist? use get() logic
    let node = this.lookup.get(key);

    if (!node) {
      node = createNode(value);

      // if it doesn't exist, we need to insert
      // check capacity and evict if over capacity
      this.length++;
      this.prepend(node);
      this.trimCache();

      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    } else {
      // if it does exit, we need to update to the front of list
      // and update the value
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }
  }

  get(key: K): V | undefined {
    // check the cache for existence
    const node = this.lookup.get(key);

    if (!node) {
      return undefined;
    }

    // update the value we found and move it to the front
    this.detach(node);
    this.prepend(node);

    // return out the value found
    return node.value;
  }

  private detach(node: Node<V>): void {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (this.head === node) {
      this.head = this.head.next;
    }

    if (this.tail === node) {
      this.tail = this.tail.prev;
    }

    node.next = node.prev = undefined;
  }

  private prepend(node: Node<V>): void {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  private trimCache(): void {
    if (this.length <= this.capacity) {
      return;
    }

    const tail = this.tail as Node<V>;
    this.detach(tail);

    const key = this.reverseLookup.get(tail) as K;
    this.lookup.delete(key);
    this.reverseLookup.delete(tail);
    this.length--;
  }
}

interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export class LinkedList<T> {
  node: Node<T>;
  size: number = 0;

  constructor(value: T) {
    this.node = { value, next: null };
    this.size += 1;
  }

  static from<T>(values: T[]): LinkedList<T> {
    const l = new this(values.shift());
    for (const value of values) {
      l.add(value);
    }
    return l as LinkedList<T>;
  }

  peek(): T {
    return this.node.value;
  }

  peekFirst(): T {
    let current = this.node;
    while (current.next) {
      current = current.next;
    }
    return current.value;
  }

  add(value: T): this {
    this.node = { value, next: this.node };
    this.size += 1;
    return this;
  }

  walk(): void {
    for (const value of this) {
      console.log(value);
    }
  }

  *[Symbol.iterator]() {
    let current = this.node;
    while (current.next) {
      yield current.value;
      current = current.next;
    }
    yield current.value;
  }
}

interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export class LinkedList<T> {
  node: Node<T> | null;
  size: number = 0;

  constructor();
  constructor(value: T);
  constructor(value?: T) {
    this.node = null;
    if (value) {
      this.node = { value, next: null };
      this.size += 1;
    }
  }

  static from<T>(): LinkedList<T>;
  static from<T>(values: T[]): LinkedList<T>;
  static from<T>(values?: T[]): LinkedList<T> {
    if (!values) {
      return new this();
    }

    const l = new this(values.shift());
    for (const value of values) {
      l.add(value);
    }
    return l as LinkedList<T>;
  }

  peek(): T | null {
    if (this.node) {
      return this.node.value;
    }
    return null;
  }

  peekFirst(): T | null {
    if (!this.node) {
      return null;
    }

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
    if (this.node) {
      let current = this.node;
      while (current.next) {
        yield current.value;
        current = current.next;
      }
      yield current.value;
    }
  }
}

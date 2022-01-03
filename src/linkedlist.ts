interface Node<T> {
  value: T;
  next: Node<T> | null;
}

export class LinkedList<T> {
  #node: Node<T> | null;
  #sz: number;

  constructor();
  constructor(value: T);
  constructor(value?: T) {
    this.#node = null;
    this.#sz = 0;
    if (value) {
      this.#node = { value, next: null };
      this.#sz += 1;
    }
  }

  static from<T>(): LinkedList<T>;
  static from<T>(values: T[]): LinkedList<T>;
  static from<T>(values?: T[]): LinkedList<T> {
    if (!values) {
      return new this();
    }

    return new this().addAll(values) as LinkedList<T>;
  }

  size() {
    return this.#sz;
  }

  peek(): T | null {
    if (this.#node) {
      return this.#node.value;
    }
    return null;
  }

  peekFirst(): T | null {
    let value = null;
    for (value of this.values());
    return value;
  }

  add(value: T): this;
  add(value: T, index: number): this;
  add(value: T, index?: number): this {
    if (index !== undefined && index > 0) {
      index = Math.min(index, this.#sz - 1);
      for (const [i, node] of this.entries()) {
        if (i === index) {
          node.next = { value, next: node.next };
          this.#sz += 1;
        }
      }
    } else {
      this.#node = { value, next: this.#node };
      this.#sz += 1;
    }
    return this;
  }

  addAll(values: T[]): this {
    for (const value of values) {
      this.add(value);
    }
    return this;
  }

  remove(value: T): this {
    for (const node of this) {
      if (node.next && node.next.value == value) {
        node.next = node.next.next;
        this.#sz -= 1;
        return this;
      }
    }

    return this;
  }

  contains(value: T): boolean {
    for (const node of this) {
      if (node.value === value) {
        return true;
      }
    }

    return false;
  }

  find(fn: (value: T) => boolean): T | undefined {
    for (const node of this) {
      if (fn(node.value)) {
        return node.value;
      }
    }

    return undefined;
  }

  toArray() {
    return Array.from(this.values()).reverse();
  }

  toString() {
    return this.toArray().join(",");
  }

  *entries(): Generator<[number, Node<T>]> {
    let i = 0;
    for (const node of this) {
      yield [i++, node];
    }
  }

  *values(): Generator<T> {
    for (const node of this) {
      yield node.value;
    }
  }

  *[Symbol.iterator]() {
    if (this.#node) {
      let current = this.#node;
      while (current.next) {
        yield current;
        current = current.next;
      }
      yield current;
    }
  }
}

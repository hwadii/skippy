import { LinkedList } from "../src/linkedlist";
import test from "ava";

test("it creates an empty linked list with constructor", (t) => {
  const list = new LinkedList();
  t.is(list.size(), 0);
});

test("it creates an empty linked list from array", (t) => {
  const list = LinkedList.from([]);
  t.is(list.size(), 0);
});

test("it creates a linked list from an array", (t) => {
  const array = [1, 2, 3, 4];
  const list = LinkedList.from(array);
  t.deepEqual(list.toArray(), array);
});

test("it creates a linked list", (t) => {
  const array = [1];
  const list = new LinkedList(1);
  t.deepEqual(list.toArray(), array);
  t.is(list.size(), 1);
});

test("it adds elements to the linked list", (t) => {
  const list = new LinkedList(1).add(2);
  t.deepEqual(list.toArray(), [1, 2]);
});

test("it adds an element at index", (t) => {
  const list = LinkedList.from([1, 2, 4, 5]);
  t.deepEqual(list.add(3, 1).toArray(), [1, 2, 3, 4, 5]);
  t.is(list.size(), 5);
});

test("it clamps the index", (t) => {
  const list = LinkedList.from([1, 2, 3, 4]);
  t.deepEqual(list.add(2, 1000).toArray(), [2, 1, 2, 3, 4]);
  t.deepEqual(list.add(2, -10).toArray(), [2, 1, 2, 3, 4, 2]);
});

test("it removes elements from the linked list", (t) => {
  const list = LinkedList.from([1, 2, 3, 4]);
  t.deepEqual(list.remove(2).toArray(), [1, 3, 4]);
});

test("it checks if an element is in the list", (t) => {
  const list = LinkedList.from([1, 2, 3, 4]);
  t.true(list.contains(2));
});

test("it finds an element in the lsit", (t) => {
  const list = LinkedList.from(["foo", "bar", "foobar"]);
  t.is(
    list.find((value) => value.length > 3),
    "foobar"
  );
});

test("it returns the first element of the list", (t) => {
  const list = LinkedList.from([1, 2, 3, 4]);

  t.is(list.peekFirst(), 1);
});

test("it stringifies the linked list", (t) => {
  const list = LinkedList.from(["foo", "bar", "foobar"]);
  t.is(list.toString(), "foo,bar,foobar");
});

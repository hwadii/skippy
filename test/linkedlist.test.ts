import { assertEquals, assert, assertArrayIncludes } from "@std/assert";
import { LinkedList } from "../src/linkedlist.ts";

Deno.test("it creates an empty linked list with constructor", () => {
  const list = new LinkedList();
  assertEquals(list.size(), 0);
});

Deno.test("it creates an empty linked list from array", () => {
  const list = LinkedList.from([]);
  assertEquals(list.size(), 0);
});

Deno.test("it creates a linked list from an array", () => {
  const array = [1, 2, 3, 4];
  const list = LinkedList.from(array);
  assertArrayIncludes(list.toArray(), array);
});

Deno.test("it creates a linked list", () => {
  const array = [1];
  const list = new LinkedList(1);
  assertArrayIncludes(list.toArray(), array);
  assertEquals(list.size(), 1);
});

Deno.test("it adds elements to the linked list", () => {
  const list = new LinkedList(1).add(2);
  assertArrayIncludes(list.toArray(), [1, 2]);
});

Deno.test("it adds an element at index", () => {
  const list = LinkedList.from([1, 2, 4, 5]);
  list.add(3, 1)
  assertEquals(list.size(), 5);
});

Deno.test("it clamps the index", () => {
  const list = LinkedList.from([1, 2, 3, 4]);
  assertArrayIncludes(list.add(2, 1000).toArray(), [2, 1, 2, 3, 4]);
  assertArrayIncludes(list.add(2, -10).toArray(), [2, 1, 2, 3, 4, 2]);
});

Deno.test("it removes elements from the linked list", () => {
  const list = LinkedList.from([1, 2, 3, 4]);
  assertArrayIncludes(list.remove(2).toArray(), [1, 3, 4]);
});

Deno.test("it checks if an elemenassertEquals in the list", () => {
  const list = LinkedList.from([1, 2, 3, 4]);
  assert(list.contains(2));
});

Deno.test("it finds an element in the lsit", () => {
  const list = LinkedList.from(["foo", "bar", "foobar"]);
  assertEquals(
    list.find((value) => value.length > 3),
    "foobar"
  );
});

Deno.test("it returns the first element of the list", () => {
  const list = LinkedList.from([1, 2, 3, 4]);

  assertEquals(list.peekFirst(), 1);
});

Deno.test("it stringifies the linked list", () => {
  const list = LinkedList.from(["foo", "bar", "foobar"]);
  assertEquals(list.toString(), "foo,bar,foobar");
});

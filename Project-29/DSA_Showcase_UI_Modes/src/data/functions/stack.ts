export class StackArray {
  private st: number[] | string[];
  private top: number;
  private readonly maxSize: number;

  constructor(size: number) {
    this.st = new Array(size);
    this.top = -1;
    this.maxSize = size;
  }

  pushStArr(val: number | string): void {
    if (this.top < this.maxSize - 1) {
      this.top++;
      this.st[this.top] = val;
    } else {
      console.error("Stack overflow!");
    }
  }

  popStArr(): number | string | undefined {
    if (this.top > -1) {
      const poppedValue = this.st[this.top];
      this.top--;
      return poppedValue;
    }
    return undefined;
  }
  peekStArr(): number | string | undefined {
    return this.top > -1 ? this.st[this.top] : undefined;
  }
  sizeStArr(): number {
    return this.top + 1;
  }
  isEmptyStArr() {
    return this.top === -1;
  }
  logStArray() {
    let result = "Stack: [";
    for (let i = 0; i <= this.top; i++) {
      result += this.st[i];
      if (i < this.top) {
        result += ", ";
      }
    }
    result += "]";
    console.log(result);
  }
  getStackArr() {
    let result = "Stack: [";
    for (let i = 0; i <= this.top; i++) {
      result += this.st[i];
      if (i < this.top) {
        result += ", ";
      }
    }
    result += "]";
    return result;
  }
}

class Node {
  data: number | string | object | boolean;
  next: Node | null;

  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
export class StackLinkedList {
  private head: any;
  private size: number;
  private;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  isEmpty() {
    return this.head === null;
  }
  pushNode(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
  popNode() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    const poppedData = this.head.data;
    this.head = this.head.next;
    this.size--;
    return poppedData;
  }
  peekNode() {
    if (this.isEmpty()) {
      return "Stack is empty.";
    }
    return this.head.data;
  }
  getLinkedSize() {
    return this.size;
  }
}

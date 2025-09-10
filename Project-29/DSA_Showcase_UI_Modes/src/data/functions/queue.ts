export class QueueArray {
  private que: number[];
  private start: number;
  private end: number;
  private curSize: number;
  private maxSize: number;

  constructor(size: number) {
    this.que = new Array(size);
    this.end = -1;
    this.start = -1;
    this.curSize = 0;
    this.maxSize = size;
  }

  isEmptyQueueArr() {
    return this.start === this.end;
  }
  isFullQueueArr() {
    return this.curSize === this.maxSize;
  }
  enqueue(val: number): void {
    if (this.isFullQueueArr()) console.error("Queue overflow!");
    if (this.curSize === 0) {
      this.start = 0;
      this.end = 0;
    } else {
      this.end = (this.end + 1) % this.maxSize;
      this.curSize++;
    }
    this.que[this.end] = val;
  }

  dequeue(): number | undefined {
    if (this.isEmptyQueueArr()) console.error("Queue is underflow");
    const el = this.que[this.start];
    if (this.curSize === 1) {
      this.start = -1;
      this.end = -1;
    } else {
      this.start = (this.start + 1) % this.maxSize;
      this.curSize -= 1;
    }
    return el;
  }
  peekQueueArr(): number | undefined {
    return this.curSize > 0 ? this.que[this.end] : undefined;
  }
  sizeQueueArr(): number {
    return this.curSize;
  }
  logQueueArr() {
    let result = "que: [";
    for (let i = 0; i <= this.start; i++) {
      result += this.que[i];
      if (i < this.curSize) {
        result += ", ";
      }
    }
    result += "]";
    console.log(result);
  }
  getQueueArr() {
    let result = "que: [";
    for (let i = 0; i <= this.start; i++) {
      result += this.que[i];
      if (i < this.curSize) {
        result += ", ";
      }
    }
    result += "]";
    return result;
  }
}
class Node {
  data : number | string | boolean | object;
  next : Node | null;

  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
export class QueueLinkedList{
  private start: Node | null;
  private end: Node | null;
  private size: number;

  constructor() {
    this.start = null;
    this.end = null;
    this.size = 0;
  }
  isEmptyQueNode() {
    return this.start === null;
  }
  pushQueNode(data) {
    const newNode = new Node(data);
    if (this.start === null) {
      this.start = newNode;
      this.end = newNode;
    } else {
      this.end.next = newNode;
    }
    this.size++;
  }
  popQueNode() {
    if (this.isEmptyQueNode()) return "Node is empty";
    const dequeueData = this.start;
    this.start = this.start.next;
    if (this.start === null) {
      this.end = null;
    }
    this.size--;
    return dequeueData;
  }
  peekQueNode() {
    if (this.isEmptyQueNode()) return "Node is empty";
    return this.start.data;
  }

    getQueNodeSize() {
        return this.size;
    }
}

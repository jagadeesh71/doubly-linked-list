const Node = require('./node');
class LinkedList {
    constructor() {
        //initializing the data
        this.length = 0;
        this._head = null;
        this._tail = null;
    }
    append(data) {
        var newData = new Node(data);
        if (this.length === 0) {
            this._head = newData;
            this._tail = newData;
        }
        else {
            this._tail.next = newData;
            newData.prev = this._tail;
            this._tail = newData;
        }
        this.length++;
        return this;
    }
    head() {
        return this._head ? this._head.data : this._head;
    }
    tail() {
        return this._tail ? this._tail.data : this._tail;
    }
    at(index) {
        if (index >= this.length) {
            throw new Error('index out of range');
        }
        var currentNode = this._head;
        for (let position = 0; position < index; position++) {
            currentNode = currentNode.next;
        }
        return currentNode.data;
    }
    insertAt(index, data) {
        if (index > this.length) {
            throw new Error('index out of range');
        }
        var newNode = new Node(data),
            currentNode = this._head;
        if (index === this.length || index === 0) {
            this.append(data);                                      //insert data at beginning or ending 
        } else {
            for (var position = 0; position < index; position++) {  //iterate till the index
                currentNode = currentNode.next;
            }
            newNode.prev = currentNode.prev;
            currentNode.prev.next = newNode;
            newNode.next = currentNode;
            currentNode.prev = newNode;
            this.length++;
        }
    }
    isEmpty() {
        return this.length === 0;
    }
    clear() {
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }
    deleteAt(index) {
        if (index >= this.length) {
            throw new Error('index out of range');
        }
        var currentNode = this._head;
        for (var position = 0; position < index; position++) {
            currentNode = currentNode.next;
        }
        if (index === 0) {                      //deleting at the beginning
            currentNode = currentNode.next;
            if (currentNode) {                  // if list has only one element
                currentNode.prev = null;
            } else {
                this._tail = currentNode;
            }
            this._head = currentNode;
        } else if(index === this.length -1) {  //deleting last node in the list
            this._tail = currentNode.prev;
            currentNode.prev.next = null;
        } else{
            currentNode.prev.next = currentNode.next;
            currentNode.next.prev = currentNode.prev;
        }
        this.length--;
        return this;
    }
    reverse() {
        //reversing the linked list
        if (this.length > 1) {
            var tempNode = null,
                currentNode = this._head;
            this._tail = this._head;
            while (currentNode) {
                tempNode = currentNode.prev;
                currentNode.prev = currentNode.next;
                currentNode.next = tempNode;
                currentNode = currentNode.prev;
            }
            this._head = tempNode.prev;
        }
        return this;
    }
    indexOf(data) {
        var currentNode = this._head,
            result = -1;
        for (let position = 0; position < this.length; position++) {
            if (currentNode.data === data) {
                result = position;
            }
            currentNode = currentNode.next;
        }
        return result;
    }
}
module.exports = LinkedList;

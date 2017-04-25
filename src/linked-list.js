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
        //make it as first element if list is empty
        if (this.length === 0) {
            this._head = newData;
            this._tail = newData;
            this.length++;
        }
        else {
            //if list is not empty add at the end.
            this._tail.next = newData;
            newData.prev = this._tail;
            this._tail = newData;
            this.length++;
        }
        return this;
    }
    head() {
        //returns the head node in the list
        return this._head ? this._head.data : this._head;
    }
    tail() {
        //returns the last node in the list
        return this._tail ? this._tail.data : this._tail;
    }
    at(index) {
        //returns the data at given index if index is in range
        if (index < this.length) {
            var currentNode = this._head;
            for (var position = 0; position < index; position++) {
                currentNode = currentNode.next;
            }
            return currentNode.data;
        }
        else {
            console.log('index out of range');
            return null;
        }
    }
    insertAt(index, data) {
        var newNode = new Node(data),
            prevNode = null,
            currentNode = this._head;
        if (index <= this.length && this.length > 0) {
            //iterating till the index 
            for (var position = 0; position < index; position++) {
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
            if (index === 0) {
                //this block is to insert data at the beginning
                newNode.prev = prevNode;
                newNode.next = currentNode;
                currentNode.prev = newNode;
                this._head = newNode;
                this.length++;
            } else if (this._tail && index === this.length) {
                //this block is to insert data at the ending
                this.append(data);
            } else {
                //this block is for to insert the data at given index;
                newNode.prev = prevNode;
                prevNode.next = newNode;
                newNode.next = currentNode;
                currentNode.prev = newNode;
                this.length++;
            }
        } else if (index ===0 && this.length === 0) {
            //insert the data if linked list is empty
            this.append(data);
        }
        else {
            console.log("index out of range");
        }
    }
    isEmpty() {
        //returns the list is empty or not
        return this.length === 0;
    }
    clear() {
        //nullifies the linked list
        this.length = 0;
        this._head = null;
        this._tail = null;
        return this;
    }
    deleteAt(index) {
        var prevNode = null,
            currentNode = this._head;
        //delete the data at a given index if the index is in range and no of elements are greater than 1
        if (index < this.length && this.length > 1) {
            for (var position = 0; position < index; position++) {
                    prevNode = currentNode;
                    currentNode = currentNode.next;
                }
            if (index === 0) {
                //deleting the node at the beginning
                currentNode = currentNode.next;
                currentNode.prev = prevNode;
                this._head = currentNode;
            } else if (index === this.length - 1) {
                //deleting the last node of the list
                prevNode.next = null;
                this._tail = prevNode;
            } else {
                //deleting the node at a given index
                currentNode.next.prev = prevNode;
                prevNode.next = currentNode.next;
            }
            this.length--;
        } else if (index ===0 && this.length === 1) {
            //deletes the data when only one node is present
            this.clear();
        } else {
            console.log("index out of range");
        }
        return this;
    }
    reverse() {
        //reversing the linked list
        if (this.length > 1) {
            var tempNode = null,
                currentNode = this._head;
            this._tail = this._head;
            while (currentNode !== null) {
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
        //returns the position of given data
        var currentNode = this._head,
            position = 0;
        for (; position < this.length; position++) {
            if (currentNode.data === data) {
                return position;
            }
            currentNode = currentNode.next;
        }
        //if data is not present returns -1
        if (position === this.length) {
            return -1;
        }
    }
}
module.exports = LinkedList;

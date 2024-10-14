class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(arr) {
        arr.sort((a, b) => a - b); // Sort values from lowest to highest.
        arr = [...new Set(arr)]; // Remove duplicate values.
        console.log(arr);
        console.log(arr.length);
        this.root = this.buildTree(arr, 0, arr.length - 1); // Arguments: array, start value, end value (arr.length - 1 because array starts at index 0)
    }

    buildTree(arr, start, end) {
        if (arr.length == 0) { // Base case
            return null;
        }

        let mid = Math.floor(arr.length / 2); // Round down half arr length.
        let root = new Node(arr[mid]); // The middle value of arr becomes the root.

        root.leftChild = this.buildTree(arr.slice(0, mid), start, mid - 1); // Slice from the beginning to just before mid of arr, start is 0, and end is the value before mid.
        root.rightChild = this.buildTree(arr.slice(mid + 1), mid + 1, end); // Slice from just after mid to the end of arr, start is the value after mid, and end is arr.length - 1.
        
        return root;
    }

}

const bst = new Tree([1, 2, 3, 4, 5, 6, 7]);
console.log('tree 1', bst.root);

const bst2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log('tree 2', bst2.root);
console.log('sub-left', bst2.root.leftChild);
console.log('sub-right', bst2.root.rightChild);
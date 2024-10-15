class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(arr) {
        if (!arr) { // This is so that new Tree() works when nothing is passed in.
            this.root = null;
        } else {
            arr.sort((a, b) => a - b); // Sort values from lowest to highest.
            arr = [...new Set(arr)]; // Remove duplicate values.
            this.root = this.buildTree(arr, 0, arr.length - 1); // Arguments: array, start value, end value (arr.length - 1 because array starts at index 0)
        }
    }

    buildTree(arr, start, end) {
        if (arr.length == 0) { // Base case
            return null;
        }

        const mid = Math.floor(arr.length / 2); // Round down half arr length.
        const node = new Node(arr[mid]); // The middle value of arr becomes the root node.

        node.leftChild = this.buildTree(arr.slice(0, mid), start, mid - 1); // Slice from the beginning to just before mid of arr, start is 0, and end is the value before mid.
        node.rightChild = this.buildTree(arr.slice(mid + 1), mid + 1, end); // Slice from just after mid to the end of arr, start is the value after mid, and end is arr.length - 1.
        
        return node;
    }

    insert(value, root = this.root) { // If no root.leftChild or root.rightChild is passed in, this.root is used to begin insert() at the root of the BST.
        if (this.root == null) { // If the BST is empty,
            this.root = new Node(value); // Make value the root.

            return this.root;
        } else if (root == null) { // If the node is empty (but the BST is no longer empty),
            return new Node(value);
        } else if (root.data != value) { // This is so that no duplicate value is added to the BST.
            if (root.data > value) {
                root.leftChild = this.insert(value, root.leftChild);
            } else if (root.data < value) {
                root.rightChild = this.insert(value, root.rightChild);
            }
        }

        return root;
    }
}

const bst = new Tree([1, 2, 3, 4, 5, 6, 7]);
console.log('tree 1', bst.root);

const bst2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log('tree 2', bst2.root);
console.log('sub-left', bst2.root.leftChild);
console.log('sub-right', bst2.root.rightChild);

const bst3 = new Tree();
console.log('tree 3', bst3.root);
bst3.insert(2);
bst3.insert(3);
bst3.insert(4);
bst3.insert(1);
console.log('tree 3 update', bst3.root);
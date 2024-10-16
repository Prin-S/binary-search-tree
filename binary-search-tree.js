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
        if (value == undefined) { // This is better than !value which includes 0.
            return 'No value is entered.';
        } else if (this.root == null) { // If the BST is empty,
            this.root = new Node(value); // Make value the root.

            return this.root;
        } else if (root == null) { // If the node is empty (but the BST is no longer empty),
            return new Node(value);
        } else if (value != root.data) { // This is so that no duplicate value is added to the BST.
            if (value < root.data) { // Go to root.leftChild or root.rightChild depending on value.
                root.leftChild = this.insert(value, root.leftChild);
            } else if (value > root.data) {
                root.rightChild = this.insert(value, root.rightChild);
            }
        }

        return root; // This is put outside; otherwise, nothing will be returned when a duplicate value is entered.
    }

    deleteItem(value, root = this.root) {
        if (value == undefined) { // This is better than !value which includes 0.
            return 'No value is entered.';
        } else if (this.root == null) { // If the BST is empty,
            return 'The binary search tree is empty.';
        } else if (this.find(value) == 'The binary search tree does not contain the value.') { // If value is not found in the BST,
            return 'The binary search tree does not contain the value.';
        } else if (value == root.data) { // If value is found and equals root.data,
            if (root.leftChild == null && root.rightChild == null) { // No children
                root = null;
            } else if (root.leftChild == null) { // No leftChild
                root = root.rightChild;
            } else if (root.rightChild == null) { // No rightChild
                root = root.leftChild;
            } else {
                const counter = this.findLowestInRightChild(root.rightChild); // Find the lowest value in root.rightChild.
                root.data = counter; // Assign the lowest value as root.data.
                root.rightChild = this.deleteItem(counter, root.rightChild); // Delete the original node of the lowest value.
            }

            return root;
        } else { // Go to root.leftChild or root.rightChild depending on value.
            if (value < root.data) {
                root.leftChild = this.deleteItem(value, root.leftChild);
            } else if (value > root.data) {
                root.rightChild = this.deleteItem(value, root.rightChild);
            }

            return root;
        }
    }

    findLowestInRightChild(root, counter = root.data) {
        if (root.data < counter) {
            counter = root.data;
        }

        if (root.leftChild) { // If root has leftChild,
            counter = this.findLowestInRightChild(root.leftChild, counter);
        }

        return counter;
    }

    find(value, root = this.root) {
        if (value == undefined) { // This is better than !value which includes 0.
            return 'No value is entered.';
        } else if (this.root == null) { // If the BST is empty,
            return 'The binary search tree is empty.';
        } else if (root == null) { // If value is not found in the BST,
            return 'The binary search tree does not contain the value.';
        } else if (value == root.data) { // If value is found and equals root.data,
            return root;
        } else { // Go to root.leftChild or root.rightChild depending on value.
            if (root.data > value) {
                root = this.find(value, root.leftChild);
            } else if (value > root.data) {
                root = this.find(value, root.rightChild);
            }

            return root;
        }
    }
}

/*const bst = new Tree([1, 2, 3, 4, 5, 6, 7]);
console.log('tree 1', bst.root);

const bst2 = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
console.log('tree 2', bst2.root);
console.log('sub-left', bst2.root.leftChild);
console.log('sub-right', bst2.root.rightChild);*/

const bst3 = new Tree();
console.log('tree 3', bst3.root);
bst3.insert(4);
bst3.insert(7);
bst3.insert(2);
bst3.insert(1);
bst3.insert(6);
bst3.insert(5);
bst3.insert(3);
bst3.insert(8);
console.log('tree 3 after insert', bst3.root);

bst3.deleteItem(4);
console.log('tree 3 after delete', bst3.root);

console.log(bst3.find(7));
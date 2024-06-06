class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    // Filter duplicates and sort imput array 
    this.array = arr
      .filter((item, index) => arr.indexOf(item) === index)
      .sort((a, b) => a - b);
    this.root = this.buildTree(this.array);
  }

  buildTree(array) {
    if (array.length <= 0) {
      return null;
    }

    const start = 0;
    const end = array.length;
    const mid = Math.floor((start + end) / 2);

    const root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(start, mid)); // Pass node objects
    root.right = this.buildTree(array.slice(mid + 1, end)); // Pass node object

    return root;
  }

  insert(value) {
    let currentNode = this.root;
    while (true) {
      if (currentNode.data > value) {        
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return true;
        }
        currentNode = currentNode.left
      } else if (currentNode.data < value) {
          if (currentNode.right === null) {
            currentNode.right = new Node(value);
            return true;
        }
        currentNode = currentNode.right;
      } else if (currentNode === value) {
        return false;
      }
    }
  }

  deleteItem(value) {
    let currentNode = this.root;
    let predecesorNode = undefined;

    while (currentNode.data !== value) {
      if (value > currentNode.data) {
        predecesorNode = currentNode;
        currentNode = currentNode.right;
      }
      if (value < currentNode.data) {
        predecesorNode = currentNode;
        currentNode = currentNode.left;
      }
      if (currentNode === null) {
        return false;
      }
    }
    if (currentNode.right === null && currentNode.left === null) {
      if (value > predecesorNode.data) {
        predecesorNode.right === null;
        return true;
      } else if (value < predecesorNode.data) {
        predecesorNode.left = null;
        return true;
      }
    }
    if (currentNode.right === null || currentNode.left === null) {
      // If right is null copy left to currentNode else copy right
      currentNode.right === null ? currentNode.data = currentNode.left.data : currentNode.data = currentNode.right.data;
      currentNode.right = null;
      currentNode.left = null;
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const customArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(customArr);
// console.log(test.array);
test.insert(2);
test.insert(96);
test.deleteItem(324);
prettyPrint(test.root);

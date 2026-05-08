import Node from "./node.js";

class Tree {
  constructor(array) {
    const cleanArray = [...new Set(array)].sort((a, b) => a - b);

    this.root = this.buildTree(cleanArray, 0, cleanArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    //recursive
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) {
        return true;
      }
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
    }

    let current = this.root;

    while (true) {
      if (value === current.data) return;

      if (value < current.data) {
        if (current.left === null) {
          current.left = new Node(value);
          break;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new Node(value);
          break;
        }
        current = current.right;
      }
    }
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) {
        return node.right;
      }
      if (node.right === null) {
        return node.left;
      }
      node.data = this.minValue(node.right);
      node.right = this.deleteItem(node.data, node.right);
    }

    return node;
  }

  minValue(node) {
    let min = node.data;
    while (node.left !== null) {
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (this.root === null) return;

    const queue = [this.root];
    while (queue.length > 0) {
      const currentNode = queue.shift();

      callback(currentNode.data);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (node === null) return;

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (node === null) return;

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error("A callback is required");
    }
    if (node === null) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  find(value, node = this.root) {
    if (node === null || node.data === value) return node;

    if (value < node.data) {
      return this.find(value, node.left);
    }
    return this.find(value, node.right);
  }

  height(value) {
    const targetNode = this.find(value);

    if (!targetNode) return undefined;

    return this._getFullHeight(targetNode);
  }
  _getFullHeight(node) {
    if (node === null) return -1;

    const leftHeight = this._getFullHeight(node.left);
    const rightHeight = this._getFullHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, node = this.root, currentDepth = 0) {
    if (node === null) return undefined;

    if (node.data === value) return currentDepth;

    if (value < node.data) {
      return this.depth(value, node.left, currentDepth + 1);
    }
    return this.depth(value, node.right, currentDepth + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this._getFullHeight(node.left);
    const rightHeight = this._getFullHeight(node.right);

    const difference = Math.abs(leftHeight - rightHeight);

    return (
      difference <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const dataArray = [];

    this.inOrderForEach((value) => dataArray.push(value));

    this.root = this.buildTree(dataArray, 0, dataArray.length - 1);
  }
}

export default Tree;

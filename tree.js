import Node from "./node.js";

export default class Tree {
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

    while(current !== null){
      if(value === current.data){
        return true;
      }
      if (value < current.data){
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  insert(value) {
    if (this.root === null){
      this.root = new Node(value);
    }

    let current = this.root;

    while (true){
      if(value === current.data) return;

      if(value < current.data){
        if(current.left === null){
          current.left = new Node(value);
          break
        }
        current = current.left;
      } else {
        if (current.right === null){
          current.right = new Node(value);
          break;
        }
        current = current.right;
      }
    }
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data){
      node.left = this.deleteItem(value, node.left);
    }else if (value > node.data){
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null){
        return node.right;
      }
      if (node.right === null){
        return node.left;
      }
      node.data = this.minValue(node.right);
      node.right = this.deleteItem(node.data, node.right);
    }

    return node;
  }

  minValue(node){
    let min = node.data;
    while(node.left !== null){
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  levelOrderForEach(callback) {
    if (!callback){
      throw new Error("A callback is required");
    }
    if(this.root === null) return;

    const queue = [this.root];
    while (queue.length > 0){
      const currentNode = queue.shift();

      callback(currentNode.data);

      if(currentNode.left !== null){
        queue.push(currentNode.left);
      }
      if(currentNode.right !== null){
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback) {}

  preOrderForEach(callback) {}

  postOrderForEach(callback) {}

  height(value) {}

  depth(value) {}

  isBalanced() {}

  rebalance() {}
}


/*const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);

tree.levelOrderForEach((value) => {
  console.log("Reading value: " + value);
});*/
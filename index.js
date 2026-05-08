import Tree from "./tree.js";

const getRandomNumbers = (size) => {
  const nums = new Set();
  while (nums.size < size) {
    nums.add(Math.floor(Math.random() * 100));
  }
  return Array.from(nums);
};

const randomArray = getRandomNumbers(10);
const myTree = new Tree(randomArray);

console.log("Are you balanced?", myTree.isBalanced());

const levelOrderData = [];
myTree.levelOrderForEach((value) => {
  levelOrderData.push(value);
});

const preOrderData = [];
myTree.preOrderForEach((value) => {
  preOrderData.push(value);
});

const inOrderData = [];
myTree.inOrderForEach((value) => {
  inOrderData.push(value);
});

const postOrderData = [];
myTree.postOrderForEach((value) => {
  postOrderData.push(value);
});

console.log("Initial Traversals");
console.log("Level Order:", levelOrderData);
console.log("Pre Order:", preOrderData);
console.log("In Order:", inOrderData);
console.log("Post Order:", postOrderData);

myTree.insert(120);
myTree.insert(150);
myTree.insert(200);
myTree.insert(300);

console.log("\nExecuting rebalance()...");

myTree.rebalance();
//cleaning
levelOrderData.length = 0;
preOrderData.length = 0;
inOrderData.length = 0;
postOrderData.length = 0;

myTree.levelOrderForEach((value) => {
  levelOrderData.push(value);
});
myTree.preOrderForEach((value) => {
  preOrderData.push(value);
});
myTree.inOrderForEach((value) => {
  inOrderData.push(value);
});
myTree.postOrderForEach((value) => {
  postOrderData.push(value);
});

console.log("Are you balanced after being rebalanced?:", myTree.isBalanced());

console.log("Post-rebalanced Traversals");
console.log("Level Order:", levelOrderData);
console.log("Pre Order:", preOrderData);
console.log("In Order:", inOrderData);
console.log("Post Order:", postOrderData);

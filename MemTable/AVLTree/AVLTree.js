import Node from "./Node/Node.js";

export default class AVLTree {
  size = 0;
  constructor() {
    this.root = null;
  }

  // Utility function to get the height of a node.
  getHeight(node) {
    return node ? node.height : 0;
  }

  // Utility function to get balance factor of a node.
  getBalanceFactor(node) {
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  // Rotate node to the right.
  rightRotate(y) {
    const x = y.left;
    const T3 = x.right;

    // Perform rotation
    x.right = y;
    y.left = T3;

    // Update heights post rotation
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x; // New root
  }

  // Rotate node to the left.
  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    // Perform rotation
    y.left = x;
    x.right = T2;

    // Update heights post rotation
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y; // New root
  }

  // Recursively inserts a node and performs rotations if necessary.
  insert(node, key, value) {
    if (!node) {
      this.size += 1;
      return new Node(key, value);
    }
    if (key < node.key) {
      node.left = this.insert(node.left, key, value);
    } else if (key > node.key) {
      node.right = this.insert(node.right, key, value);
    } else {
      
      node.value = value;
      return node; // Duplicate data not allowed.
    }

    // Update node's height.
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));

    // Get the balance to check if it became unbalanced.
    const balance = this.getBalanceFactor(node);

    // Left heavy scenario
    if (balance > 1) {
      if (key < node.left.key) {
        return this.rightRotate(node);
      } else {
        node.left = this.leftRotate(node.left);
        return this.rightRotate(node);
      }
    }

    // Right heavy scenario
    if (balance < -1) {
      if (key > node.right.key) {
        return this.leftRotate(node);
      } else {
        node.right = this.rightRotate(node.right);
        return this.leftRotate(node);
      }
    }

    return node;
  }

  add(key, value) {
    this.root = this.insert(this.root, key, value);
  }
  get(key) {
    const node = this.getWithNode(this.root, key);
    node.print();
    return node;
  }
  delete(key){
    
  }
  getWithNode(node, key) {
    if (!node) return null;
    if (key < node.key) {
      //console.log('left');
      return this.getWithNode(node.left, key);
    } else if (key > node.key) {
      // console.log('right');
      return this.getWithNode(node.right, key);
    } else {
      return node; // Duplicate data not allowed.
    }
  }
  getInOrder() {
    console.log('Root Height: ', this.root.height);
    console.log('Root Key: ', this.root.key + '\n');
    return this.getInOrderWithNode(this.root);
  }
  1
  getInOrderWithNode(node) {
    if (node == null) {
      return;
    }
    else {
      this.getInOrderWithNode(node.left);
      node.print();
      this.getInOrderWithNode(node.right);
    }
  }
}
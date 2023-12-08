
export default class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1; // New nodes always start with a height of 1.
  }
  print(){
    console.log(this.key, ": ", this.value);
  }
}
import AVLTree from "./AVLTree/AVLTree.js";

export default class MemTable{
  constructor(list){
    this.data_map = new AVLTree();
    if(list && Array.isArray(list)){
      list.forEach((data_record)=>{
        this.putRecord(data_record);
      })
    }
  }
  putRecord(data_record){
    this.data_map.add(data_record.key, data_record.value);
  }
  getKey(key){
    return this.data_map.get(key);
  }
  getSize(){
    return this.data_map.size;
  }
  print(){
    this.data_map.getInOrder();
  }
  //Make a clear function with setting everything to null;
}
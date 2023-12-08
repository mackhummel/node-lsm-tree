import CommitLog from "../CommitLog/CommitLog.js";
import DataRecord from "../DataRecord/DataRecord.js";
import MemTable from "../MemTable/MemTable.js";

const TOMBSTONE = "<TOMBSTONE>";
export default class LSMDataStore {
  commit_log;
  mem_table;

  constructor() {
    this.commit_log = new CommitLog();
  }

  async init(){
    const data_records = await this.commit_log.init();
    if(data_records && Array.isArray(data_records)){
      this.mem_table = new MemTable(data_records);
    }
    else{
      this.mem_table = new MemTable();
    }
  }
  put(key, value){
    const dr = new DataRecord(key, value);
    this.commit_log.writeToLog(dr);
    this.mem_table.putRecord(dr);
  }
  get(key){
    return this.mem_table.getKey(key);
  }
  delete(key){
    this.put(key, TOMBSTONE);
  }
  printMemTable(){
    this.mem_table.print();
  }
}
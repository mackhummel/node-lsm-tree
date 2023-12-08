import fs from "fs";
import CommitLog from "./CommitLog/CommitLog.js";
import MemTable from "./MemTable/MemTable.js";
import LSMDataStore from "./LSMStorageEngine/LSMDataStore.js";

const execute = async () => {
  const lsm_ds = new LSMDataStore();
  await lsm_ds.init();
  lsm_ds.put(1, 'mack');
  lsm_ds.put(2, 'is');
  lsm_ds.printMemTable();
  lsm_ds.put(3, 'it');
  lsm_ds.put(3, 'these');
  lsm_ds.put(4, 'these');
  lsm_ds.printMemTable();
}

execute()
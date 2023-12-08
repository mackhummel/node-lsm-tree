import fs from 'fs';
import os from 'os';
import readline from 'readline';
import DataRecord from '../DataRecord/DataRecord.js';

const FILE_PATH = 'commit-log.log';

export default class CommitLog {
  size = 0;
  writer = null;
  encoder = new TextEncoder();
  decoder = new TextDecoder();
  constructor() {
    this.writer = this.createFileStream();
  }

  //Returns [DataRecord] if file is not empty;
  async init() {
    if (fs.existsSync(FILE_PATH)) {
      const prev_commit_log = await this.readCommitLog();
      return prev_commit_log;
    }
    else{
      return null;
    }
  }
  createFileStream() {
    return fs.createWriteStream(FILE_PATH, { flags: 'a' });
  }
  writeToLog(data_record) {
    this.writer.write(this.encoder.encode(this.entryToString(data_record) + os.EOL));
    this.size += 1;
  }
  entryToString(data_record) {
    return data_record.key + '::' + data_record.value;
  }
  async readCommitLog() {
    const reader = fs.createReadStream(FILE_PATH);

    const line_reader = readline.createInterface({
      input: reader,
      crlfDelay: Infinity
    });

    const data_records = [];
    for await (const line of line_reader) {
      const decode_line = this.decoder.decode(line);
      const { key, value } = this.getKeyValueFromLine(decode_line);
      data_records.push(new DataRecord(key, value));
      this.size += 1;
    }
    return data_records;
  }
  getKeyValueFromLine(line) {
    const index = line.indexOf('::');
    return {
      key: line.substring(0, index),
      //skip over ::
      value: line.substring(index + 2)
    }
  }
  getSize() {
    return this.size;
  }
  clear() {
    if (fs.existsSync(FILE_PATH)) {
      fs.rmSync(FILE_PATH);
    }
    this.writer = this.createFileStream();
    this.size = 0;
  }
}
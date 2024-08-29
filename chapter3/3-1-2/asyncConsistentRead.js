import { readFile } from "fs";

const cache = new Map();

function consistentReadAsync(filename, callback) {
  if (cache.has(filename)) {
    process.nextTick(() => callback(cache.get(filename)));
  } else {
    readFile(filename, "utf8", (err, data) => {
      cache.set(filename, data);
      callback(data);
    });
  }
}



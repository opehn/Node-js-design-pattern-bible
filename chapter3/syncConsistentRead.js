import { readFileSync } from "fs";

const cache = new Map();

function consistentReadSync(filename) {
  if (cache.has(filename)) {
    if (cache.has(filename)) {
      return cache.get(filename);
    } else {
      const data = readFileSync(filename, "utf8");
      cache.set(filename, data);
      return data;
    }
  }
}

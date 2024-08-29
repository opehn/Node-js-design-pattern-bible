import { readFile } from "fs";

function readJSON(filename, callback) {
  readFile(filename, "utf8", (err, data) => {
    let parsed;
    if (err) {
      // 에러를 전파하고 현재의 함수에서 빠져나옴
      return callback(err);
    }
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      return callback(err);
    }
    callback(null, parsed);
  });
}

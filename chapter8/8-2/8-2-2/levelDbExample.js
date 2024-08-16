import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { Level } from "level";
import { levelSubscribe, levelSubscribeProxy } from "./levelsubscribe.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const dbPath = join(__dirname, "db");

//levelSubscribe(db);
const db = levelSubscribeProxy(new Level(dbPath, { valueEncoding: "json" }));

db.subscribe({ doctype: "tweet", language: "en" }, (k, val) =>
  console.log(val)
);

db.put("1", {
  doctype: "tweet",
  text: "Hi",
  language: "en",
});

db.put("2", {
  doctype: "company",
  name: "ACME Co.",
});

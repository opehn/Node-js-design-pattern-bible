import { promises as fs } from "fs";
import objectPath from "object-path";

export class Config {
  constructor(formatStrategy) {
    this.data = {};
    this.formatStrategy = formatStrategy;
  }

  get(configPath) {
    return objectPath.get(this.data, configPath);
  }

  set(configPath, value) {
    return objectPath.set(this.data, configPath, value);
  }

  async load(filePath) {
    console.log(`Deserializing from ${filePath}`);
    this.data = this.formatStrategy.deserialize(
      await fs.readFile(filePAth, "utf-8")
    );
  }
}

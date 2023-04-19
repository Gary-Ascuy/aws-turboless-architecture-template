import yaml from "js-yaml";
import { promises as fs } from "fs";

/**
 * Generates YAML file from TS file for serverless
 *
 * @param fileInput TS file input to generate schema yaml file
 */
export async function convert(fileInput: string): Promise<void> {
  const file = fileInput.replace("./src/functions", "@functions");
  const schema = require(file);
  const out = fileInput.replace(/\.schema\.ts/i, ".schema.yml");
  console.log(`Generating ${out} file`);
  const content = yaml.dump(schema.default);
  await fs.writeFile(out, content);
}

const file = process.argv.pop() as string;
convert(file);

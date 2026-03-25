import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const schemaPath = resolve(__dirname, '../schema/widget-registry.schema.json');
const registryPath = resolve(__dirname, '../registry.json');

const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
const registry = JSON.parse(readFileSync(registryPath, 'utf-8'));

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(schema);
const valid = validate(registry);

if (valid) {
  console.log('Registry is valid!');
  console.log(`Found ${registry.widgets.length} widget(s):`);
  for (const widget of registry.widgets) {
    console.log(`  - ${widget.title} (type: ${widget.type}, version: ${widget.version})`);
  }
  process.exit(0);
} else {
  console.error('Registry validation failed:');
  for (const error of validate.errors) {
    console.error(`  ${error.instancePath || '/'}: ${error.message}`);
  }
  process.exit(1);
}

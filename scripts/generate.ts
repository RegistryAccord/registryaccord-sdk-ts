import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

const configPath = path.join(__dirname, '../openapitools.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const generators = config['generator-cli'].generators;

console.log('Generating SDKs for:', Object.keys(generators).join(', '));

Object.entries(generators).forEach(([key, value]) => {
    const genConfig = value as {
        inputSpec: string;
        output: string;
        generatorName: string;
        additionalProperties?: Record<string, string>;
    };
    console.log(`\nGenerating ${key}...`);

    const inputSpec = path.resolve(__dirname, '..', genConfig.inputSpec);
    const output = genConfig.output.replace('#{cwd}', process.cwd());
    const generatorName = genConfig.generatorName;
    const additionalProps = genConfig.additionalProperties || {};

    // Construct additional properties string
    const props = Object.entries(additionalProps)
        .map(([k, v]) => `${k}=${v}`)
        .join(',');

    const command = `npx openapi-generator-cli generate -g ${generatorName} -i ${inputSpec} -o ${output} --additional-properties="${props}"`;

    try {
        execSync(command, {
            stdio: 'inherit',
        });
    } catch (error) {
        console.error(`Failed to generate ${key}`, error);
        process.exit(1);
    }
});

console.log('\nGeneration complete!');

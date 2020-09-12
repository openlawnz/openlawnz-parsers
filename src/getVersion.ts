import fs from 'fs';

export default (): string => JSON.parse(fs.readFileSync(__dirname + '/../package.json').toString()).version;

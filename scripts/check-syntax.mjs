import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

for (const file of readdirSync('js').filter(f => f.endsWith('.js'))) {
  execFileSync(process.execPath, ['--check', join('js', file)], { stdio: 'inherit' });
}
console.log('Syntax check passed.');

import { writeFileSync, readFileSync, existsSync, mkdirSync, createReadStream, createWriteStream } from 'fs';

let component = readFileSync('lib/dual-list.component.ts').toString();
// writeFileSync('lib/dual-list.component.ts.bk', component);

const styles = readFileSync('lib/dual-list.component.css');
component = component.replace(/styleUrls:\s*\[.*?\]/, `styles: [\n\`${styles}\n\`]`);

// escape octal
component = component.replace(/\\/g, '\\\\');

// Template comes last, so don't worry about comma.
const template = readFileSync('lib/dual-list.component.html');
component = component.replace(/templateUrl:.*/, `template: \`\n${template}\n\``);


const dir = './tmp';
if (!existsSync(dir)) {
	mkdirSync(dir);
}

writeFileSync('tmp/dual-list.component.ts', component);
createReadStream('lib/angular-dual-listbox.module.ts').pipe(createWriteStream('tmp/angular-dual-listbox.module.ts'));
createReadStream('lib/index.ts').pipe(createWriteStream('tmp/index.ts'));


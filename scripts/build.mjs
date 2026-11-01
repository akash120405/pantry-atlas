import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
const files={};for(const name of ['ui.html','style.css','client.js','recipes.js','logic.js'])files[name]=await readFile(new URL('../worker/'+name,import.meta.url),'utf8');
const server=await readFile(new URL('../worker/server.js',import.meta.url),'utf8');
await writeFile(new URL('../worker/index.js',import.meta.url),'const assets = '+JSON.stringify(files)+';\n'+server);
await mkdir(new URL('../dist/server/',import.meta.url),{recursive:true});await mkdir(new URL('../dist/.openai/',import.meta.url),{recursive:true});
await copyFile(new URL('../worker/index.js',import.meta.url),new URL('../dist/server/index.js',import.meta.url));await copyFile(new URL('../.openai/hosting.json',import.meta.url),new URL('../dist/.openai/hosting.json',import.meta.url));
console.log('Built Pantry Atlas worker and embedded assets.');

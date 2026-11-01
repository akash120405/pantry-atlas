import {readFile,writeFile,mkdir} from 'node:fs/promises';
const destination=new URL('../docs/',import.meta.url);
const names=['ui.html','style.css','effects.css','client.js','recipes.js','logic.js','photos.js','motion.js','config.js'];
await mkdir(destination,{recursive:true});
for(const name of names){
 let source=await readFile(new URL('../worker/'+name,import.meta.url),'utf8');
 if(name==='ui.html')source=source.replace(/(href|src)="\/(?!\/)/g,'$1="./');
 if(name.endsWith('.js'))source=source.replace(/from '\/(?!\/)/g,"from './");
 if(name==='config.js')source="export const apiOrigin = 'https://pantry-atlas-kitchen.nickersssz.chatgpt.site';\n";
 await writeFile(new URL(name==='ui.html'?'index.html':name,destination),source);
}
await writeFile(new URL('.nojekyll',destination),'');
console.log('Built GitHub Pages site in docs/ with the hosted recognition API.');

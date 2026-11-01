import http from 'node:http';
import worker from '../worker/index.js';
const server=http.createServer(async(req,res)=>{try{const base='http://127.0.0.1:4173';const chunks=[];for await(const chunk of req)chunks.push(chunk);const body=Buffer.concat(chunks);const request=new Request(new URL(req.url,base),{method:req.method,headers:req.headers,...(body.length?{body}: {})});const response=await worker.fetch(request,process.env);res.writeHead(response.status,Object.fromEntries(response.headers));res.end(Buffer.from(await response.arrayBuffer()));}catch{res.writeHead(500);res.end('Preview error');}});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));

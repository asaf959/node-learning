const fs = require('fs')
const http = require('http');
const url = require('url');

// blocking, synchronous way
// const text = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(text)
// const textout = `this is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.text', textout)
// console.log('File written!');

// non blocking , asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err,data1) => {
//   if (err) return console.log('Error !');

//   fs.readFile(`./txt/${data1}`, 'utf-8', (err,data2) => {
//     console.log(data2)
//     fs.readFile(`./txt/${data1}`, 'utf-8', (err,data3) => {
//       console.log(data3)
//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//         console.log('your file has been written')
//       })
//       })
//     })
// })

// console.log('Will read file!')

// server

const server = http.createServer((req,res) => {
  console.log(req.url)
  const pathName = req.url;
  if (pathName === '/' || pathName === '/overview') {
    res.end("this is the overview")
  } else if (pathName === '/product') {
    res.end("this is the product")
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    })
    res.end('<h1>page is not found</h1>')
  }
})

server.listen(8000, '127.0.0.1', () => {
  console.log("Listening to request on port 8000")
})
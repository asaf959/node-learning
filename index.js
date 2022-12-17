const fs = require('fs')
const http = require('http');
const url = require('url');
const slugify = require('slugify')
const replace = require('./modules/replace')

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



const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(el => slugify(el.productName, {lower: true}))

console.log(slugs)

const server = http.createServer((req,res) => {




  const {query, pathname} = url.parse(req.url, true)


  // Overview page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {'Content-type' : 'text/html'})
    const cardHtml = dataObj.map(el => replace(tempCard, el)).join('')
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml)
    res.end(output)

 
    // Product page
  } else if (pathname === '/product') {
    res.writeHead(200, {'Content-type' : 'text/html'})
  const product = dataObj[query.id]
  const output = replace(tempProduct, product)
    res.end(output)


    // Api
  } else if (pathname === '/api') {
      res.writeHead(200, {'Content-type' : 'application/json'})
      res.end(data)
// Not found
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
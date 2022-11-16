const fs = require('fs')

// blocking, synchronous way
const text = fs.readFileSync('./txt/input.txt', 'utf-8')
console.log(text)
const textout = `this is what we know about the avocado: ${text}.\nCreated on ${Date.now()}`
fs.writeFileSync('./txt/output.text', textout)
console.log('File written!');

// non blocking , asynchronous way 
fs.readFile('./txt/start.txt', 'utf-8', (err,data) => {
console.log(data)
})

console.log('Will read file!')
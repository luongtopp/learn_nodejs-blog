const express = require('express')
const app = express()
const port = 3000

// respond with "hello world" when a GET request is made to the homepage
app.get('/trang-chu/', (req, res) => {
  var a =2;
var b =2;
var c = a+b;
  res.send('hello world')
})

app.listen(port,()=>console.log(`Example app listening at http://localhost:${port}`))


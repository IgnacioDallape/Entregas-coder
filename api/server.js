const fs = require('fs')
const express = require('express')
const { Router } = express
const app = express()
const router = new Router()
const productManager = require('./productManager/productManager')


app.listen(8080, () => {
  console.log('server corriendo')
})

app.get('/products', (req, res) => {
  let newProduct = new productManager('./productManager/productos.json')
  let resp = newProduct.getProducts()
  resp.then(pr => {
    res.send(pr)
})
resp.catch(err => {
    console.log(err)
})
});

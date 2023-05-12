// const fs = require('fs')
// const express = require('express')
// const { Router } = express
// const app = express()
// const router = new Router()
// const productManager = require('./PoductManager/ProductManager')


// app.listen(8080, () => {
//   console.log('server corriendo')
// })
// app.get('/' , (req,res) => { res.send('hola')})
// app.get('/products', (req, res) => {
//   let newProduct = new productManager('./ProductManager/productos.json')

//   let resp = newProduct.getProducts()
//   resp
//     .then(pr => {
//         res.send(pr)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// });

// app.get('/products/:id', (req, res) => {
//   let res = newProduct
// })

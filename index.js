
const fs = require('fs')
const express = require('express')
const { Router } = express
const app = express()
const { routerProducts, productManager } = require('./api/ProductManager/ProductManager')
const routerCart = require('./api/cart/cartManager')

app.use('/products', routerProducts)
app.use('/cart', routerCart)

app.get('/', (req,res) => {
  res.send('Bienvenidos a la pre-entrega1 !')
})


app.listen(8080, () => {
  
  console.log('server corriendo')
})




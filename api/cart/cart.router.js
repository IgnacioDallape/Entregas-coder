const fs = require('fs')
const express = require('express')
const { Router } = express
const productManager = require('../ProductManager/ProductManager')
const routerCart = new Router()
const CartManager = require('./cartManager')


//creo o vacio carrito

routerCart.post('/', (req, res) => {
    let cartMan = new CartManager('./cart.json')
    let prod = cartMan.addingProductsCart()
    try{
        fs.promises.writeFile(__dirname + '/cart.json', JSON.stringify(cartMan),'utf-8')
        res.send({'productos': prod})
    } catch ( err ) {
        console.log(err)
    }
})

//le agrego productos con el id de los que estan cargados en productos.json

routerCart.post('/:cid/products/:pid', async (req, res) => {
    let prodId = req.params.pid
    let prodManager = new CartManager('./cart.json')
    try {
        let prod = await prodManager.addingProductsCart(prodId)
        res.send('hola')

    } catch (err) {
        console.log(err)
    }
})

//esto me carga el carrito con lo recibido arriba y me da el total de productos del mismo

routerCart.get('/', async (req, res) => {
        console.log(this.cart)
        let prodInCart = await fs.promises.readFile('./api/cart/cart.json', 'utf-8')
        prodInCart = JSON.parse(prodInCart)
        let totalProd = [...this.cart,...prodInCart]
        await fs.promises.writeFile('./api/cart/cart.json', JSON.stringify(totalProd, null, 2), 'utf-8')
        res.status(500).send({ 'Carrito': totalProd })

})

module.exports =routerCart  
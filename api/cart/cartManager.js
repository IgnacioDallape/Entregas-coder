const fs = require('fs')
const express = require('express')
const { Router } = express
const { routerProducts, productManager } = require('../ProductManager/ProductManager')
const routerCart = new Router()

let cart = []

routerCart.post('/', (req, res) => {
    res.send({'productos':cart})
})

routerCart.post('/:cid/products/:pid', (req, res) => {
    let prodId = req.params.pid
    let prodManager = new productManager('../ProductManager/productos.json')
    let resp = prodManager.getProductsById(prodId)
        .then(async (pr) => {
            let cartManager = pr
            if (cartManager.id != undefined && cartManager.id !== null && cartManager.id > 0) {
                try {
                    let reading = await fs.promises.readFile('./api/cart/cart.json', 'utf-8')
                    reading = JSON.parse(reading)
                } catch (error) {
                    console.log(error)
                }
                let cartJson = { title: cartManager.title, id: cartManager.id }
                cart.push(cartJson)
                res.send(pr)
                return cart
            } else {
                res.send('Id no válido')
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

routerCart.get('/', (req, res) => {
    fs.promises.writeFile('./api/cart/cart.json', JSON.stringify(cart, null, 2), 'utf-8')
    res.send({ 'Carrito': cart })
})






module.exports = routerCart
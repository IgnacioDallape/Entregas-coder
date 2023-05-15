const fs = require('fs')
const express = require('express')
const { Router } = express
const { routerProducts, productManager } = require('../ProductManager/ProductManager')
const routerCart = new Router()

let cart = []

//creo o vacio carrito

routerCart.post('/', (req, res) => {
    fs.promises.writeFile(__dirname + '/cart.json', JSON.stringify(cart),'utf-8')
    res.send({'productos':cart})
})

//le agrego productos con el id de los que estan cargados en productos.json

routerCart.post('/:cid/products/:pid', async (req, res) => {
    let prodId = req.params.pid
    let prodManager = new productManager('../ProductManager/productos.json')
    try {                                                               //traigo el producto por id, si existe prosigo
        let cartManager = await prodManager.getProductsById(prodId)     //aca trae todo el producto
        if (cartManager.id != undefined && cartManager.id !== null) {
            try {
                let reading = await fs.promises.readFile('./api/cart/cart.json', 'utf-8')   
                reading = JSON.parse(reading)
                let a =  reading.map( e => e.id == prodId) ? true : false
                console.log(a)
            } catch (error) {
                console.log(error)
            }
            let cartJson = { id: cartManager.id }
            cart.push(cartJson)
            res.send(cartManager)
            return cart
        } else {
            res.send('Id no válido')
        }
    } catch (err) {
        console.log(err)
    }
})

//esto me carga el carrito con lo recibido arriba y me da el total de productos del mismo

routerCart.get('/', async (req, res) => {
        console.log(cart)
        let prodInCart = await fs.promises.readFile('./api/cart/cart.json', 'utf-8')
        prodInCart = JSON.parse(prodInCart)
        let totalProd = [...cart,...prodInCart]
        await fs.promises.writeFile('./api/cart/cart.json', JSON.stringify(totalProd, null, 2), 'utf-8')
        res.send({ 'Carrito': totalProd })

})






module.exports = routerCart
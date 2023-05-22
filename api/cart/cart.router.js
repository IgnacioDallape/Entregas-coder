const fs = require('fs')
const express = require('express')
const { Router } = express
const ProductManager = require('../ProductManager/ProductManager')
const routerCart = new Router()
const CartManager = require('./cartManager')
const cartManager = new CartManager()


//esto crea el carrito o elimina todo lo que tiene dentro

routerCart.post('/', async (req, res) => {
    try {
        let cartMan = new CartManager('/cart.json');
        cartMan = await cartMan.getCartProducts();
        console.log(cartMan,222)


        if (cartMan.length > 0) {
            const cartJson = JSON.stringify(cartMan.cart);

            fs.writeFile(__dirname + '/cart.json', cartJson, 'utf-8', async (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al escribir en el archivo');
                } else {
                    let cartData = await fs.readFile(__dirname + '/cart.json', 'utf-8');
                    res.send({ productos: JSON.parse(cartData) });
                }
            });
        } else {
            fs.writeFile(__dirname + '/cart.json', '', 'utf-8', (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al escribir en el archivo');
                } else {
                    res.send({ productos: [] });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error en el servidor');
    }
});




//le agrego productos con el id de los que estan cargados en productos.json

routerCart.post('/:cid/products/:pid', async (req, res) => {
    let prodId = req.params.pid
    let cartId = req.params.cid
    let cartManager = new CartManager('./cart.json')
    try {
        let prod = await cartManager.addingProductsCart(prodId,cartId)
        res.send(prod)

    } catch (err) {
        res.status(500).send(err)
    }
})

//esto me carga el carrito con lo recibido arriba y me da el total de productos del mismo

routerCart.get('/:cid', async (req, res) => {
    let cartId = req.params.cid
    try {
        let prodInCart = await cartManager.getCartProductsById(cartId)
        res.status(500).send({ 'Carrito': prodInCart })
    } catch (err) {
        res.status(500).send('carrito vacio' + err)
    }

})

module.exports = routerCart  
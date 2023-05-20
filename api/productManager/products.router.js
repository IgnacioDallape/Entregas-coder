const express = require('express')
const { Router } = express
const ProductManager = require('./ProductManager')
const routerProducts = new Router()

const bodyParser = require('body-parser');

routerProducts.use(bodyParser.json());

routerProducts.get('/', async (req, res) => {
    try{
        const newProduct = new ProductManager('./products.json')
        let resp = await newProduct.getProducts()
        res.send(resp)
    } catch (err) {
        res.status(500).send('error')
    }
    })

routerProducts.get('/:pid', async (req, res) => {
    try {
        const newProduct = new ProductManager('.productos.json')
        let resp = await newProduct.getProductsById(req.params.pid)
        res.send(resp)
    } catch (err) {
        res.status(500).send('error')

    }
})

//agrego productos a mi base de datos, para lugo usarlas en el carrito

routerProducts.post('/', async (req, res) => {
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;
    console.log(Object.values({ title }))
    try {
        let newProduct = new ProductManager('./productos.json')
        let a = await newProduct.addProducts(title, description, price, thumbnail, code, stock, status, category)
        if (a == false) {
            res.send('error')
        } else {

            res.send('Producto agregado correctamente');
        }
    } catch (err) {
        res.status(500).send(err)
    }


})

//modifico el producto que quiera

routerProducts.put('/:pid', async (req, res) => {

    let newProduct2 = new ProductManager('./productos.json')
    let prodId = req.params.pid
    let prodBody = req.body
    let prodItem = Object.keys(prodBody)
    let prodMod = Object.values(prodBody)
    let promises = []

    prodItem.forEach(key => {
        let prom = newProduct2.updateProducts(key, prodBody[key], prodId)
        promises.push(prom)
    })

    Promise.all(promises)
        .then(() => {
            res.send(prodBody)
        })
        .catch(err => {
            console.log(`Error: ${err}`)
            res.status(500).send(err)
        })
})




//elimino algun producto

routerProducts.delete('/:pid', async (req, res) => {
    let prodId = req.params.pid
    const newProduct = new ProductManager('./products.json')
    let resp = await newProduct.deleteProducts(prodId)
    res.send('producto eliminado')

})

module.exports = routerProducts


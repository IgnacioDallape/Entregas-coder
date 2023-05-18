const fs = require('fs').promises;
const express = require('express');
const productManager = require('../ProductManager/ProductManager');

class CartManager {
    constructor() {
        this.cart = [];
        this.id = 0;
    }

    async addingProductsCart(id) {
        const cartJson = './api/cart'; // Ruta de la carpeta JSON

        try {
            await fs.access(cartJson);
        } catch (error) {
            await fs.mkdir(cartJson);
        }

        if (id !== undefined && id !== null) {
            let prodManager = new productManager('../ProductManager/productos.json');
            prodManager = await prodManager.getProductsById(id);
            this.id = prodManager.id
            if (id) {
                this.cart.push(prodManager.id);
                await fs.writeFile('./api/cart/cart.json', JSON.stringify(this.cart, null, 2), 'utf-8');
                console.log('Producto agregado al carrito');
                return this.cart;
            } else {
                console.log('Error en el id');
            }
        } else {
                await fs.writeFile('./api/cart/cart.json', JSON.stringify(this.cart, null, 2), 'utf-8')
                console.log('Carrito creado');
        }
        return this.cart
    }


}

module.exports = CartManager;





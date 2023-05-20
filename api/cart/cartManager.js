const fs = require('fs').promises;
const express = require('express');
const ProductManager = require('../ProductManager/asdas');
const uuid4 = require('uuid4');

class CartManager {
    constructor() {
        this.cart = [];
    }

    async addingProductsCart(id) {
        try {
            let prodManager = new ProductManager('../ProductManager/productos.json');
            let prodComplete = await prodManager.getProductsById(id);
            if (!prodComplete) {
                console.log('El producto no existe en stock');
                return;
            }
    
            let cartProd = await this.getCartProducts();
    
            if (cartProd) {
                this.cart = JSON.parse(cartProd);
                this.cart = Object.values(this.cart)
                console.log(prodComplete);
    
                let existingProduct = this.cart.find((product) => product.id === prodComplete.id);
    
                if (existingProduct) {                                                       //corroboro si existe el producto, si asi es, le sumo uno en quantity, si no, le creo una quantity
                    if (typeof existingProduct.quantity === 'number') {                     // Verifico si la cantidad existente es un número
                        existingProduct.quantity += 1;                                      //no hace falta pushear ya que asi lo cambia directamente
                    } else {
                        console.log('La cantidad existente en el carrito no es un número');  //solo por si algo salio mal y no es un numero
                        return;
                    }
                } else {
                    let newProduct = {
                        id: prodComplete.id,
                        quantity: 1 
                    };
                    this.cart.push(newProduct);
                }
    
                await fs.writeFile('./api/cart/cart.json', JSON.stringify(this.cart, null, 2), 'utf-8');
                console.log(this.cart);
            } else {
                let newProduct = {
                    id: prodComplete.id,
                    quantity: 1
                };
                this.cart.push(newProduct);
                await fs.writeFile('./api/cart/cart.json', JSON.stringify(this.cart, null, 2), 'utf-8');
                console.log(this.cart);
            }
        } catch (err) {
            console.log(err);
        }
        return JSON.parse(await fs.readFile('./api/cart/cart.json', 'utf-8'))
    }
    
    async getCartProducts() {
        try {
            let prod = await fs.readFile('./api/cart/cart.json', 'utf-8');
            return prod;
        } catch (err) {
            await fs.writeFile('./api/cart/cart.json', JSON.stringify([], null, 2), 'utf-8');
            return false;
        }
    }

    async getCartProductsById(id) {
        try {
            let prod = await fs.readFile('./api/cart/cart.json', 'utf-8');
            prod = JSON.parse(prod);
            const cartArray = Object.values(prod);
            let finding = cartArray.find((e) => e.id == id);
            return finding;
        } catch (err) {
            console.log(err, 'Error en getCartProductsById');
            return false;
        }
    }

    async deleteCartProducts(id) {
        try {
            let a = this.getCartProductsById(id);
            this.cart = await fs.readFile('./api/cart/cart.json', 'utf-8');
            this.cart = JSON.parse(this.cart);
            this.cart = Object.values(this.cart);

            // Filtrar los productos y eliminar el que coincide con el ID dado
            this.cart = this.cart.filter((e) => e.id !== id);

            await fs.writeFile('./api/cart/cart.json', JSON.stringify(this.cart, null, 2), 'utf-8');
            return this.cart;
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CartManager;


const fs = require('fs').promises;
const express = require('express');
const ProductManager = require('../ProductManager/ProductManager');
const uuid4 = require('uuid4');
let prodManager = new ProductManager('../ProductManager/productos.json');

class CartManager {
    constructor() {
        this.cart = [];
    }

    async addingProductsCart(id, cartId) {
        try {
            let prodComplete = await prodManager.getProductsById(id);
    
            if (!prodComplete) {
                console.log('El producto no existe en stock');
                return false;
            }
            let cartProd = await this.getCartProducts();
            if (cartProd) {
                cartProd = JSON.parse(cartProd);
    
                let cartIndex = cartProd.findIndex(cart => cart.Cid === cartId);
                if (cartIndex !== -1) {
                    let existingProduct = cartProd[cartIndex].Products.find(product => product.id === id);
    
                    if (existingProduct) {
                        existingProduct.quantity += 1;
                    } else {
                        let newProduct = {
                            id: id,
                            quantity: 1
                        };
                        cartProd[cartIndex].Products.push(newProduct);
                    }
                } else {
                    let newCart = {
                        Cid: cartId,
                        Products: [{
                            id: id,
                            quantity: 1
                        }]
                    };
                    cartProd.push(newCart);
                }
            } else {
                cartProd = [{
                    Cid: cartId,
                    Products: [{
                        id: id,
                        quantity: 1
                    }]
                }];
            }
    
            await fs.writeFile('./api/cart/cart.json', JSON.stringify(cartProd, null, 2), 'utf-8');
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
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

    async getCartProductsById(cid) {
        try {
            let prod = await fs.readFile('./api/cart/cart.json', 'utf-8');
            prod = JSON.parse(prod);
            let finding = prod.find( e=> e.Cid === cid)
            console.log(finding)

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

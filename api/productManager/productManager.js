const fs = require('fs')
const express = require('express')
const { Router } = express
const uuid4 = require('uuid4');

class ProductManager {
    constructor() {
        this.products = []
    }

    async addProducts(title, description, price, thumbnail, code, stock, status, category) {
        if (title != undefined && description != undefined && price != undefined && thumbnail != undefined && code != undefined && stock != undefined && status != undefined && category != undefined) {
            try {
                const newProduct = {
                    title: title,
                    description: description,
                    price: price,
                    thumbnail: thumbnail,
                    code: code,
                    stock: stock,
                    status: status,
                    category: category,
                    id: uuid4()
                }

                let prod = await this.getProducts()
                prod = Object.values(prod)
                let codingView = prod.map(x => x.code)
                if (prod.length > 0) {
                    if ((codingView.find((e) => e.code !== code))) {
                        let a = this.products.find((x) => x.code === code) ? true : false
                        if (!a) {
                            this.products.push(newProduct)
                            await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(this.products, null, 2), 'utf-8')
                            console.log('producto agregado exitosamente')
                            return this.products
                        } else {
                            console.log('producto repetido')
                            return false
                        }

                    } else {
                        console.log('producto repetido')
                        return false
                    }
                } else {
                    console.log('array vacio')
                    this.products.push(newProduct)
                    await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(this.products, null, 2), 'utf-8')
                    return this.products

                }
            } catch (err) {
                console.log(err)
                return false


            }
        } else {
            console.log('complete todos los campos')
            return false
        }

    }

    async getProducts() {
        try {
                let read = await fs.promises.readFile('./api/ProductManager/productos.json', 'utf-8')
                if (read != undefined && read != null && read.length > 0) {
                    let readParsed = JSON.parse(read)
                    readParsed = Object.values(readParsed)
                    this.products = Array.isArray(readParsed) ? readParsed : []
                    return this.products
                } else {
                    return this.products = []
                }
        } catch (err) {
            console.log(err, 'error aca')
            return this.products = []
        }
    }

    async getProductsById(id) {
        try {
            let prod = await this.getProducts()
            let prodValues = Object.values(prod)
            let finding = prodValues.find(product => product.id == id)
            if (finding) {
                console.log('producto  encotrado con id: ' + id)
                return finding
            } else {
                console.log('producto no encotrado')
                return false
            }

        } catch (err) {
            console.log(err)
        }
    }

    async updateProducts(item, modification, id) {
        try {

            if (item != undefined && modification != undefined && id != undefined) {
                let prod = await this.getProducts()
                let prodValues = Object.values(prod)
                console.log(prodValues[4])
                let index = prodValues.findIndex((prod) => prod.id == id)
                let newItem = modification
                if (index !== -1) {
                    let mod = item
                    if (mod == 'title') {
                        prodValues[index].title = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    } else if (mod == 'description') {
                        prodValues[index].description = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    } else if (mod == 'price') {
                        prodValues[index].price = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    } else if (mod == 'thumbnail') {
                        prodValues[index].thumbnail = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    } else if (mod == 'code') {
                        prodValues[index].code = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    } else if (mod == 'status') {
                        prodValues[index].status = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    } else if (mod == 'stock') {
                        prodValues[index].stock = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    } else if (mod == 'category') {
                        prodValues[index].category = newItem;
                        await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(prodValues, null, 2), 'utf-8');
                        console.log(`El producto con id ${id} se actualizó correctamente, se actualizó su ${item}`);
                        return prodValues[index];
                    }
                    else {
                        console.log('error al cambiar parametro');
                    }
                } else {
                    console.log('no se encuentra un producto con ese id')
                }
            } else {
                console.log('complete todos los campos')

            }
        } catch (err) {
            console.log('error ', err)
        }


    }
    async deleteProducts(id) {
        try {
            let prod = await this.getProducts()
            let prodValues = Object.values(prod)
            let index = prodValues.findIndex(product => product.id == id)
            if (index !== -1) {
                prodValues.splice(index, 1)
                this.products = prodValues
                await fs.promises.writeFile('./api/ProductManager/productos.json', JSON.stringify(this.products, null, 2), 'utf-8')
                return this.products
            } else {
                console.log('producto no encontrado')
                return false
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const myProduct = new ProductManager()
async function addingFunction(title, description, price, thumbnail, code, stock, status, category) {
    await myProduct.addProducts(
        title = title,
        description = description,
        price = price,
        thumbnail = thumbnail,
        code = code,
        stock = stock,
        status = status,
        category = category
    )
}

//

module.exports = ProductManager

const express = require('express');
const { Router } = express;
const router = new Router();
const bodyParser = require('body-parser');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render('realtimeproducts', {})

})

router.post('/', (req, res) => {

    try {
        let data = [];
        let prodRT = req.body;
        res.status(200).send(prodRT)
        data.push(prodRT);
        console.log(data);
        io.sockets.emit('data', data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
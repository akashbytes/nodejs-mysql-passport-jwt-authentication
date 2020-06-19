
var express = require('express');
var router = express.Router();

var model = require('../models/product-model');

router.get('/', function(req, res) {
    model.getProducts(function(err, result) {
        if(err) {
            res.json(err)
        } else {
            if(result.length<=0){
                res.status(200).json({data:result});

            }else{
                res.status(200).json({data:result});
            }
        }
    })
})

router.get('/:id', function(req, res) {
    let id = req.params.id;
    model.getProduct(id, function(err, result) {
        res.json({data: result[0], error: err});
    })
})

router.post('/add', function(req, res) {
    model.addProduct(req.body, function(err, result) {
        res.json({data: result, error: err});
    })
})

router.put('/update', function(req, res) {
    model.updateProduct(req.body, function(err, result) {
        res.json({data: result, error: err});
    })
})

router.delete('/delete/:id', function(req, res) {
    let id = req.params.id;
    model.deleteProduct(id, function(err, result) {
        res.json({data: result, error: err});
    })
})
  
module.exports = router;

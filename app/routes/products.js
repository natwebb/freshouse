'use strict';

var Product = require('../models/product');

exports.index = function(req, res){
  Product.findAll(function(products){
    res.render('products/index', {products: products});
  });
};

exports.show = function(req, res){
  Product.findById(req.params.id, function(product){
    res.render('products/show', {product:product});
  });
};

exports.add = function(req, res){
  res.render('products/add');
};

exports.create = function(req, res){
  var p = new Product(req.body);
  p.save(function(){
    res.redirect('/products');
  });
};

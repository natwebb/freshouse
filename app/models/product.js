'use strict';

var _ = require('lodash');
var Mongo = require('mongodb');
var products = global.nss.db.collection('products');

module.exports = Product;

//---Constructor for New Products---//
function Product(data){
  this.name = data.name;
  this.cost = data.cost.replace(/[^0-9.]/g, '');
  this.cost = parseFloat(this.cost);
  this.shortDesc = data.shortDesc;
  this.sku = data.sku;
  this.category = data.category;
  this.tags = data.tags.split(',').map(function(tag){return tag.trim();});
  this.tags = _.compact(this.tags);
  this.longDesc = data.longDesc;
  this.url = '/img/products/'+data.filename;
}

//---Saves a product into the db; either inserts or updates based on whether the _id already exists. If insert, returns object as record; if update, returns count of updated objects as record.---//
Product.prototype.save = function(fn){
  products.save(this, function(err, record){
    fn(record);
  });
};

//---Deletes a product from the db by its Mongo ID---//
Product.deleteById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  products.remove({_id:_id}, function(err, count){
    fn(count);
  });
};

//---Finds a product in the db by its Mongo ID---//
Product.findById = function(id, fn){
  var _id = Mongo.ObjectID(id);
  products.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

//---Finds all products in the db---//
Product.findAll = function(fn){
  products.find().toArray(function(err, records){
    fn(records);
  });
};

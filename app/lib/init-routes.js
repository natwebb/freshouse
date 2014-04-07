'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var products = require('../routes/products');

  app.get('/', d, home.index);
  app.post('/feedback', d, home.feedback);
  //app.get('/about', d, home.about);
  //app.get('/faq', d, home.faq);
  app.get('/products', d, products.index);
  app.get('/products/add', d, products.add);
  app.post('/products/create', d, products.create);
  app.get('/products/:id', d, products.show);
  console.log('Routes Loaded');
  fn();
}


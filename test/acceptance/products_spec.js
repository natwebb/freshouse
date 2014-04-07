/* jshint expr:true */

'use strict';

process.env.DBNAME = 'fresh-house-test';
var request = require('supertest');
var app = require('../../app/app');
var Product;
var p1;
//var expect = require('chai').expect;
//var fs = require('fs');
//var exec = require('child_process').exec;

describe('Item', function(){
  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      Product = require('../../app/models/product');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      p1 = new Product({name: 'LaundryPure 4G', cost:'$799.99', shortDesc:'The money-saving LaundryPure 4G No-Suds Laundry System sure is great!', sku:'LaundryPure', category:'No-Suds Laundry System', tags:'laundry, NASA', longDescription:'You’ve heard us say that we aren’t what we eat, but what we absorb. LaundryPure ensures that you aren’t absorbing anything from the fabrics you touch. Avoid the allergic reactions that can be caused by detergents by using the LaundryPure to clean your clothes. The basic technology in LaundryPure has been successfully used for over a decade in hospitals, hotels, and commercial laundromats. Now you can save money and get cleaner laundry at home. Laundry washed in LaundryPure is softer, fluffier, and lasts longer!'});
      p1.save(function(){
        done();
      });
    });
  });

  describe('GET /products', function(){
    it('should display the product index', function(done){
      request(app)
      .get('/products')
      .expect(200, done);
    });
  });

  describe('GET /products/:id', function(){
    it('should display a product\'s show page', function(done){
      request(app)
      .get('/products/'+p1._id.toString())
      .expect(200, done);
    });
  });
});

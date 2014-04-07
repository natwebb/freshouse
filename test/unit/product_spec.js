/* jshint expr:true */

'use strict';

process.env.DBNAME = 'fresh-house-test';
var expect = require('chai').expect;
var Product;
//var fs = require('fs');
//var exec = require('child_process').exec;

describe('Product', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      Product = require('../../app/models/product');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      done();
    });
  });

  describe('new', function(){
    it('should create a new Product object', function(done){
      var p1 = new Product({name: 'LaundryPure 4G', cost:'$799.99', shortDesc:'The money-saving LaundryPure 4G No-Suds Laundry System sure is great!', sku:'LaundryPure', category:'No-Suds Laundry System', tags:'laundry, NASA', longDescription:'You’ve heard us say that we aren’t what we eat, but what we absorb. LaundryPure ensures that you aren’t absorbing anything from the fabrics you touch. Avoid the allergic reactions that can be caused by detergents by using the LaundryPure to clean your clothes. The basic technology in LaundryPure has been successfully used for over a decade in hospitals, hotels, and commercial laundromats. Now you can save money and get cleaner laundry at home. Laundry washed in LaundryPure is softer, fluffier, and lasts longer!'});
      expect(p1.name).to.equal('LaundryPure 4G');
      expect(p1.cost).to.equal(799.99);
      expect(p1.tags).to.have.length(2);
      done();
    });
  });

  describe('#save', function(){
    it('should insert a new Product into the db', function(done){
      var p1 = new Product({name: 'LaundryPure 4G', cost:'$799.99', shortDesc:'The money-saving LaundryPure 4G No-Suds Laundry System sure is great!', sku:'LaundryPure', category:'No-Suds Laundry System', tags:'laundry, NASA', longDescription:'You’ve heard us say that we aren’t what we eat, but what we absorb. LaundryPure ensures that you aren’t absorbing anything from the fabrics you touch. Avoid the allergic reactions that can be caused by detergents by using the LaundryPure to clean your clothes. The basic technology in LaundryPure has been successfully used for over a decade in hospitals, hotels, and commercial laundromats. Now you can save money and get cleaner laundry at home. Laundry washed in LaundryPure is softer, fluffier, and lasts longer!'});
      p1.save(function(){
        expect(p1._id.toString()).to.have.length(24);
        done();
      });
    });

    it('should update an existing Product in the db', function(done){
      var p1 = new Product({name: 'LaundryPure 4G', cost:'$799.99', shortDesc:'The money-saving LaundryPure 4G No-Suds Laundry System sure is great!', sku:'LaundryPure', category:'No-Suds Laundry System', tags:'laundry, NASA', longDescription:'You’ve heard us say that we aren’t what we eat, but what we absorb. LaundryPure ensures that you aren’t absorbing anything from the fabrics you touch. Avoid the allergic reactions that can be caused by detergents by using the LaundryPure to clean your clothes. The basic technology in LaundryPure has been successfully used for over a decade in hospitals, hotels, and commercial laundromats. Now you can save money and get cleaner laundry at home. Laundry washed in LaundryPure is softer, fluffier, and lasts longer!'});
      p1.save(function(){
        p1.name = 'LaundryPure 5G';
        p1.save(function(count){
          expect(count).to.equal(1);
          expect(p1.name).to.equal('LaundryPure 5G');
          done();
        });
      });
    });
  });

  describe('.deleteById', function(){
    it('should delete a product by ID', function(done){
      var p1 = new Product({name: 'LaundryPure 4G', cost:'$799.99', shortDesc:'The money-saving LaundryPure 4G No-Suds Laundry System sure is great!', sku:'LaundryPure', category:'No-Suds Laundry System', tags:'laundry, NASA', longDescription:'You’ve heard us say that we aren’t what we eat, but what we absorb. LaundryPure ensures that you aren’t absorbing anything from the fabrics you touch. Avoid the allergic reactions that can be caused by detergents by using the LaundryPure to clean your clothes. The basic technology in LaundryPure has been successfully used for over a decade in hospitals, hotels, and commercial laundromats. Now you can save money and get cleaner laundry at home. Laundry washed in LaundryPure is softer, fluffier, and lasts longer!'});
      p1.save(function(){
        Product.deleteById(p1._id.toString(), function(count){
          expect(count).to.equal(1);
          done();
        });
      });
    });
  });

  describe('.findById', function(){
    it('should find a product by ID', function(done){
      var p1 = new Product({name: 'LaundryPure 4G', cost:'$799.99', shortDesc:'The money-saving LaundryPure 4G No-Suds Laundry System sure is great!', sku:'LaundryPure', category:'No-Suds Laundry System', tags:'laundry, NASA', longDescription:'You’ve heard us say that we aren’t what we eat, but what we absorb. LaundryPure ensures that you aren’t absorbing anything from the fabrics you touch. Avoid the allergic reactions that can be caused by detergents by using the LaundryPure to clean your clothes. The basic technology in LaundryPure has been successfully used for over a decade in hospitals, hotels, and commercial laundromats. Now you can save money and get cleaner laundry at home. Laundry washed in LaundryPure is softer, fluffier, and lasts longer!'});
      p1.save(function(){
        Product.findById(p1._id.toString(), function(record){
          expect(record._id.toString()).to.equal(p1._id.toString());
          done();
        });
      });
    });
  });
});


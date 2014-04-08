/* global productData, PAYPAL: true */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    createBuyButton();
  }

  function createBuyButton(){
    var add = PAYPAL.apps.ButtonFactory.create('orders@gofreshhouse.com', productData, 'cart');
    $('#columnB').append(add);
  }

})();


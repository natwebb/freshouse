'use strict';

exports.index = function(req, res){
  res.render('home/index', {title: 'The Fresh House'});
};

exports.faq = function(req, res){
  res.render('home/faq', {title: 'The Fresh House'});
};

exports.about = function(req, res){
  res.render('home/about', {title: 'The Fresh House'});
};

exports.feedback = function(req, res){
  console.log('/************************************/');
  console.log(req.body);
};

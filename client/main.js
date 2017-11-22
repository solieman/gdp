import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
import '../imports/client/login/login.js';
import '../imports/client/ads-template/list-of-ads/list-of-ads.js';
import '../imports/client/ads-template/ads-view/ads-view.js';
import '../imports/client/checkout-template/checkout-card.js';
import '../imports/client/checkout-template/checkout-item/checkout-item.js';
import '../imports/client/admin-screen/admin-screen.js';
import '../imports/client/admin-screen/order-item.js';


import '../imports/startup/accounts-config.js';

Router.configure({
	layoutTemplate: 'main_layout'
});

Router.map(function(){
	Router.route('/', function () {
	  this.render('login_screen');
	});

	Router.route('/ads', function () {
	  this.render('list_of_ads');
	});

	Router.route('/checkout', function () {
	  this.render('checkout_card');
	});	

	Router.route('/admin', function () {
	  this.render('admin_screen');
	});	
});
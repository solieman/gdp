import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Ads } from '/imports/shared/ads.js';
import { _ } from 'meteor/underscore';

import './checkout-card.html';

Template.checkout_card.onRendered(function helloOnCreated() {
	this.counter = new ReactiveVar(0);
	Meteor.subscribe("ads", function(res,err) {

	});
});

Template.checkout_card.helpers({
	allSelectedAds() {
		
		const selectedAds = Session.get('allAds');
		return selectedAds;
	},
	totalCount(){
		return Session.get('allAds').length;
	},
	totalPrice(){
		const checkPrices = Session.get('allAds');
		const prices = Ads.find({}).fetch();

		let totalPrice = 0;

		if (checkPrices && checkPrices.length > 0) {
			_.each(checkPrices,function(element) {
				totalPrice += parseFloat(_.findWhere(prices,{id:element}).price);
			});
		}
		return totalPrice;		
	},
	'adsData'(id) {
		const currentData = Ads.findOne({
			id: id
		});
		return currentData;
	}
});




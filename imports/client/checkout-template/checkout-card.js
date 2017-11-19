import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import { Ads } from '/imports/shared/ads.js';

import './checkout-card.html';
import './checkout-card.css';

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
		const allAds = Session.get('allAds');

		const classicList =  _.filter(allAds, function(item) {
			return item === 'classic'
		});

		const standoutList =  _.filter(allAds, function(item) {
			return item === 'standout'
		});
	
		const premiumList =  _.filter(allAds, function(item) {
			return item === 'premium'
		});

		return {
			classic: classicList.length,
			standout: standoutList.length,
			premium: premiumList.length
		}

	},
	defaultPrice(){
		const checkPrices = Session.get('allAds');
		const prices = Ads.find({}).fetch();

		let totalPrice = 0;

		if (checkPrices && checkPrices.length > 0) {
			_.each(checkPrices,function(element) {
				totalPrice += parseFloat(_.findWhere(prices,{id:element}).price);
			});
		}
		return totalPrice.toFixed(2);		
	},
	clientPrice () {
		const thisClientTotal = Session.get('clientTotal');
		return thisClientTotal;
	},
	'adsData'(id) {
		const currentData = Ads.findOne({
			id: id
		});
		return currentData;
	},
	currentUser() {
		const currentUserData = Meteor.user();
		if (currentUserData) {
			return currentUserData.profile.fisrt_name || currentUserData.profile.last_name;
		}
		return null;
	},
});


Template.checkout_card.events({
  'click .back_btn'(event) {
    const temp = Template.instance();
    event.preventDefault();
    Router.go('ads');
  },
});


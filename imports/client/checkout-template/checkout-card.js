import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import { Ads } from '/imports/shared/ads.js';

import './checkout-card.html';
import './checkout-card.css';

Template.checkout_card.created = function () {
	const template = this;

	template.reactiveVars = {
		defaultPrice : new ReactiveVar(0),
		listOfRules: new ReactiveVar([])
	}
	Meteor.subscribe("ads", function(res,err) {

	});

	const checkPrices = Session.get('allAds');
		
	Meteor.call('defaultPrice', checkPrices, function (error, result){
		if (error) {

		} else {
			template.reactiveVars.defaultPrice.set(result);
		}
	});

	Meteor.call('listOfRules', function(error,result){
		if (error) {
	      console.log(error);

	    } else {
	      console.log(result);
	      template.reactiveVars.listOfRules.set(result);
	    }
	});
}

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
		const template = Template.instance();
		if (template.reactiveVars.defaultPrice.get()) {
        	return template.reactiveVars.defaultPrice.get();
		}
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
  'click .back-btn'(event) {
    const temp = Template.instance();
    event.preventDefault();
    Router.go('ads');
  },
  'click .submit-order-btn'(event) {
  	event.preventDefault();
  	const temp = Template.instance();
	const selectedAds = Session.get('allAds');
	const thisClientTotal = Session.get('clientTotal');

  	const newOrderData = {
  		pricingRules: template.reactiveVars.listOfRules.get(),
  		listOfItems: selectedAds,
  		totalPrice: thisClientTotal
  	};

  	Meteor.call('insertNewOrder', newOrderData, function(err, result){

  		if(err) {
  			console.log(err);

  		} else {
  			sAlert.info('Your order submitted, our team will come back to you soon.', {onRouteClose: false, timeout: 6000,position: 'top', stack: false});
  			Session.set('allAds',null);
  			Router.go('ads')
  		}
  	});
  }
});
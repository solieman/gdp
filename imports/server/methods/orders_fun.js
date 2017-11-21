import { Meteor } from 'meteor/meteor';

import { Pricing } from '/imports/shared/pricing.js';
import { Orders } from '/imports/shared/orders.js';


Meteor.methods({
    'insertNewOrder'(orderData){
    	const currentUserData = Meteor.user();

        if (currentUserData) {

        	const cp = Pricing.find({
	    		clients: currentUserData.username
	    	}).fetch();

        	Orders.insert({
        		customer: currentUserData.username,
				listOfItems: orderData.listOfItems,
				totalExpected: orderData.totalPrice
        	});
        	return true;
        }
    }
});




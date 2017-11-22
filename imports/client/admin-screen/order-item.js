import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import './order-item.html';
import './order-item.css';

Template.order_item.created = function () {
	const template = this;

	template.reactiveVars = {
		listOfOrders : new ReactiveVar(0),
		adminDiscount : new ReactiveVar(0),
		newTotal: new ReactiveVar(-1)
	}

}

Template.order_item.helpers({
	finalTotalToConfirm(totalExpected){
	  	const template = Template.instance();

	  	const newTotal = totalExpected - template.reactiveVars.adminDiscount.get();
	  	template.reactiveVars.newTotal.set(newTotal);
		return (newTotal.toFixed(2));
	}
});

Template.order_item.events({
	'keyup .admin-remove-smoe' (event) {
	  	event.preventDefault();
	  	const template = Template.instance();
	  	template.reactiveVars.adminDiscount.set(Number(event.target.value));
	},
	'click .confirm-btn' (event) {
	  	event.preventDefault();
	  	const template = Template.instance();

	  	const orderId = event.target.id;
	  	let newTotal = template.reactiveVars.newTotal.get();

	  	if (newTotal < 0) {
	  		newTotal = template.data.totalExpected;
	  	}

	  	if (orderId) {
	  		Meteor.call('confirmOrder', orderId,newTotal, function(error, result) {
	  			if (error) {

	  			} else {
	  				 Session.set('refreshAdminScreen',1000*Math.random()*Math.random());
	  			}
		  	});
	  	}  	
	}  
});
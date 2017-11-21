import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import { Orders } from '/imports/shared/orders.js';

import './checkout-card.html';
import './checkout-card.css';

Template.admin_screen.created = function () {
	const template = this;

	template.reactiveVars = {
		listOfOrders : new ReactiveVar(0)
	}
	Meteor.subscribe("orders", function(res,err) {
		if (err) {

		} else {
			template.reactiveVars.listOfOrders.set(Orders.find({}).fetch());
		}

	});
}

Template.admin_screen.helpers({
	allOrders() {
		const template = Template.instance();
		return template.reactiveVars.listOfOrders.get();
	}
});

Template.admin_screen.events({
  
});
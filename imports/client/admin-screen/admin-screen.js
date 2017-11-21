import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import { Orders } from '/imports/shared/orders.js';

import './admin-screen.html';
import './admin-screen.css';

Template.admin_screen.created = function () {
	const template = this;

	template.reactiveVars = {
		listOfOrders : new ReactiveVar(0)
	}
	Meteor.subscribe("orders", function() {
		const ordersList = Orders.find({}).fetch();
		template.reactiveVars.listOfOrders.set(ordersList);
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
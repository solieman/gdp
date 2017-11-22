import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import './rule-item.html';
import './rule-item.css';

Template.rule_item.created = function () {
	const template = this;

	template.reactiveVars = {
		listOfOrders : new ReactiveVar(0)
	}

}

Template.rule_item.helpers({
	
});

Template.rule_item.events({
	  
});
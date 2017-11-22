import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { _ } from 'meteor/underscore';

import { Pricing } from '/imports/shared/pricing.js';

import './rules-edit.html';
import './rules-edit.css';

Template.rules_edit.created = function () {
	const template = this;

	template.reactiveVars = {
		listOfRules : new ReactiveVar(0)
	}

	Meteor.subscribe("pricing", function() {
		const listOfRules = Pricing.find({}).fetch();
		template.reactiveVars.listOfRules.set(listOfRules);
	});
}


Template.rules_edit.onRendered(function helloOnCreated() {
  const template = this;

  this.autorun(()=> {
  	const refreshAdminScreen = Session.get('refreshAdminScreen');

  	const listOfRules = Pricing.find({}).fetch();
	template.reactiveVars.listOfRules.set(listOfRules);

  });

});


Template.rules_edit.helpers({
	allRules() {
		const template = Template.instance();
		return template.reactiveVars.listOfRules.get();
	}
});

Template.rules_edit.events({
	'click .confirm-orders-btn' (event) {
		Router.go('admin');
	}
	
});
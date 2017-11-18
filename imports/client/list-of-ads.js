import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Ads } from '/imports/shared/ads.js';

import "./list-of-ads.css";
import "./list-of-ads.html";

Template.list_of_ads.onRendered(function helloOnCreated() {

	Meteor.subscribe("ads", function(res,err) {

	});

});

Template.list_of_ads.helpers({  
  ads() {
    return Ads.find({}).fetch();
  },
});

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Ads } from '/imports/shared/ads.js';
import { Pricing } from '/imports/shared/pricing.js';

import "./list-of-ads.css";
import "./list-of-ads.html";

Template.list_of_ads.onRendered(function helloOnCreated() {

	Meteor.subscribe("ads", function(res,err) {

	});

  Meteor.subscribe("pricing", function(res,err) {

  });

});

Template.list_of_ads.helpers({  
  ads() {
    return Ads.find({}).fetch();
  },
  currentUser() {
    const currentUserData = Meteor.user();
    if (currentUserData) {
      return currentUserData.profile.fisrt_name || currentUserData.profile.last_name;
    }
    return null;
  },
  currentUserPrisingRules() {
    const currentUserData = Meteor.user();
    const listOfRules = [];

    if (currentUserData) {
      const cp = Pricing.find({
        clients: currentUserData.username
      }).fetch();

      if (cp && cp.length > 0) {
        _.each(cp, function(cpItem){
          if (cpItem.desc && cpItem.desc.length > 0) {
            _.each(cpItem.desc, function(descData){
              listOfRules.push(descData);
            })
          }
        });
      }
    }
    return listOfRules;    
  }
});

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Ads } from '/imports/shared/ads.js';
import { Pricing } from '/imports/shared/pricing.js';

import "./list-of-ads.css";
import "./list-of-ads.html";

Template.list_of_ads.created = function() {
  const template = this;

  template.reactiveVars = {
    listOfRules: new ReactiveVar(null),
    currentTotal: new ReactiveVar(0)
  };

  Meteor.subscribe("ads", function(res,err) {

  });

  Meteor.subscribe("pricing", function(res,err) {
    
  });
}

Template.list_of_ads.onRendered(function helloOnCreated() {

});

Template.list_of_ads.helpers({  
  ads() {
    const allAds = Ads.find({}).fetch();
    if (allAds && allAds.length > 0) {
      return allAds;
    }
    return null;
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
    const template = Template.instance();
    const listOfRulesDesc = [];

    if (currentUserData) {
      const cp = Pricing.find({
        clients: currentUserData.username
      }).fetch();


      const listOfRulesArray = [];

      _.each(cp,function(cpItem){
        listOfRulesArray.push(_.pick(cpItem, 'id').id);
      });

      template.reactiveVars.listOfRules.set(listOfRulesArray);

      if (cp && cp.length > 0) {
        _.each(cp, function(cpItem){
          if (cpItem.desc && cpItem.desc.length > 0) {
            _.each(cpItem.desc, function(descData){
              listOfRulesDesc.push(descData);
            })
          }
        });
      }
    }
    return listOfRulesDesc;    
  },
  canCheckOut() {
    const adsSelected = Session.get('allAds');
    if (adsSelected && adsSelected.length > 0) {
      return true;
    }
    return false;
  },
  currentTotal() {
    const template = Template.instance();
    const listOfRulesArray = template.reactiveVars.listOfRules.get();
    const selectedAds = Session.get('allAds');

    Meteor.call('calculateTotal', listOfRulesArray, selectedAds, (error, response) => {
      if (error) {
        
      } else {
        const cTotal = parseFloat(Number(response).toFixed(2));
        template.reactiveVars.currentTotal.set(cTotal);
      }
    });

    return template.reactiveVars.currentTotal.get();
  }
});

Template.list_of_ads.events({
  'click .checkout-btn'(event) {
    const temp = Template.instance();
    event.preventDefault();
    Router.go('checkout');
  },
});

// function callAntWait() {
    // const promise = new Promise() {
    //   Meteor.call('calculateTotal', listOfRulesArray, selectedAds, (error, response) => {
    //     if (error) {
    //       console.log('err',error);
    //       promise.reject(error);
    //     } else {
    //       const cTotal = parseFloat(Number(response).toFixed(2));
    //       console.log('currentTotal',cTotal);
    //       promise.resolve(cTotal);
    //     }
    //   });
    // };
    // return promise; 
// }
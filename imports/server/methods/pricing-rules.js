import { Meteor } from 'meteor/meteor';
import { Ads } from '/imports/shared/ads.js';
import { Pricing } from '/imports/shared/pricing.js';

Meteor.methods({
    pricinRules: function(){
    	const currentUserData = Meteor.user();
    	const listOfRulesDesc = [];
    
	    if (currentUserData) {
	      const cp = Pricing.find({
	        clients: currentUserData.username
	      }).fetch();
	      
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
	    
	    if (listOfRulesDesc && listOfRulesDesc.length > 0) {
	    	return listOfRulesDesc
	    } else {
	    	return ['Upgrade your account to have more offers...'];	    	
	    }
    },
    listOfRules: function() {
    	const currentUserData = Meteor.user();
    	const listOfRulesArray = [];
	    if (currentUserData) {
	    	const cp = Pricing.find({
	    		clients: currentUserData.username
	    	}).fetch();

		    _.each(cp,function(cpItem){
		    	listOfRulesArray.push(_.pick(cpItem, 'id').id);
		    });
		}

	    return listOfRulesArray;
    }
});
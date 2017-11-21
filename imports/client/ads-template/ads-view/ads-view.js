import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveVar } from 'meteor/reactive-var';

import "./ads-view.html";
import "./ads-view.css";



Template.ads_view.created = function() {
    const template = this;

    template.reactiveVars = {
        counter: new ReactiveVar(0)
    };

    const selectedAds = Session.get('allAds');
    const thisAdType = template.data.id;

    const filteredRuledList =  _.filter(selectedAds, function(item) {
        return item === thisAdType;
    });

    template.reactiveVars.counter.set(filteredRuledList.length);
}

Template.ads_view.onRendered(function helloOnCreated() {
	// counter starts at 0
    

});

Template.ads_view.helpers({
	adData() {
		const temp = Template.instance();

		if(temp && temp.data) {
			return temp.data;
		}
	},
    counterHelper: function () {
        const currentCount = Template.instance().reactiveVars.counter.get();

        return currentCount;
    }
});

Template.ads_view.events({
  'click .add-item-to-cart'(event) {
    const temp = Template.instance();
    // Prevent default browser form submit
    event.preventDefault();

    const currentCount = temp.reactiveVars.counter.get();

    temp.reactiveVars.counter.set(currentCount + 1);
 
    // Get value from form element
    const target = event.target;
    
    // Insert a task into the collection
    const selectedAds = Session.get('allAds') || [];
    selectedAds.push(target.id);
    Session.set('allAds', selectedAds);

    sAlert.info('New '+ target.id +' item added to your list', {onRouteClose: true, timeout: 1500});

  },
});
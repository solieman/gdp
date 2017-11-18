import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import "./ads-view.html";
import "./ads-view.css";


Template.ads_view.onRendered(function helloOnCreated() {
	// counter starts at 0
	console.log('onRendered', this.data);
});

Template.ads_view.helpers({
	adData() {
		const temp = Template.instance();

		if(temp && temp.data) {
			return temp.data;
		}
	}
});

Template.ads_view.events({
  'click .add-item-to-cart'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    
    // Insert a task into the collection
    const selectedAds = Session.get('allAds') || [];
    selectedAds.push(target.id);
    Session.set('allAds', selectedAds);
    
    console.log(target.id);
    console.log(selectedAds);
  },
});
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Ads } from '/imports/shared/ads.js';

Meteor.publish("ads", function () {
  return Ads.find();
});

Meteor.methods({
  'ads.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Ads.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'ads.remove'(adId) {
    check(adId, String);
 
    Ads.remove(adId);
  }
});
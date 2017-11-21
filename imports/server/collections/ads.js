import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Ads } from '/imports/shared/ads.js';

Meteor.publish("ads", function () {
  return Ads.find();
});
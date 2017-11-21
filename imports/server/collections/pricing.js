import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Pricing } from '/imports/shared/pricing.js';

Meteor.publish("pricing", function () {
  return Pricing.find();
});

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Orders } from '/imports/shared/orders.js';

Meteor.publish("orders", function () {
  return Orders.find();
});

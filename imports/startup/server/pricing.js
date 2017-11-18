import { Meteor } from 'meteor/meteor';
import { Pricing } from '/imports/shared/pricing.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Pricing.find().count() === 0) {
    const data = [
      {
        id: 'rule001',
        name: '3 for 2',
        desc: ['Gets a 3 for 2 deals on Classic Ads'],
        clients: ['unilever']
      },
      {
        id: 'rule002',
        name: 'Standout Ads price drops',
        desc: ['Gets a discount on Standout Ads where the price drops to $299.99 per ad'],
        clients: ['apple']
      },
      {
        id: 'rule003',
        name: 'Premium Ads price drops',
        desc: ['Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad'],
        clients: ['nike']
      },
      {
        id: 'rule004',
        name: 'Multiple options',
        desc: ['Gets a 5 for 4 deal on Classic Ads', 'Gets a discount on Standout Ads where the price drops to $309.99 per ad','Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad'],
        clients: ['ford']
      },

    ];

    let timestamp = (new Date()).getTime();

    data.forEach((list) => {
      const listId = Pricing.insert({
        id: list.id,
        name: list.name,
        desc: list.desc,
        createdAt: new Date(timestamp)
      });
      timestamp += 1; // ensure unique timestamp.
    });
  }
});
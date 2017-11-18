import { Meteor } from 'meteor/meteor';
import { Ads } from '/imports/shared/ads.js';

// if the database is empty on server start, create some sample data.
Meteor.startup(() => {
  if (Ads.find().count() === 0) {
    const data = [
      {
        id: 'classic',
        name: 'Classic Ad',
        price: '269.99',
        desc: 'Offers the most basic level of advertisement'
      },
      {
        id: 'standout',
        name: 'Standout Ad',
        price: '322.99',
        desc: 'Allows advertisers to use a company logo and use a longer presentation text'
      },
      {
        id: 'premium',
        name: 'Premium Ad',
        price: '394.99',
        desc: 'Same benefits as Standout Ad, but also puts the advertisement at the top of the results, allowing higher visibility'
      },
    ];

    let timestamp = (new Date()).getTime();

    data.forEach((list) => {
      const listId = Ads.insert({
        id: list.id,
        name: list.name,
        price: list.price,
        desc: list.desc,
        createdAt: new Date(timestamp)
      });
      timestamp += 1; // ensure unique timestamp.
    });
  }
});
import { Meteor } from 'meteor/meteor';

//Server
import '../imports/server/collections/ads.js';
import '../imports/server/collections/pricing.js';
import '../imports/server/collections/orders.js';

//Shared
import '../imports/shared/ads.js';
import '../imports/shared/pricing.js';

//Startup
import '../imports/startup/server/index.js';

//Methods
import '../imports/server/methods/calculator.js';
import '../imports/server/methods/orders_fun.js';
import '../imports/server/methods/pricing-rules.js';


Meteor.startup(() => {
  // code to run on server at startup
  
});

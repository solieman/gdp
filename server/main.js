import { Meteor } from 'meteor/meteor';

//Server
import '../imports/server/ads.js';
import '../imports/server/pricing.js';

//Shared
import '../imports/shared/ads.js';
import '../imports/shared/pricing.js';

//Startup
import '../imports/startup/server/index.js';

//Methods
import '../imports/server/methods/calculator.js';

Meteor.startup(() => {
  // code to run on server at startup
});

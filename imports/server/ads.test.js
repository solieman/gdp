import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
 
import { Ads } from '/imports/shared/ads.js';

if (Meteor.isServer) {
	describe('Ads', () => {
		describe('methods', () => {
			const userId = Random.id();
			let adsId;

			beforeEach(() => {
				Ads.remove({});
				adsId = Ads.insert({
					id: 'testAds',
	          		createdAt: new Date(),
	          		name: 'tmeasday',
          		});
          	});

      it('can delete owned ads', () => {
      	// Find the internal implementation of the ads method so we can
		// test it in isolation
		const deleteAds = Meteor.server.method_handlers['Ads.remove'];
		
		// Set up a fake method invocation that looks like what the method expects
		const invocation = { userId };

		// Run the method with `this` set to the fake invocation
		deleteAds.apply(invocation, [adsId]);

		// Verify that the method does what we expected
		assert.equal(Ads.find().count(), 0);
	});
	});
})
}
import { Meteor } from 'meteor/meteor';

import { Pricing } from '/imports/shared/pricing.js';
import { Orders } from '/imports/shared/orders.js';


Meteor.methods({
    'insertNewOrder'(orderData){
    	const currentUserData = Meteor.user();

        if (currentUserData) {

        	const cp = Pricing.find({
	    		clients: currentUserData.username
	    	}).fetch();

        	Orders.insert({
        		customer: currentUserData.username,
				listOfItems: orderData.listOfItems,
				totalExpected: orderData.totalPrice,
                confirmed:false,
                createdDate: new Date()
        	});
        	return true;
        }
    },
    'confirmOrder'(orderId, newTotal){
        const currentUserData = Meteor.user();

        if (currentUserData) {
            updateOrder(orderId, newTotal);
        }
    }
});


async function updateOrder(orderId,newTotal) {
  const oldData = await Orders.findOne({_id: orderId});
  const newData = await Orders.insert({
        customer: oldData.customer,
        listOfItems: oldData.listOfItems,
        totalExpected: newTotal,
        confirmed:true,
        createdDate: new Date()
    });
  return await Orders.remove({_id:orderId});
}

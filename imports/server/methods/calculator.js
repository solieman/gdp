import { Meteor } from 'meteor/meteor';
import { Ads } from '/imports/shared/ads.js';

Meteor.methods({
    calculateTotal: function(rules,listOfItems){
    	const currentUserData = Meteor.user();

        let total = 0;

        if (currentUserData) {
        	_.each(rules, function(rule){
        		switch(rule) {
		        	case 'rule001':
		        		total = rule001(listOfItems);
		        	break;
		        	case 'rule002':
		        		total = rule002(listOfItems);
		        	break;
		        	case 'rule003':
		        		total = rule003(listOfItems);
		        	break;
		        	case 'rule004':
		        		total = rule004(listOfItems);
		        	break;
		        	default:
		        		total = norule(listOfItems);
		        	break;
		        }
        	});	        	
        }
        return total;
    }
});

//Rules implementation
function norule(listOfItems) {
	let total = 0;
	_.each(listOfItems,function(item){
    	const price = parseFloat(Ads.findOne({id:item}).price);
    	total += price;
	});

	return total;
}

function rule001(listOfItems) {
	const filteredRuledList =  _.filter(listOfItems, function(item) {
		return item === 'classic'
	});

	const filteredUnRuledList =  _.filter(listOfItems, function(item) {
		return item !== 'classic'
	});

    const price = parseFloat(Ads.findOne({id:'classic'}).price);
    const discTotal = yFORx(filteredRuledList.length,2,3,price);

	let otherTotal = 0;
	_.each(filteredUnRuledList,function(item){
    	const price = parseFloat(Ads.findOne({id:item}).price);
    	otherTotal += price;
	});

	return (discTotal + otherTotal);
}

function rule002(listOfItems) {
	const filteredRuledList =  _.filter(listOfItems, function(item) {
		return item === 'standout'
	});

	const filteredUnRuledList =  _.filter(listOfItems, function(item) {
		return item !== 'standout'
	});

	const discTotal = cutItAllDown(filteredRuledList.length, 299.99);

	let otherTotal = 0;

	_.each(filteredUnRuledList,function(item){
    	const price = parseFloat(Ads.findOne({id:item}).price);
    	otherTotal += price;
	});

	return (discTotal + otherTotal);
}

function rule003(listOfItems) {
	const filteredRuledList =  _.filter(listOfItems, function(item) {
		return item === 'premium'
	});

	const filteredUnRuledList =  _.filter(listOfItems, function(item) {
		return item !== 'premium'
	});

	let discTotal = moreAreCheaper(filteredRuledList.length,4,'premium',379.99);	
	
	let otherTotal = 0;
	_.each(filteredUnRuledList,function(item){
    	const price = parseFloat(Ads.findOne({id:item}).price);
    	otherTotal += price;
	});

	return (discTotal + otherTotal);
}

function rule004(listOfItems) {
	const classicPrice = parseFloat(Ads.findOne({id:'classic'}).price);
	const filteredClassicRuledList =  _.filter(listOfItems, function(item) {
		return item === 'classic'
	});
    const classicDiscTotal = yFORx(filteredClassicRuledList.length,4,5,classicPrice);

	const standoutPrice = parseFloat(Ads.findOne({id:'standout'}).price);
	const filteredStandoutRuledList =  _.filter(listOfItems, function(item) {
		return item === 'standout'
	});
	const standoutDiscTotal = cutItAllDown(filteredStandoutRuledList.length, 309.99);

	const premiumPrice = parseFloat(Ads.findOne({id:'premium'}).price);
	const filteredPremiumRuledList =  _.filter(listOfItems, function(item) {
		return item === 'premium'
	});
    const premiumDiscTotal = moreAreCheaper(filteredPremiumRuledList.length,3,'premium',389.99);	

    return (classicDiscTotal+standoutDiscTotal+premiumDiscTotal);
}

//TO-DO: General usage methods

//Take Y by X price
function yFORx(listLength,x,y,price) {

	const noOfR = Math.floor(listLength / y);
	const noOfA = listLength % y;
	const discTotal = (x * noOfR * price) + (noOfA * price);

	return discTotal;
}

//Fixed discount
function cutItAllDown(listLength,newPrice) {
	return (Number(listLength) * Number(newPrice));
}

//Reach this limit to be winner
function moreAreCheaper(listLength,limit,type,newPrice) {
	let discTotal = 0;
	if (listLength >= limit) {//4
		discTotal = Number(listLength) * Number(newPrice);
	} else {
    	const price = parseFloat(Ads.findOne({id:type}).price);
		discTotal = Number(listLength) * Number(price);
	}
	return discTotal;
}
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

// Accounts.createUser({
//     username: 'admin',
//     email: 'admin@admin.com',
//     password: 'admin',
//     profile: {
//         first_name: 'Admin',
//         last_name: 'Last',
//         company: 'company',
//     }
// });
Accounts.onLogin(function(){
	Router.go('ads');
});

Accounts.onLogout(function(){
	Router.go('/');
})

var users=[
   {email: "admin@ads.com", username: "admin", name: "Admin", roles:['admin'], password:'admin'},
   {email: "unilever@ads.com", username: "unilever", name: "UNILEVER", roles:['user'], password:'unilever'},
   {email: "apple@ads.com", username: "apple", name: "APPLE", roles:['user'], password:'apple'},
   {email: "nike@ads.com", username: "nike", name: "NIKE", roles:['user'], password:'nike'},
   {email: "ford@ads.com", username: "ford", name: "FORD", roles:['admin'], password:'ford'},

];

if ( Meteor.users.find().count() === 0 ) {
	_.each(users, function(user){
	    Accounts.createUser({
	        email: user.email,
	        password: user.password,
	        username: user.username,
	        profile: {first_name: user.name},
	        profile: {last_name: user.name},
	        roles: user.roles
	    });
	});
}
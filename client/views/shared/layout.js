Template.singlePage.events({
	'click .logo': function() {
		window.open("http://www.tedxcapetown.org","_self");
	}
});

Template.adminMenu.events({
	'click .menuToggle': function(event, template) {
		var dropDown = template.$(".dropDown");
		if(dropDown.hasClass("active")) {
			template.$(".dropDownArrow").removeClass("active");
			dropDown.removeClass("active");
		}
		else {
			dropDown.addClass("active");
			template.$(".dropDownArrow").addClass("active");
		}
	},
	'click .logout': function(even, template) {
		Meteor.logout();
	},
	'click .resendVerificationEmail': function(event, template) {
		Meteor.call('resendVerificationEmail', function (error, result) {
			if(error) FlashMessages.sendError("There was an error sending the verfication message.");
			else FlashMessages.sendSuccess("Great! Sending verification email!");
		} );
	}
});

Template.manage.helpers({
	"username": function() {
		var user = Meteor.user();
    return user.emails[0].address;
  }
});

Template.manage.events({
	'click .logout': function(even, template) {
		Meteor.logout();
    Router.go("/login");
	},
	'click .resendVerificationEmail': function(event, template) {
		Meteor.call('resendVerificationEmail', function (error, result) {
			if(error) FlashMessages.sendError("There was an error sending the verfication message.");
			else FlashMessages.sendSuccess("Great! Sending... Check your email.");
		} );
	},
  'click .new-talk': function () {
    var newTalk = videos.insert(newTalkTemplate);
    Router.go('talks.edit', {"_id": newTalk});        
  }
});

var newTalkTemplate = {
	"speaker" : {
		"name" : ""
	},
	"description" : "",
	"title" : "",
	"url" : "",
	"videoId" : "",
	"provider" : "",
	"published" : false,
	"categories" : {
		"levels" : [ ],
		"subjects" : [ ],
		"industries" : [ ]
	},
	"archive" : false,
	"category" : "",
	"featured" : false
}

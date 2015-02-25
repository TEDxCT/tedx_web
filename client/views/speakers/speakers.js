Template.register.events({
	'click .cta' : function() {
		Router.go('speakers.register.apply');
	},

});

SimpleSchema.debug = true;

AutoForm.hooks({
  insertSpeakerApplicationForm: {
    	onSuccess: function(operation, result, template) {
			Router.go('speakers.register.complete');
		},
	}
});


AutoForm.hooks({
  insertSpeakerNominationForm: {
    	onSuccess: function(operation, result, template) {
			Router.go('speakers.register.complete');
		},
	}
});

Handlebars.registerHelper('isEqual', function(string1, string2) {
		return string1 === string2;
});

Handlebars.registerHelper('setSpeakerRegistrationType', function (type) {
      Session.set("speakerRegistrationType", type);
});

Template.speakers.helpers({
	'speakers': function() {
		return speakers.find({"speakerApplication": {$exists: false}});
	},
	'nominated': function() {
		return speakers.find({"speakerApplication": {$exists: false}});
	},
	'applied': function() {
		return speakers.find({"speakerApplication": {$exists: true}});
	},
});

Template.appliedSpeaker.helpers({
	'speakerdata': function() {
		return this.speakerApplication;
	},
});

Template.speaker.helpers({
	'gender': function() {
		if(this.speakerApplication=="male"){
			return "he";
		}
		else if(this.speakerApplication.gender=="female") {
			return "she";
		}
		else if(this.speakerApplication.gender=="other") {
			return this.speakerApplication.firstName;
		}
	},
});

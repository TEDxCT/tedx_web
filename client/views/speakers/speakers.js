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

Handlebars.registerHelper('setSpeakerRegistrationType', function (type) {
      Session.set("speakerRegistrationType", type);
});

Template.speakers.helpers({
	'speakers': function() {
		return speakers.find({"speakerApplication": {$exists: false}});
	},
	'nominated': function() {
		return speakers.find({"speakerNomination": {$exists: true}});
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

Template.nominatedSpeaker.helpers({
	'speakerdata': function() {
		return this.speakerNomination;
	},
});

Template.speaker.helpers({
	'gender': function() {
		if(this.speakerApplication.gender=="male"){
			return "He";
		}
		else if(this.speakerApplication.gender=="female") {
			return "She";
		}
		else if(this.speakerApplication.gender=="other") {
			return this.speakerApplication.firstName;
		}
	},
});

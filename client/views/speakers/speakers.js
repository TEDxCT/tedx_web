if (Meteor.isClient) {
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
}

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
		onError: function(formType, error) {
			FlashMessages.sendError("There was a problem saving your application. Please see below for errors.");
		},
	},
	updateSpeakerApplicationForm: {
    	onSuccess: function(operation, result, template) {
			// Router.go('speakers.register.complete');
			FlashMessages.sendSuccess("Update successful");
		},
		onError: function(formType, error) {
			FlashMessages.sendError("There was a problem saving your application. Please see below for errors.");
		},
	},
	insertSpeakerNominationForm: {
    	onSuccess: function(operation, result, template) {
			Router.go('speakers.register.complete');
		},
		onError: function(formType, error) {
			FlashMessages.sendError("There was a problem saving your application. Please see below for errors.");
		},
	},
	updateSpeakerNominationForm: {
    	onSuccess: function(operation, result, template) {
			// Router.go('speakers.register.complete');
			FlashMessages.sendSuccess("Update successful");
		},
		onError: function(formType, error) {
			FlashMessages.sendError("There was a problem saving your nomination. Please see below for errors.");
		},
	},
});


Handlebars.registerHelper('setSpeakerRegistrationType', function (type) {
      Session.set("speakerRegistrationType", type);
});

Handlebars.registerHelper('categoryName', function (identifier) {
	return categories.findOne({'_id' : identifier}, {'_id' : 0 , 'name' : 1}).name;
});



Template.appliedSpeaker.helpers({
	'speakerdata': function() {
		// return this.speakerApplication;
		return this;
	},
});

Template.nominatedSpeaker.helpers({
	'speakerdata': function() {
		// return this.speakerNomination;
		return this;
	},
});

Template.speaker.events({
	'click .vote': function() {
		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
		if(vote) {
			Meteor.call("removeVote", vote._id);
		}
		else {
			var voteCount = votes.find({"user": Meteor.userId()}).count();
			if(voteCount==3) {
				FlashMessages.sendError("You may only vote for three speakers.");
			} else {
				votes.insert({"speaker": this._id, "user": Meteor.userId()})
			}
		}
	}
})

Template.nominee.events({
	'click .vote': function() {
		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
		if(vote) {
			Meteor.call("removeVote", vote._id);
		}
		else {
			var voteCount = votes.find({"user": Meteor.userId()}).count();
			if(voteCount==3) {
				FlashMessages.sendError("You may only vote for three speakers.");
			} else {
				votes.insert({"speaker": this._id, "user": Meteor.userId()})
			}
		}
	},
})

Template.nominee.helpers({
	'voted': function() {
		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
		if(vote) {
			return true;
		}
		return false
	}
});

Template.speakerTile.helpers({
	'voted': function() {
		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
		if(vote) {
			return true;
		}
		return false
	}
})

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
	'voted': function() {
		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
		if(vote) {
			return true;
		}
		return false
	}
});

Template.edit_speaker_nominee.events({
	'click .btn-cancel': function() {
		console.log(this._id);
		Router.go('/speaker/nomination/' + this._id);
	}
})

Template.edit_speaker_application.events({
		'click .btn-cancel': function() {
		console.log(this._id);

		Router.go('/speaker/application/' + this._id);
	}
})


Handlebars.registerHelper('allSpeakers', function() {
	var s = speakers.find();
    return s;
});

Handlebars.registerHelper('nominated', function() {
		return speakers.find({"speakerNomination": {$exists: true}});
});

Handlebars.registerHelper('applied', function() {
		return speakers.find({"speakerApplication": {$exists: true}});
});

Handlebars.registerHelper('votesForSpeaker', function(speakerId) {
			var voteCount = votes.find({"speaker":speakerId}).count();
    return voteCount;
});

Handlebars.registerHelper('totalNumberOfVotes', function() {
	var voteCount = votes.find().count();
    return voteCount;
});

Template.speakers.helpers({
	'speakers': function() {
		return speakers.find({"speakerApplication": {$exists: false}});
	},
});

SimpleSchema.debug = true;

AutoForm.hooks({
  insertSpeakerApplicationForm: {
		before: {
	    // Replace `formType` with the form `type` attribute to which this hook applies
	    insert: function(doc) {
	      doc.application = true;
				doc.year = new Date().getFullYear();
	      return doc;
	    }
	  },
		onSuccess: function(formType, result) {
				Router.go('speakers.register.complete');
		},
		onError: function(formType, error) {
			FlashMessages.sendError("There was a problem saving your application. Please see below for errors.");
		}
	},
	updateSpeakerApplicationForm: {
		onSuccess: function(formType, result) {
					FlashMessages.sendSuccess("Update successful");
		},
		onError: function(formType, error) {
			FlashMessages.sendError("There was a problem saving your application. Please see below for errors.");
		}
	},
	insertSpeakerNominationForm: {
		before: {
			// Replace `formType` with the form `type` attribute to which this hook applies
			insert: function(doc) {
				doc.nomination = true;
				doc.year = new Date().getFullYear();
				return doc;
			}
		},
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

function votesForSpeaker(speakerId) {
	var voteCount = votes.find({"speaker":speakerId}).count();
	console.log(speakerId);
	console.log(voteCount);
    return voteCount;

}

Template.register.helpers({
	shareContext: function(){
		let shareContext = {};
		shareContext.title = "TEDxCapeTown 2016 Call For Speakers";
		shareContext.description = "TEDx is not just a conference, it is a filmed production, and speaking at TEDxCapeTown is about much more than your appearance on stage. We are building a community; people engaging in meaningful change. Your attitude towards creating community and paying it forward is as important as your idea worth spreading.";
		shareContext.imgage = "http://www.tedxcapetown.org/images/header.png";

		return shareContext;

	}
});
// Template.votes.events({
// 	'click #count_votes_btn' : function() {
// 		var items = speakers.find().fetch();
// 		  items.forEach(function(s) {
// 		  	 var count =  votesForSpeaker(s._id);
//           	 speakers.update(s._id, {$set: {numberOfVotes: count}});
//
// 		  })
//
// 	}
// })
// Template.votes.rendered = function() {
// 	$('#applied').dataTable({
//     "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>"
//     , "sPaginationType": "bootstrap"
//     , "oLanguage": {
//         "sLengthMenu": "_MENU_ records per page"
//     }
// 	});
// 	$('#nominated').dataTable({
//     "sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>"
//     , "sPaginationType": "bootstrap"
//     , "oLanguage": {
//         "sLengthMenu": "_MENU_ records per page"
//     }
// 	});
// }


Template.registerHelper('setSpeakerRegistrationType', function (type) {
      Session.set("speakerRegistrationType", type);
});

Template.registerHelper('categoryName', function (identifier) {
	return categories.findOne({'_id' : identifier}, {'_id' : 0 , 'name' : 1}).name;
});



// Template.appliedSpeaker.helpers({
// 	'speakerdata': function() {
// 		// return this.speakerApplication;
// 		return this;
// 	},
// });

// Template.nominatedSpeaker.helpers({
// 	'speakerdata': function() {
// 		// return this.speakerNomination;
// 		return this;
// 	},
// });



// Template.nominee.events({
// 	'click .vote': function() {
// 		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
// 		if(vote) {
// 			Meteor.call("removeVote", vote._id);
// 		}
// 		else {
// 			var voteCount = votes.find({"user": Meteor.userId()}).count();
// 			if(voteCount==3) {
// 				FlashMessages.sendError("You may only vote for three speakers.");
// 			} else {
// 				votes.insert({"speaker": this._id, "user": Meteor.userId()})
// 			}
// 		}
// 	},
// })
//
// Template.nominee.helpers({
// 	'voted': function() {
// 		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
// 		if(vote) {
// 			return true;
// 		}
// 		return false
// 	}
// });
//
//
// Template.edit_speaker_nominee.events({
// 	'click .btn-cancel': function() {
// 		console.log(this._id);
// 		Router.go('/speaker/nomination/' + this._id);
// 	}
// })
//
// Template.edit_speaker_application.events({
// 		'click .btn-cancel': function() {
// 		console.log(this._id);
//
// 		Router.go('/speaker/application/' + this._id);
// 	}
// })


Handlebars.registerHelper('nominated', function() {
		return speakers.find({"speakerNomination": {$exists: true}});
});

Handlebars.registerHelper('applied', function() {
		return speakers.find({"speakerApplication": {$exists: true}});
});

Handlebars.registerHelper('nominated_ordered', function() {
		return speakers.find({"speakerNomination": {$exists: true}}, {sort: {'numberOfVotes': -1}});
});

Handlebars.registerHelper('applied_ordered', function() {
		return speakers.find({"speakerApplication": {$exists: true}}, {sort: {'numberOfVotes': -1}});
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

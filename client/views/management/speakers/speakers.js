Template.speaker.events({
	'click .delete': function(e) {
		e.preventDefault()
		var updated = speakers.remove({'_id' : this._id});
		if (updated > 0) {
			FlashMessages.sendSuccess('Deleted speaker');
		}
		Router.go('speakers');
	}
})

Template.speaker.helpers({
	'titleForEvent': function(eventId) {
		var post = posts.findOne({'_id' : eventId}, {'_id':0, 'title':1})
		if(post!=undefined) {
			return post.title;
		}
	},
	'titleForTalk': function(talkId) {
		// console.log(data);
		// var oid = (data && data._str) || data;
		// console.log(oid);
		 return videos.findOne({'_id': talkId}).title;
		},
})


Template.register.events({
	'click .cta' : function() {
		Router.go('speakers.register.apply');
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

Template.speakerTile.helpers({
	'voted': function() {
		var vote = votes.findOne({"speaker": this._id, "user": Meteor.userId()});
		if(vote) {
			return true;
		}
		return false
	},
	'link': function() {
		if(Match.test(this.application, Boolean)) {
			if(this.application===true) {
				return '/speakers/application/' + this._id;
			}
		}
		if(Match.test(this.nomination, Boolean)) {
			if(this.nomination===true) {
				return '/speakers/nomination/' + this._id;		
			}
		}
		return '/speakers/show/' + this._id;
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






Handlebars.registerHelper('allSpeakers', function() {
	var s = speakers.find();
    return s;
});

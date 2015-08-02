Template.events.helpers({
  'mostRecent': function() {
    return posts.findOne({});
  },
  'latest': function() {
    return posts.find({'type':'event'}, {sort: {count:-1}, limit:10});
  },
  'interesting': function() {
    return posts.find({"pinned": true});
  },
});

Template.events.events({
  'click .newEvent': function(event, template) {
    event.preventDefault();
    var newPost = posts.insert({
      "type": "event",
      "title": "New Event",
      "published": false,
      "author": Meteor.userId(),
      "created_at": $.now(),
      "sections": [{"type": "text", "content": "Click here to edit this text"}, {"type": "image", "source": "/images/default/image.png"}]
    });
    Router.go('posts.edit.event', {"_id": newPost});
  }
})

Template.eventTile.helpers({
  'summary': function() {
    if((this.summary==undefined)||(this.summary=="")) {
      // return this.body.substring(0,200) + "...";
    }
    return this.summary;
  },
  'eventImage': function() {
    return getImageURL(this.sections);
  }
});

Template.featuredEventTile.helpers({
  'summary': function() {
    if((this.summary==undefined)||(this.summary=="")) {
      // return this.body.substring(0,200) + "...";
    }
    return this.summary;
  },
  'eventImage': function() {
    return getImageURL(this.sections);
  }
});

Template.session.helpers({
  'speakerName': function(speakerId) {
    var speaker = speakers.findOne(speakerId);
    if (speaker != undefined) {
      return speaker.firstName + ' ' + speaker.lastName + ':'
    }
  },
  'speakerTopic': function(speakerId) {
    var speaker = speakers.findOne(speakerId);
    if (speaker != undefined) {
      return speaker.topic;
    }
  }
})


Template.showEvent.events({
  'click .delete': function() {
    posts.update({"_id": this._id}, {$set: {"archive":  true}});
    Router.go("/News");
  }
})

function getImageURL(sections) {
  var imageSource;
  sections.forEach(function(section) {
    if (section.type == "image") {
      console.log(section.source)
      imageSource =  section.source;
    }
  });
  return imageSource;
}

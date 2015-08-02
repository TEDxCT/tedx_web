Template.events.helpers({
  'mostRecent': function() {
    return posts.findOne({});
  },
  'latest': function() {
    return posts.find({}, {sort: {count:-1}, limit:10});
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
  }
});

Template.showEvent.events({
  'click .delete': function() {
    posts.update({"_id": this._id}, {$set: {"archive":  true}});
    Router.go("/News");
  }
})

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

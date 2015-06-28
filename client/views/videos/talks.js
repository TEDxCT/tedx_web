Template.talks.helpers({
  "allvideos": function() {
    return videos.find({"published": true});
  }
});

Template.talk.helpers({
  "datatest": function() {
    console.dir(this);
    return "adasd";
  },
  'talk': function() {
    var modifiedVideoObject = this;
    modifiedVideoObject._id = formattedId(this._id);
    return modifiedVideoObject;
  }
});

Template.talks.events({
  'click .filter-category': function(event, template) {
    console.dir(event);
    event.preventDefault();
  }
});

Template.talk.events({
  'click .delete': function() {
    videos.update(this._id, {$set: {"archive":true}});
    Router.go("talks");
  },
});

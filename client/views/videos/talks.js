Template.talks.helpers({
  "allvideos": function() {
    return videos.find({});
  }
});

Template.talks.events({
  'click .filter-category': function(event, template) {
    console.dir(event);
    event.preventDefault();
  }
});

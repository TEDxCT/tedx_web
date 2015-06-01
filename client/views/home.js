Template.home.events({
  'click .link.sponsor': function() {
    Router.go("/page/sponsor");
  }
})

Template.home.helpers({
  'featuredTalks': function() {
    return videos.find({});
  }
})

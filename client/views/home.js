Template.home.events({
  'click .link.sponsor': function() {
    Router.go("/page/sponsor");
  },
  'click .ticketLink': function() {
    trackPageView("Normal", "Buy tickets");
  }
})

Template.home.helpers({
  'featuredTalks': function() {
    return videos.find({});
  }
})

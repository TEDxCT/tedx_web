Template.toolbar.events({
  // 'click .show-login' : function (event, template) {
  //   $(".login").toggleClass("active");
  //   $(".login .action-icon").toggleClass("hidden");
  //   $(".login .icon-close").toggleClass("hidden");
  //   $(".header-wrapper").toggleClass("active");
  // },
  'click .log-out.button' : function () {
    Meteor.logout();
  },
  'keyup #search_text': function(event, template) {
    Session.set("search-term", template.find('#search_text').value);
  },
});

Template.toolbar.helpers({
  activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      console.log(currentRoute.lookupTemplate());
      console.log(template);
      return currentRoute &&
        template.toLowerCase() === currentRoute.lookupTemplate().toLowerCase() ? 'active' : '';
    }
})

Meteor.subscribe('favorites', function onReady() {
  Session.set('favoritesLoaded', true);
});

Template.basicLayout.created = function() {
 Router.configure({
  progressSpinner: false
  });
}


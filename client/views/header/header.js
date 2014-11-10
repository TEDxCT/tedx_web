Template.header.created = function () {
  Session.set('isActive', false);
  Session.set('showLogin', false);
};

Template['header'].helpers({
  // showLogin: function () {
  //   return Session.get('showLogin');
  // },
  // isActive: function () {
  //   return Session.get('isActive') ? 'active' : '';
  // },
  // animateClass: function () {
  //   return Session.get('isActive') ? 'fadeIn' : 'fadeOut';
  // },
  // iconClass: function () {
  //   return Meteor.user() ? 'user' : 'sign in';
  // }
});

Template.header.events({
  'click .show-login' : function (event, template) {
    $(".login").toggleClass("active");
    $(".login .action-icon").toggleClass("hidden");
    $(".login .icon-close").toggleClass("hidden");
    $(".header-wrapper").toggleClass("active");
  },
  'click .log-out.button' : function () {
    Meteor.logout();
  }
});

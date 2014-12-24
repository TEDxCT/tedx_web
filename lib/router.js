Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
  this.render('home');
  Meteor.subscribe('topvideos', function onReady() {
    Session.set('videosLoaded', true);
  });
});
Router.route('/talks', function () {
  this.render('talks');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

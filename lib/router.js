Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
  this.render('home');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

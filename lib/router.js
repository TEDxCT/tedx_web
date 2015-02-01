Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound'
});

Router.route('/', function () {
  this.render('home');
  Meteor.subscribe('topvideos', function onReady() {
    Session.set('videosLoaded', true);
  });
  Meteor.subscribe('config', function onReady() {
    Session.set('configLoaded', true);
  });
});
Router.route('/talks', function () {
  this.render('talks');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});
Router.route('/speakers/apply', function () {
  this.render('application');  
});
Router.route('/talks/favorites', function () {
  this.render('favorites');
  Meteor.subscribe('favvideos', function onReady() {
    Session.set('videosLoaded', true);
  });
});
Router.route('/categories', function () {
  this.render('manageCategories');
});
Router.route('/chapters', function () {
  this.render('chapters');
});
Router.route('/tags', function () {
  this.render('tags');
});

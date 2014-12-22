// Home Route
Router.route('/', function () {
  this.render('home');
  SEO.set({ title: 'Home - TEDx Cape Town'});
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});
Router.route('/home', function () {
  this.render('home');
  SEO.set({ title: 'Home - TEDx Cape Town'});
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

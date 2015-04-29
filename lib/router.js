Router.configure({
  layoutTemplate: 'basicLayout',
  notFoundTemplate: 'notFound',
    progressSpinner : false
});

Router.route('/', function () {
  // this.render('home');
  // Meteor.subscribe('topvideos', function onReady() {
  //   Session.set('videosLoaded', true);
  // });
  // Meteor.subscribe('config', function onReady() {
  //   Session.set('configLoaded', true);
  // });
  Router.go("speakers.register");
});

//TALKS

Router.route('/talks', function () {
  this.render('talks');
  this.layout('default');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

Router.route('/talks/favorites', function () {
  this.render('favorites');
  Meteor.subscribe('favvideos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

//ACCOUNTS
Router.route('/login', function () {
  this.layout('singlePage');
  this.render('login');
});

Router.route('/register', function () {
  this.layout('singlePage');
  this.render('createUser');
});

Router.route('/events/freedomday2015', function () {
  this.layout('singlePage');
  this.render('freedomday');
});

//SPEAKERS

Router.route('/speakers/register', function () {
  this.layout('singlePage');
  this.render('register');
});

Router.route('/speakers/register/nominate', function () {
  this.layout('singlePage');
  this.render('nomination');
});



Router.route('/speakers/register/apply', function () {
  this.layout('singlePage');
  this.render('application');
});


Router.route('/speaker/application/:id/edit', function () {
  this.layout('singlePage');
  this.render('edit_speaker_application', {data:speakers.findOne({"_id": this.params.id})});
});

Router.route('/speaker/nomination/:id/edit', function () {
  this.layout('singlePage');
  this.render('edit_speaker_nominee', {data:speakers.findOne({"_id": this.params.id})});
});



Router.route('/speaker/application/:id', function () {
  this.layout('singlePage');
  this.render('speaker', {data:speakers.findOne({"_id": this.params.id})});
});

Router.route('/speaker/nomination/:id', function () {
  this.layout('singlePage');
  this.render('nominee', {data:speakers.findOne({"_id": this.params.id})});
});

Router.route('/speakers/register/complete', function () {
  this.layout('singlePage');
  this.render('complete');
});


//CHAPTERS
Router.route('/chapters', function () {
  this.render('chapters');
});

//TAGS
Router.route('/tags', function () {
  this.render('tags');
});

//MANAGEMENT
Router.route('/manage/users', function () {
  this.layout('singlePage');
  this.render('users');
});

Router.route('/manage/speakers', function () {
  this.layout('singlePage');
  this.render('speakers');
});

Router.route('/manage/speakers/votes', function () {
  this.layout('singlePage');
  this.render('votes');
});

Router.route('/manage/categories', function () {
  this.layout('singlePage');
  this.render('manageCategories');
});

// Server routes
Router.route('/api/speakers', {
    name: 'speakerApi',
    where: 'server',
    action: function () {
      var json = speakers.find().fetch();
      this.response.setHeader('Content-Type', 'application/json');
      this.response.end(JSON.stringify(json));
    }
});

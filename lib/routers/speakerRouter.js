Router.route('/speakers', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('speakers');
  },
  waitOn: function () {
    return Meteor.subscribe('speakers');
  },
  data: function () {
     return speakers.find({});
   },
  name: "speakers",
  action: function () {
    this.render('speakers');
  }
});

Router.route('/speakers/new', {
  layout: "default",
  loadingTemplate: 'loading',
  name: "speakers.new",
  subscriptions: function() {
    this.subscribe('speakers');
  },
  action: function () {
    this.render('newSpeaker');
    trackPageView('Manage', 'New Speakers');
  }
});

Router.route('/speakers/show/:_id', {
  layout: "default",
  loadingTemplate: 'loading',
  name: "speakers.show",
  subscriptions: function() {
    this.subscribe('speakers');
  },
  data: function() {
    return speakers.findOne({"_id": this.params._id})
  },
  action: function () {
    this.render('speaker');
    trackPageView('Show', 'View Speakers');
  }
});

Router.route('/speakers/edit/:_id', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('speakers');
  },
  waitOn: function () {
    return Meteor.subscribe('speakers', this.params._id);
  },
  data: function () {
     return speakers.findOne({_id: this.params._id});
   },
  name: "speakers.edit",
  action: function () {
    this.render('editSpeaker');
    setHighLevelNav("Profile");
  }
});

//SPEAKERS
// Router.route('/speakers/register', {
//   layout: "default",
//   loadingTemplate: 'loading',
//   name: "speakers.register",
//   action: function () {
//     this.render('register');
//     trackPageView('Speakers', 'Register');
//   }
// });
//
// Router.route('/speakers/register/nominate', {
//   layout: "default",
//   loadingTemplate: 'loading',
//   name: "speakers.nominate",
//   action: function () {
//     this.render('nomination');
//     trackPageView('Speakers', 'Nomination');
//   }
// });
//
// Router.route('/speakers/register/apply', function () {
//   this.layout('default');
//   this.render('application');
// });
//
// Router.route('/speaker/application/:id/edit', function () {
//   this.layout('default');
//   this.render('edit_speaker_application', {data:speakers.findOne({"_id": this.params.id})});
// });
//
// Router.route('/speaker/nomination/:id/edit', function () {
//   this.layout('default');
//   this.render('edit_speaker_nominee', {data:speakers.findOne({"_id": this.params.id})});
// });
//
// Router.route('/speaker/application/:id', function () {
//   this.layout('default');
//   this.render('applicant', {data:speakers.findOne({"_id": this.params.id})});
// });
//
// Router.route('/speaker/nomination/:id', function () {
//   this.layout('default');
//   this.render('nominee', {data:speakers.findOne({"_id": this.params.id})});
// });
//
// Router.route('/speakers/register/complete', function () {
//   this.layout('default');
//   this.render('complete');
// });

// Router.route('/manage/speakers/votes', function () {
//   this.layout('singlePage');
//   this.render('votes');
// });

function setHighLevelNav(highLevelNavSelection) {
  Session.set("navSelected", highLevelNavSelection);
}

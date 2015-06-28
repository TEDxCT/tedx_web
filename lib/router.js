Router.configure({
  layoutTemplate: 'default',
  notFoundTemplate: 'notFound',
    progressSpinner : false
});

Meteor.startup(function() {
  if(Meteor.isClient){
    loadFilePicker('A3zo8DgItQxiOLaCAjmwUz');
  }
});

Router.route('/', function () {
  this.render('home');
  this.layout('default');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

Router.route('page/:page_name', function() {
  Session.set("page", this.params.page_name);
  this.layout('default');
  this.render('pages');
});

//TALKS

Router.route('/grid', function () {
  this.render('grid');
  this.layout('default');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

Router.route('/watch', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('videos');
  },
  waitOn: function () {
    return Meteor.subscribe('videos');
  },
  data: function () {
     return videos.find({});
   },
  name: "watch",
  action: function () {
    this.render('watch');
    trackPageView('normal', 'watch');
  }
});

Router.route('/talk/:_id', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('videos');
  },
  waitOn: function () {
    return Meteor.subscribe('videos', this.params._id);
  },
  data: function () {
    var oid = new Meteor.Collection.ObjectID(this.params._id);
     return videos.findOne({_id: oid});
   },
  name: "talk.show",
  action: function () {
    this.render('talk');
  }
});

Router.route('/talk/edit/:_id', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('videos');
  },
  waitOn: function () {
    return Meteor.subscribe('videos', this.params._id);
  },
  data: function () {
    var oid = new Meteor.Collection.ObjectID(this.params._id);
     return videos.findOne({_id: oid});
   },
  name: "talk.edit",
  action: function () {
    this.render('editTalk');
  }
});

Router.route('/talk/tag/:_id', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('videos');
  },
  waitOn: function () {
    return Meteor.subscribe('videos', this.params._id);
  },
  data: function () {
    var oid = new Meteor.Collection.ObjectID(this.params._id);
     return videos.findOne({_id: oid});
   },
  name: "talk.tag",
  action: function () {
    this.render('tagTalk');
  }
});

Router.route('/manage/talks/new', function () {
  this.render('newTalk');
  this.layout('default');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

Router.route('/events', function () {
  this.render('events');
  this.layout('default');
  Meteor.subscribe('events', function onReady() {
    Session.set('eventsLoaded', true);
  });
});



Router.route('/talks/new', function () {
  this.render('newTalk');
  this.layout('default');
});

Router.route('/post/new', function () {
  this.render('newPost');
  this.layout('default');
});

Router.route('/loading', function () {
  this.render('loading');
  this.layout('default');
});

Router.route('/news', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('posts');
  },
  waitOn: function () {
    return Meteor.subscribe('posts');
  },
  data: function () {
     return posts.find({});
   },
  name: "posts",
  action: function () {
    this.render('news');
  }
});

Router.route('/posts/show/article/:_id', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('posts');
  },
  waitOn: function () {
    return Meteor.subscribe('posts', this.params._id);
  },
  data: function () {
     return posts.findOne({_id: this.params._id});
   },
  name: "posts.show",
  action: function () {
    console.dir(this);
    this.render('showArticle');
  }
});

Router.route('/post/new/announcement', function () {
  this.render('newAnnouncement');
  this.layout('default');
});

Router.route('/posts/edit/article/:_id', {
  // this template will be rendered until the subscriptions are ready
  layout: "default",
  loadingTemplate: 'loading',
  // a place to put your subscriptions
  subscriptions: function() {
    this.subscribe('posts');
  },

  // Subscriptions or other things we want to "wait" on. This also
  // automatically uses the loading hook. That's the only difference between
  // this option and the subscriptions option above.
  waitOn: function () {
    return Meteor.subscribe('posts', this.params._id);
  },
  data: function () {
     return posts.findOne({_id: this.params._id});
   },
  name: "posts.edit.article",
  action: function () {
    this.render('editArticle');
  }
});



Router.route('/talks/favorites', function () {
  this.render('favorites');
  Meteor.subscribe('favvideos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

//ACCOUNTS
Router.route('/login', function () {
  this.layout('default');
  this.render('login');
});

Router.route('/manage', function () {
  this.layout('default');
  this.render('manage');
});

Router.route('/register', function () {
  this.layout('default');
  this.render('createUser');
});

Router.route('/events/freedomday2015', function () {
  this.layout('singlePage');
  this.render('freedomday');
});

Router.route('/events/momentum', function () {
  this.layout('default');
  this.render('momentum');
});

//SPEAKERS

Router.route('/speakers/register', function () {
  this.layout('default');
  this.render('register');
});

Router.route('/speakers/register/nominate', function () {
  this.layout('default');
  this.render('nomination');
});



Router.route('/speakers/register/apply', function () {
  this.layout('default');
  this.render('application');
});


Router.route('/speaker/application/:id/edit', function () {
  this.layout('default');
  this.render('edit_speaker_application', {data:speakers.findOne({"_id": this.params.id})});
});

Router.route('/speaker/nomination/:id/edit', function () {
  this.layout('default');
  this.render('edit_speaker_nominee', {data:speakers.findOne({"_id": this.params.id})});
});



Router.route('/speaker/application/:id', function () {
  this.layout('default');
  this.render('speaker', {data:speakers.findOne({"_id": this.params.id})});
});

Router.route('/speaker/nomination/:id', function () {
  this.layout('default');
  this.render('nominee', {data:speakers.findOne({"_id": this.params.id})});
});

Router.route('/speakers/register/complete', function () {
  this.layout('default');
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

//ANALYTICS
Router.route('/analytics/categories', function () {
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
  this.layout('default');
  this.render('categoryAnalytics');
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

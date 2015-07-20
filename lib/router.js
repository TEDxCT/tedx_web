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

// Just for testing the loading page
Router.route('/loading', function () {
  this.render('loading');
  this.layout('default');
});

// Route to the home page
Router.route('/', function () {
  this.render('home');
  this.layout('default');
  Meteor.subscribe('videos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

// ---------- GENERIC ROUTE UTILITIES --------------
// Generic page router for static page content
Router.route('page/:page_name', function() {
  Session.set("page", this.params.page_name);
  this.layout('default');
  this.render('pages');
});

// ---------- TALKS --------------------------------
// Home page for all talks
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
    trackPageView('Normal', 'Watch');
  }
});

// Simulcast page
Router.route('/live', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('live');
  },
  waitOn: function () {
    return Meteor.subscribe('live');
  },
  data: function () {
    return live.find({});
  },
  onBeforeAction: function() {
    GoogleMaps.load({
      libraries: 'places'
    });
    this.next();
  },
  name: "live",
  action: function () {
    this.render('live');
    trackPageView('Normal', 'Watch live');
  }
});

// Simulcast host signup
// =============== STEP 1 ==================
Router.route('/live/host', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('live');
  },
  waitOn: function () {
    return Meteor.subscribe('live');
  },
  data: function () {
    return live.find({});
  },
  name: "host",
  action: function () {
    this.render('host');
    trackPageView('Normal', 'Host Simulcast Step 1');
  }
});

// =============== STEP 2 ==================
Router.route('/live/host/location', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('live');
  },
  waitOn: function () {
    return Meteor.subscribe('live');
  },
  data: function () {
    return live.find({});
  },
  onBeforeAction: function() {
    GoogleMaps.load({
      libraries: 'places'
    });
    this.next();
  },
  name: "hostlocation",
  action: function () {
    this.render('hostLocation');
    trackPageView('Normal', 'Host Simulcast Step 2');
  }
});

// View a single vidoe by ID
Router.route('/talks/:_id', {
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
  name: "talks.show",
  action: function () {
    this.render('talk');
  }
});

// Edit a single video by ID
Router.route('/talks/edit/:_id', {
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
  name: "talks.edit",
  action: function () {
    this.render('editTalk');
  }
});

// Tag a single video by ID
Router.route('/talks/tag/:_id', {
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
  name: "talks.tag",
  action: function () {
    this.render('tagTalk');
  }
});

// Begin process to load a new video
Router.route('/talks/new', function () {
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

Router.route('/posts/new', {
  layout: "default",
  loadingTemplate: 'loading',
  name: "posts.new",
  action: function () {
    this.render('newPost');
    trackPageView('Manage', 'Post type chooser');
  }
});

Router.route('/sponsors/new', {
  layout: "default",
  loadingTemplate: 'loading',
  name: "sponsors.new",
  action: function () {
    this.render('newSponsor');
    trackPageView('Manage', 'New Sponsors');
  }
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
    trackPageView('Manage', 'Edit article');
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

Router.route('/admin', function () {
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

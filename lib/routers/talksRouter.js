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
    try {
      var oid = new Meteor.Collection.ObjectID(this.params._id);
      return videos.findOne({_id: oid});
    }
    catch(err) {
      return videos.findOne({_id: this.params._id});
    }
  },
  name: "talks.show",
  action: function () {
    this.render('talk');
    setHighLevelNav("Watch");
  }
});

Router.route('/data/talks/missing/', {
  layout: "default",
  loadingTemplate: 'loading',
  subscriptions: function() {
    this.subscribe('videos');
  },
  waitOn: function () {
    return Meteor.subscribe('videos');
  },
  data: function () {
    return videos.find({$or:[{"title": ""}, {"description": ""}, {"speaker.name": ""},{"title": null}, {"description": null}, {"speaker.name": null}]});
  },
  name: "talks.missing",
  action: function () {
    this.render('talksMissingInfo');
    setHighLevelNav("Watch");
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
    try {
      var oid = new Meteor.Collection.ObjectID(this.params._id);
      return videos.findOne({_id: oid});
    }
    catch(err) {
      return videos.findOne({_id: this.params._id});
    }
   },
  name: "talks.edit",
  action: function () {
    this.render('editTalk');
    setHighLevelNav("Watch");
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
    setHighLevelNav("Watch");
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

Router.route('/talks/favorites', function () {
  this.render('favorites');
  Meteor.subscribe('favvideos', function onReady() {
    Session.set('videosLoaded', true);
  });
});

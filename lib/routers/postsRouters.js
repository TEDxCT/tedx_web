//POSTS
Router.route('/posts/new', {
  layout: "default",
  loadingTemplate: 'loading',
  name: "posts.new",
  action: function () {
    this.render('newPost');
    trackPageView('Manage', 'Post type chooser');
  }
});

//EVENTS
Router.route('/events', {
  layout: "default",
  loadingTemplate: 'loading',
  name: "events",
  subscriptions: function() {
    this.subscribe('posts');
  },
  waitOn: function () {
    return Meteor.subscribe('posts');
  },
  data: function () {
     return posts.find({"type": "event"});
   },
  action: function () {
    this.render('events');
    trackPageView('Normal', 'Events');
    setHighLevelNav("Events");
  }
});

Router.route('/posts/show/event/:_id', {
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
  name: "posts.show.event",
  action: function () {
    this.render('showEvent');
    setHighLevelNav("Events");
  }
});


Router.route('/posts/edit/event/:_id', {
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
  name: "posts.edit.event",
  action: function () {
    this.render('editEvent');
    trackPageView('Manage', 'Edit Event');
    setHighLevelNav("Events");
  }
});

//NEWS ARTICLE
Router.route('/news', {
  layout: "default",
  loadingTemplate: 'loading',
  name: "news",
  subscriptions: function() {
    this.subscribe('posts');
  },
  waitOn: function () {
    return Meteor.subscribe('posts');
  },
  data: function () {
     return posts.find({"type": "article"});
   },
  action: function () {
    this.render('news');
    trackPageView('Normal', 'news');
    setHighLevelNav("News");
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
    this.render('showArticle');
    setHighLevelNav("News");
  }
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
    setHighLevelNav("News");
  }
});

//ANNOUNCEMENT
Router.route('/post/new/announcement', function () {
  this.render('newAnnouncement');
  this.layout('default');
});

function setHighLevelNav(highLevelNavSelection) {
  Session.set("navSelected", highLevelNavSelection);
}

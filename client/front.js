Meteor.subscribe('categories', function onReady() {
  Session.set('categoriesLoaded', true);
});

Meteor.subscribe('config', function onReady() {
  Session.set('configLoaded', true);
});

Meteor.subscribe('chapters', function onReady() {
  Session.set('chapters', true);
});

Template.home.helpers({
  "topvideos": function() {
    var topConfig = config.findOne({"name":"top"});
    check(topConfig, Object);
    if(topConfig.tags) {
      return videos.find({"categories": {$in: topConfig.tags}});
    }
    else return videos.find({});
  }
});

Template.toolbar.events({
  'click .log-out.button' : function () {
    Meteor.logout();
  },
  'click .search': function() {
    Session.set("searching", true);
  },
  'click .feedback': function() {
    Session.set("feedbacking", true);
  },
  'click .add-video': function() {
    Session.set("addingvideo", true);
  },
  'click #logout': function() {
    Meteor.logout();
  }
});

Template.toolbar.helpers({
  activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template.toLowerCase() === currentRoute.lookupTemplate().toLowerCase() ? 'active' : '';
    },
    'chapters': function() {
      console.log
      return chapters.find({});
    },
    activeIfChapterIs: function (template, chapterMenuItem) {
      console.log(chapterMenuItem);
    }
})

Meteor.subscribe('favorites', function onReady() {
  Session.set('favoritesLoaded', true);
});

Template.basicLayout.created = function() {
 Router.configure({
   progressSpinner: false
 });
}

Template.basicLayout.helpers({
  searching: function() {
    if(Session.get("searching")) {
      return true;
    }
    else return false;
  },
  feedbacking: function() {
    if(Session.get("feedbacking")) {
      return true;
    }
    else return false;
  },
  addingvideo: function() {
    if(Session.get("addingvideo")) {
      return true;
    }
    else return false;
  }
});

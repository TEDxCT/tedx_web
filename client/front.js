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
  },
});

Handlebars.registerHelper('isEqual', function(string1, string2) {
    return string1 === string2;
});

Handlebars.registerHelper('userIsVerified', function(){
  if(Meteor.user()!=undefined) {
    if(Meteor.user().emails[0].verified==true) {
      return Meteor.user().emails[0].verified;
    }
  }

});

Handlebars.registerHelper('formatId', function(data) {
    return (data && data._str) || data;
});

Handlebars.registerHelper('objectsWithIndex', function(objects) {

  for(var i = 0; i<objects.length; i++) {
      objects[i].index = i;
  }

  return objects;
});

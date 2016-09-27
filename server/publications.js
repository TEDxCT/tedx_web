Meteor.publish('videos', function () {
  return videos.find({"archived": {$ne : true}});
});

Meteor.publish('votes', function () {
  return votes.find({});
});

Meteor.publish('live', function () {
  return live.find({"year": "2016", "archived": {$ne : true}});
});

Meteor.publish('posts', function () {
  return posts.find({"archive": {$ne: true}});
});

Meteor.publish('team', function () {
  return team.find({"archive": {$ne: true}});
});

Meteor.publish('categories', function () {
  return categories.find({"archived": {$ne : true}});
});

Meteor.publish('sponsors', function () {
  return sponsors.find({"archived": {$ne : true}});
});

Meteor.publish('config', function () {
  return config.find({"archived": {$ne : true}});
});

Meteor.publish('chapters', function () {
  return chapters.find({"archived": {$ne : true}});
});

Meteor.publish('speakers', function () {
  if(Match.test(this.userId, String)) {
    let user = Meteor.users.findOne(this.userId);
    if(Match.test(user.roles, Array)) {
      if(user.roles.indexOf("admin")>-1) {
        return speakers.find({"archived": {$ne : true}});
      }
    }
  }

  return speakers.find({"archived": {$ne : true}, "application": {$ne: true}, "nomination": {$ne: true}});

});

Meteor.publish('topvideos', function () {
  var topConfig = config.find({"name":"top"});
  if(topConfig.tags) {
    return videos.find({"categories": {$in: topConfig.tags}, "archived": {$ne : true}});
  }
  else return videos.find({"archived": {$ne : true}});
});

Meteor.publish('favorites', function () {
  if(this.userId) {
    return favorites.find({"owner":this.userId, "archived": null});
  }
});



// Meteor.users.allow({
//     update: function(userId, docs, fields, modifier) {
//         return true;
//         }
// });

Meteor.publish("allUsers", function () {
  var currentUser = Meteor.users.findOne({"_id": this.userId});

  if(currentUser!=undefined) {
    if(currentUser.emails[0].verified==true) {
      return Meteor.users.find();
    }
  }

  });

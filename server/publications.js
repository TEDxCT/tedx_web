Meteor.publish('videos', function () {
  return videos.find({"archived": {$ne : true}});
});

Meteor.publish('votes', function () {
  return votes.find({});
});

Meteor.publish('posts', function () {
  return posts.find({"archive": {$ne: true}});
});

Meteor.publish('categories', function () {
  return categories.find({"archived": {$ne : true}});
});

Meteor.publish('config', function () {
  return config.find({"archived": {$ne : true}});
});

Meteor.publish('chapters', function () {
  return chapters.find({"archived": {$ne : true}});
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

Meteor.publish('speakers', function () {
  var currentUser = Meteor.users.findOne({"_id": this.userId});

  if(currentUser!=undefined) {
    if(currentUser.emails[0].verified==true) {
      return speakers.find({});
    }
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

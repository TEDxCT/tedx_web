Meteor.publish('videos', function () {
  return videos.find({"archived": {$ne : true}});
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
  // console.log(videos.find({"owner":this.userId, "archived": { $ne: true } }))
  // return videos.find({"owner":this.userId, "archived": { $ne: true } });
  if(this.userId) {
    return favorites.find({"owner":this.userId, "archived": null});
  }
});

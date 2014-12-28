Meteor.publish('videos', function () {
  return videos.find({"archived": {$ne : true}});
});

Meteor.publish('categories', function () {
  return categories.find({"archived": {$ne : true}});
});

Meteor.publish('topvideos', function () {
  return videos.find({"archived": {$ne : true}});
});

Meteor.publish('favorites', function () {
  // console.log(videos.find({"owner":this.userId, "archived": { $ne: true } }))
  // return videos.find({"owner":this.userId, "archived": { $ne: true } });
  if(this.userId) {
    return favorites.find({"owner":this.userId, "archived": null});
  }
});

Meteor.publish('videos', function () {
  return videos.find();
});

Meteor.publish('favorites', function () {
  // console.log(videos.find({"owner":this.userId, "archived": { $ne: true } }))
  // return videos.find({"owner":this.userId, "archived": { $ne: true } });
  if(this.userId) {
    return favorites.find({"owner":this.userId, "archived": null});  
  }
});

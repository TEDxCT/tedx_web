Meteor.publish('videos', function () {
  return videos.find();
});

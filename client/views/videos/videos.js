Template.watch.helpers({
  "videos" : function() {
    return videos.find({});
  },
  "videosLoaded" : function () {
    return Session.get('videosLoaded');
  },
  "favorited" : function() {
    var videoFav = favorites.findOne({"doc":this._id});
    if(videoFav) return true;
    return false;
  },
});

Template.watch.events({
  'click .talk': function(event, template) {
    Router.go("talk");
  },
});

Template.talkTile.helpers({
  'videoId': function() {
    var modifiedVideoObject = this;
    modifiedVideoObject._id = formattedId(this._id);
    return modifiedVideoObject;
  },
  'description': function() {
    if(this.description) {
      return this.description.substring(0,70) + "...";
    }    
  }
});

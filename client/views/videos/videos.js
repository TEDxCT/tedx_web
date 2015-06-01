Template['videos'].helpers({
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
  }
});

Template.videos.events({
  'click .talk': function(event, template) {
    Router.go("talk");
  },
});

Template.video.events({

    'click .favorite': function(event, template) {
      var videoFav = favorites.findOne({"doc":this._id});
      if(videoFav){
        favorites.update({"_id":videoFav._id}, {$set: {"archived":true}});
      }
      else {
        var favorite = favorites.insert({"owner": Meteor.userId(), "type": "video", "doc": this._id});
      }
    },
});

// --------------------------- TALKS LIST -------------------------------------

Template.talks.onRendered(function() {
  VideosSearch.search();
})

Template.talks.helpers({
  "allvideos": function() {
    var searchString = Session.get("search-term");
    if(searchString) {

      var someCursor = videos.find({ $or: [ { "title": searchString }, { "speaker.name": searchString } ] });
      if(someCursor.count() == 0)
      {
          var search = ".*" + searchString + ".*";
          return videos.find({ $or: [ {"title" : {$regex : search}}, { "speaker.name": {$regex : search} } ] });
      }
      else return someCursor.fetch();
    }
    else return videos.find({"published": true});;
  },
  "searchTerm": function() {
    var searchTerm = Session.get("search-term");
    if(searchTerm!=$(".search").val()) {
      return Session.get("search-term");
    }
  },
  getVideos: function() {
    return VideosSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },

  isLoading: function() {
    return PackageSearch.getStatus().loading;
  }
});

// --------------------------- TALK TILE -------------------------------------

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

// --------------------------- TALK PAGE -------------------------------------

Template.talk.helpers({
  'talk': function() {
    var modifiedVideoObject = this;
    modifiedVideoObject._id = formattedId(this._id);
    return modifiedVideoObject;
  }
});

Template.talks.events({
  // 'keyup .search': function(event, template) {
  //   Session.set("search-term", $(".search").val());
  // }
  "keyup .search": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    VideosSearch.search(text);
  }, 200)
});

Template.talk.events({
  'click .delete': function() {
    videos.update(this._id, {$set: {"archive":true}});
    Router.go("talks");
  },
  "click .featured-switch": function() {
    try {
      var oid = new Meteor.Collection.ObjectID(this._id);
      videos.update(oid, {$set: {"featured":$(".featured-switch").is(":checked")}});
    }
    catch(err) {
      videos.update(this._id, {$set: {"featured":$(".featured-switch").is(":checked")}});
    }

  },
});

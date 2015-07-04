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
  }
});

Template.talk.helpers({
  "datatest": function() {
    console.dir(this);
    return "adasd";
  },
  'talk': function() {
    var modifiedVideoObject = this;
    modifiedVideoObject._id = formattedId(this._id);
    return modifiedVideoObject;
  }
});

Template.talks.events({
  'keyup .search': function(event, template) {
    Session.set("search-term", $(".search").val());
  }
});

Template.talk.events({
  'click .delete': function() {
    videos.update(this._id, {$set: {"archive":true}});
    Router.go("talks");
  },
});

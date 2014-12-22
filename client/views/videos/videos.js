Template['videos'].helpers({
  "videos" : function() {
    var searchString = Session.get("search-term");
    if(searchString) {
      var someCursor = videos.find({ name: searchString });

      if(someCursor.count() == 0)
      {
          var search = ".*" + searchString + ".*";          
          return videos.find({"name" : {$regex : search}});
      }
    }
    else return videos.find({});
  },
  "videosLoaded" : function () {
    return Session.get('videosLoaded');
  }
});

Template['newvideo'].events({
  'click .add-video': function(event, template) {
    var name = $(template.find(".addible.name")).val();
    check(name, String);
    var description = $(template.find(".addible.description")).val();
    var url = $(template.find(".addible.url")).val();
    videos.insert({"name":name, "description":description, "url":url});
  }
});

Template['video'].events({
    'click .edit': function(event, template) {
      $(template.find(".edit-sheet")).toggleClass("active");
    },
});

Template['editvideo'].events({
  'click .edit-sheet .close': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .save': function(event, template) {
    var name = $(template.find(".editable.name")).val();
    check(name, String);
    var description = $(template.find(".editable.description")).val();
    var url = $(template.find(".editable.url")).val();
    videos.update({"_id":this._id}, {$set: {"name":name, "description":description, "url": url}});
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .edit-sheet .close': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .edit-sheet .cancel': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  }
});

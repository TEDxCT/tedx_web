Template['videos'].helpers({
  "videos" : function() {
    return videos.find({});
  }
});

Template['videos'].events({
  'click .save-video': function() {
      var name = $(".new-title").val();
      check(name, String);
      var description = $(".new-sub-title").val();
      check(description, String);
      var url = $(".new-url").val();
      videos.insert({"name":name, "description":description, "url":url});
    },
});

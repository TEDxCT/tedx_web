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

Template.chapters.events({
  'click .add-chapter': function(event, template) {
    var newChapter = new Object();
    newChapter.name = $(template.find(".addible.name")).val();
    newChapter.description = $(template.find(".addible.description")).val();
    newChapter.cover_image_url = $(template.find(".addible.cover-image-url")).val();
    newChapter.logo_name = $(template.find(".addible.logo-name")).val();
    chapters.insert(newChapter);
  },
  'click .archive': function(event, template) {
    chapters.update({"_id":this._id}, {$set : {"archived": true}});
  },
});

Template.chapters.helpers({
  'chapters': function() {
      return chapters.find({});
  }
});

Template.chaptertile.events({
  'click .edit': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .cancel': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .save': function(event, template) {
    var updatedChapter = new Object();
    updatedChapter.name = $(template.find(".editable.name")).val();
    updatedChapter.description = $(template.find(".editable.description")).val();
    updatedChapter.cover_image_url = $(template.find(".editable.cover-image-url")).val();
    updatedChapter.logo_name = $(template.find(".editable.logo-name")).val();
    chapters.update({"_id":this._id}, {$set: updatedChapter});
    $(template.find(".edit-sheet")).toggleClass("active");
  }
})

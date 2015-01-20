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

Template.addVideo.helpers({
  'categories': function() {
    return categories.find({});
  },
});

Template.editvideo.helpers({
  'videoCategories': function() {
    var videoCategories = this.categories;
    var index;
    if(videoCategories) {
      if(videoCategories.length>0) {
        if (typeof videoCategories[0] != 'undefined') {
          var cats = categories.find({"_id": {$in: videoCategories}});
          return cats;
        }
      }
    }
  },
  'allCategories': function() {
    var videoCategories = this.categories;
    var index;
    if(videoCategories) {
      if(videoCategories.length>0) {
        if (typeof videoCategories[0] != 'undefined') {
          var cats = categories.find({"_id": {$not: {$in: videoCategories}}});
          return cats;
        }
      }
      else return categories.find({});
    }

  }
});

Template.addVideo.events({
  'click .close' : function(event, template) {
    $(template.find(".overlay")).addClass("fadeOutUp");
    $(template.find(".overlay-content")).addClass("bounceOutUp");
    setTimeout(function(){Session.set("addingvideo", false);}, 300);
  },
  'click .next' : function(event, template) {
    $(template.find(".add-sheet")).addClass("hide");
    $(template.find(".add-sheet-two")).removeClass("hide");
    $(template.find(".add-sheet-two")).addClass("bounceInRight");
  },
  'click .add-sheet-two .next' : function(event, template) {
    $(template.find(".add-sheet-three")).removeClass("hide");
    $(template.find(".add-sheet")).addClass("hide");
    $(template.find(".add-sheet-two")).addClass("hide");
    $(template.find(".add-sheet-three")).addClass("bounceInRight");
  },
  'click .back' : function(event, template) {
    $(template.find(".add-sheet-two")).removeClass("bounceInRight");
    $(template.find(".add-sheet-two")).addClass("hide");
    $(template.find(".add-sheet")).removeClass("hide");
  },
  'click .add-sheet-three .back' : function(event, template) {
    $(template.find(".add-sheet-three")).addClass("hide");
    $(template.find(".add-sheet-two")).removeClass("hide");
    $(template.find(".add-sheet-three")).addClass("bounceInLeft");
  }
})

Template.newvideo.events({
  'click .category-selected': function(event, template) {
    var category = event.currentTarget.attributes.category.value;
    var checkbox = $(template.find("." + category));
    var categories = Session.get("categories");

    if(checkbox.is(':checked')) {
      if(categories) {
        if(categories.indexOf(category)==-1) {
          categories.push(category);
          Session.set("categories", categories);
        }
      }
      else Session.set("categories", [category]);
    }
    else {
      if(categories) {
        if(categories.indexOf(category)==-1) {
          categories.pop(category);
          Session.set("categories", categories);
        }
      }
      else Session.set("categories", [category]);
    }
  },
  'click .add-video.save': function(event, template) {
    var video = new Object();
    video.name = $(template.find(".addible.name")).val();
    check(name, String);
    video.description = $(template.find(".addible.description")).val();
    video.url = $(template.find(".addible.url")).val();
    video.speaker = $(template.find(".addible.speaker")).val();
    video.avatar = $(template.find(".addible.avatar")).val();
    video.sections = $(template.find(".addible.sections")).val().split(',');
    video.categories = Session.get("categories");
    videos.insert(video);
    Session.set("categories", "");
  }
});

Template.video.events({
    'click .edit': function(event, template) {
      $(template.find(".edit-sheet")).toggleClass("active");
    },
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

Template['editvideo'].events({
  'click .edit-sheet .close': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .save': function(event, template) {
    var updatedVideo = new Object();
    updatedVideo.name = $(template.find(".editable.name")).val();
    updatedVideo.description = $(template.find(".editable.description")).val();
    updatedVideo.url = $(template.find(".editable.url")).val();
    updatedVideo.speaker = $(template.find(".editable.speaker")).val();
    updatedVideo.avatar = $(template.find(".editable.avatar")).val();
    updatedVideo.categories = Session.get("categories");
    videos.update({"_id":this._id}, {$set: updatedVideo});
    $(template.find(".edit-sheet")).toggleClass("active");
    Session.set("categories", "");
  },
  'click .edit-sheet .archive': function(event, template) {
   videos.update({"_id":this._id}, {$set: {"archived": true}});
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .edit-sheet .close': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .edit-sheet .cancel': function(event, template) {
    $(template.find(".edit-sheet")).toggleClass("active");
  },
  'click .category-selected': function(event, template) {
    var category = event.currentTarget.attributes.category.value;
    var checkbox = $(template.find("." + category));

    if(checkbox.is(':checked')) {
      // if(videos.update({"_id":template.data._id}).categories) {
        videos.update({"_id":template.data._id}, {$push: {"categories": category}});
      // }
      // else videos.update({"_id":template.data._id}, {$set: {"categories": category}});
    }
    else {
      videos.update({"_id":template.data._id}, {$pull: {"categories": category}});
    }
  }
});

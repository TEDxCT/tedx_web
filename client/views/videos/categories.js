Template.manageCategories.helpers({
  'categories': function() {
    return categories.find({});
  },
  'categorynames': function(){
    return categories.find().fetch().map(function(it){ return it.name; });
  },
});

Template.manageCategories.events({
  'click .add-category': function(event, template) {
    var name = $(template.find(".addible.name"));
    if(name.val()=="") {
      $(".addible.name").addClass("pulse");
      setTimeout(function(){$(".addible.name").removeClass("pulse") ;}, 300);
    }
    else {
      categories.insert({"name": name.val()});
      name.val("");
    }
  },
  'click .archive': function(event, template) {
    categories.update({"_id":this._id}, {$set : {"archived": true}});
  }
});

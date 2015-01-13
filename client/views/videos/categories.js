Template.manageCategories.helpers({
  'categories': function() {
    return categories.find({});
  },
  'categorynames': function(){
    return categories.find().fetch().map(function(it){ return it.name; });
  },
});

Template.categories.helpers({
  'categories' : function() {
    if(this[0]) {
      return categories.find({"_id": {$in: this}});
    }
    else if(this!=false) {
      return categories.find({});
    }
    return false;
  },
  'allCategories': function() {
    return categories.find({});
  }
});

Template.category.events({
  
})

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
  },
});

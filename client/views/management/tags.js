Template.tags.helpers({
  'configCategories': function() {
    if(Session.get("configLoaded")) {
      var configCategories = config.findOne({"name":"top"}).tags;
      var index;

      if(configCategories) {
        if (typeof configCategories[0] != 'undefined') {
          var cats = categories.find({"_id": {$in: configCategories}});
          return cats;
        }
      }
    }
  },
  'allCategories': function() {
    var configCategories = config.find({"name":"top"}).fetch();
    var index;

    if(configCategories.length>0) {
      if (typeof configCategories[0] != 'undefined') {
        var cats = categories.find({"_id": {$not: {$in: configCategories}}});
        return cats;
      }
    }
    else return categories.find({});

  }
})

Template.tags.events({
  'click .category-selected': function(event, template) {
    var category = event.currentTarget.attributes.category.value;
    var checkbox = $(template.find("." + category));
    var configForTop = config.findOne({"name":"top"});
    console.dir(configForTop);
    if(!configForTop) configForTop = config.insert({"name":"top", "tags":[]});

    if(checkbox.is(':checked')) {
      config.update({"_id":configForTop._id}, {$push: {"tags": category}});
    }
    else {
      config.update({"_id":configForTop._id}, {$pull: {"tags": category}});
    }




  }
})

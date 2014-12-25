Template.search.events({
    'click .close' : function() {
        Session.set("searching", false);
    },
    'keyup #search_text': function(event, template) {
        Session.set("search-term", template.find('#search_text').value);

    },
});

Template.search.helpers({
  "videos" : function() {
    var searchString = Session.get("search-term");
    console.log("Searc");
    if(searchString) {
      var someCursor = videos.find({ name: searchString });
console.log("Searc");
      if(someCursor.count() == 0)
      {
          var search = ".*" + searchString + ".*";
          console.log("Searc");
          return videos.find({"name" : {$regex : search}});
      }
    }
    else return "";
  },
});
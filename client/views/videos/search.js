Template.search.events({
    'click .close' : function(event, template) {
        $(template.find(".overlay")).addClass("fadeOutUp");
        $(template.find(".overlay-content")).addClass("bounceOutUp");
        setTimeout(function(){Session.set("searching", false);}, 300);
        Session.set("search-term", "");
    },
    'keyup #search_text': function(event, template) {
        Session.set("search-term", template.find('#search_text').value);
    },
});

Template.search.helpers({
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
    else return "";
  },
});


Template.search.rendered = function() {
    $("#search_text").focus();
}
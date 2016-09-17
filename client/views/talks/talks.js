// --------------------------- TALKS LIST -------------------------------------
var client;
var index;

Template.talks.onRendered(function() {
  VideosSearch.search();

  client = AlgoliaSearch("ZBQG58E3FM", "688a8f5409f5054e1b66029fdfae0826");
  index = client.initIndex("talks");  
})

Template.talks.helpers({
  "searchTerm": function() {
    var searchTerm = Session.get("search-term");
    if(searchTerm!=$(".search").val()) {
      return Session.get("search-term");
    }
  },
  getVideos: function() {
    var searchString = Session.get("search-term");
    if(searchString) {
      let hits = Session.get("hits");
      let hitIds = [];
      
      hits.forEach(function(doc, index) {        
        hitIds.push(doc._id);
      });
      console.log(hitIds);
      return videos.find({"_id": {$in: hitIds}});
    }
    else return videos.find({"published": true});
  },

  isLoading: function() {
    return PackageSearch.getStatus().loading;
  }
});

// --------------------------- TALK TILE -------------------------------------

Template.talkTile.helpers({
  'videoId': function() {
    var modifiedVideoObject = this;
    modifiedVideoObject._id = formattedId(this._id);
    return modifiedVideoObject;
  },
  'description': function() {
    if(this.description) {
      return this.description.substring(0,70) + "...";
    }
  }
});

// --------------------------- TALK PAGE -------------------------------------

Template.talk.helpers({
  'talk': function() {
    var modifiedVideoObject = this;
    modifiedVideoObject._id = formattedId(this._id);
    return modifiedVideoObject;
  }
});

Template.talks.events({
  // 'keyup .search': function(event, template) {
  //   Session.set("search-term", $(".search").val());
  // }
  "keyup .search": _.throttle(function(e) {
    var text = $(e.target).val().trim();    
    Session.set("search-term", text);
  
    // search 'hello' in the index
    index.search(text, function (error, content) {
      if (error) console.error('Error:', error);
      else {
        console.log(content);
        Session.set("hits", content.hits);
      }
    });
  }, 200)
});

Template.talk.events({
  'click .delete': function() {
    videos.update(this._id, {$set: {"archive":true}});
    Router.go("talks");
  },
  "click .featured-switch": function() {
    try {
      var oid = new Meteor.Collection.ObjectID(this._id);
      videos.update(oid, {$set: {"featured":$(".featured-switch").is(":checked")}});
    }
    catch(err) {
      videos.update(this._id, {$set: {"featured":$(".featured-switch").is(":checked")}});
    }
  },
});

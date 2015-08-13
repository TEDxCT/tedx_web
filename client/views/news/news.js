Template.news.helpers({
  'featured': function() {
    return posts.findOne({"featured": true});
  },
  'latest': function() {
    return posts.find({"featured": {$ne: true}});
  }
});

Template.articleTile.helpers({
  'summary': function() {
    if((this.summary==undefined)||(this.summary=="")) {
      // return this.body.substring(0,200) + "...";
    }
    return this.summary;
  }
});

Template.showArticle.events({
  'click .delete': function() {
    posts.update({"_id": this._id}, {$set: {"archive":  true}});
    Router.go("/News");
  },
  "click .featured-switch": function() {
    var featuredPost = posts.findOne({"featured": true});

    if(featuredPost) {
      posts.update(featuredPost._id, {$set: {"featured":false}});
    }

    posts.update(this._id, {$set: {"featured":$(".featured-switch").is(":checked")}});

  },
})

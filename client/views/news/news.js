Template.news.helpers({
  'mostRecent': function() {
    return posts.findOne({});
  },
  'latest': function() {
    return posts.find({}, {sort: {count:-1}});
  },
  'interesting': function() {
    return posts.find({"pinned": true});
  },
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
  }
})

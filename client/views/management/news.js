Template.newPost.helpers({

})

Template.newPost.events({
  'click .article': function() {
    var newPost = posts.insert({"type": "article", "title": "New Article", "published": false, "author": Meteor.userId(), "body": "Click here to edit your article..."});
    Router.go('posts.edit.article', {"_id": newPost});
  }
})

Template.editArticle.events({
  'click .onoffswitch-checkbox': function() {
    console.log("Publishing article");
    posts.update({"_id": this._id}, {$set: {"published":  $("#publishSwitch").is(":checked")}});
  }
})

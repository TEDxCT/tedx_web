Template.newTalk.events({
  'click .import': function() {
    var talk = new Object();
    talk.title = $(".titleText").val();
    talk.speaker = $(".speakerText").val();
    talk.category = $(".categoryText").val();
    talk.videoId = $(".videoId").val();
    talk.description = $(".talkDescription").val();
    talk.published = $("#publishSwitch").is(":checked");
    var newTalk = videos.insert(talk);
    Router.go("/talk/" + newTalk);
  }
})


Template.editTalk.events({
  'click .update': function() {
    var talk = new Object();
    talk.title = $(".titleText").val();
    talk.speaker = $(".speakerText").val();
    talk.videoId = $(".videoId").val();
    talk.category = $(".categoryText").val();
    talk.videoId = $(".videoId").val();
    talk.description = $(".talkDescription").val();
    talk.published = $("#publishSwitch").is(":checked");
    videos.update(this._id, {$set: talk});
    Router.go("/talk/" + this._id);
  },
  'click .cancel': function() {
    Router.go("/talk/" + this._id);
  }
})

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

    var speaker = this.speaker;
    if (this.speaker == "" || this.speaker == undefined) {
      speaker = new Object();
    }
    speaker.name = $(".speakerText").val();
    var webURLs = [];
    if (speaker.webURLs != undefined) {
      for (i=0; i<speaker.webURLs.length; i++) {
        var webURL = Object();
        webURL.title = $(".urlTitle_" + i).val()
        webURL.url = $(".url_" + i).val()
        if (webURL.title != "" && webURL.url != "") {
          webURLs.push(webURL);
        }
      }
      speaker.webURLs = webURLs;
    }

    talk.speaker = speaker;
    talk.videoId = $(".videoId").val();
    talk.category = $(".categoryText").val();
    talk.videoId = $(".videoId").val();
    talk.description = $(".talkDescription").val();
    talk.published = $("#publishSwitch").is(":checked");
    videos.update(this._id, {$set: talk});
    Router.go("/talk/" + this._id);
  },
  'click .add_url': function() {
    var talk = this;
    var newURL = new Object();
    newURL.url = "";
    newURL.title = "";
    newURL.index = talk.speaker.webURLs.length
    talk.speaker.webURLs.push(newURL);
    videos.update(this._id, {$set: talk})
    return false;
  },
  'click .cancel': function() {
    Router.go("/talk/" + this._id);
  }
})


Template.tagTalk.events({
  'click .update': function() {
    var level = $(".level");
  },
  'click .cancel': function() {
    Router.go("/talk/" + this._id);
  }
})

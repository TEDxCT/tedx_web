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

    var speaker = new Object();
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
    Router.go("/talks/" + this._id);
  },
  'click .add_url': function() {
    var talk = this;
    var urls = Session.get("weburls");

    if(urls==undefined) {
      urls = [];
    }
    var newURL = new Object();
    newURL.url = "";
    newURL.title = "";
    newURL.index = urls.length
    urls.push(newURL);
    Session.set("weburls", urls);

    // videos.update({"_id":this._id}, {$set: talk})
    return false;
  },
  'click .delete_url': function() {
    var urls = Session.get("weburls");
    console.log(this.index);

    var index = this.index;
    console.log("Index " + index)
    if (index > -1) {
      console.log("splicing");

      urls.splice(index, 1);
    }

    console.log(urls);

    Session.set("weburls", urls);

    return false;

    // var talk = this;
    // var urls = Session.get("weburls");
    //
    // if(urls==undefined) {
    //   urls = [];
    // }
    // var newURL = new Object();
    // newURL.url = "";
    // newURL.title = "";
    // newURL.index = urls.length
    // urls.push(newURL);
    // Session.set("weburls", urls);
    //
    // // videos.update({"_id":this._id}, {$set: talk})
    // return false;
  },
  'click .cancel': function() {
    Router.go("/talks/" + this._id);
  }
})


Template.tagTalk.events({
  'click .update': function(event, template) {
    var industry = [];
    $('.industry input:checked').each(function() {
      industry.push($(this).attr('value'));
    });

    var level = [];
    $('.level input:checked').each(function() {
      level.push($(this).attr('value'));
    });

    var subject = [];
    $('.subject input:checked').each(function() {
      subject.push($(this).attr('value'));
    });

    var talk = this;

    categories = new Object()
    categories.levels = level;
    categories.subjects = subject;
    categories.industries = industry;

    var commaSeparatedKeywords = $('#keywords').val();
    keywords = commaSeparatedKeywords.split(',');

    var blurb1 = $('#blurb1').val();
    var blurb2 = $('#blurb2').val();
    var blurb3 = $('#blurb3').val();

    videos.update(this._id, {$set: {categories: categories, keywords: keywords, blurb1: blurb1, blurb2:blurb2, blurb3:blurb3 }});
    Router.go("/talks/" + this._id);

  },
  'click .cancel': function() {
    Router.go("/talks/" + this._id);
  }
})

Template.registerHelper("isCategoryChecked", function (categoryType, categoryValue) {
  if(this.categories) {
      Session.set("thingy", this);
      var talk = this;
      if(this.categories[categoryType].indexOf(categoryValue)>-1) {
        return true;
      }
      else {
        return false;
      }
  }
});

Template.registerHelper('speakerWebURLs', function() {
  var objects = Session.get("weburls");
  if(objects==undefined && this.speaker!=undefined && this.speaker.webURLs!=undefined) {
    objects = this.speaker.webURLs;
    Session.set("weburls", objects);
  }

  if(objects) {
    for(var i = 0; i<objects.length; i++) {
        objects[i].index = i;
    }

    return objects;
  }
});

// Template.tagTalk.rendered = function() {
//   // console.log("Levels");
//   // console.dir(this);
//   var levels = this.data.categories.levels;
//
//   $(levels).each(function(){
//     // console.log("Level");
//     // // console.log(level);
//     // console.log("This");
//     // console.log(this)
//     var checkbox = $(":checkbox[value=" + this + "]").prop("checked", true);
//   });
//
//   var subjects = this.data.categories.subjects;
//   $(subjects).each(function(){
//     var checkbox = $(":checkbox[value=" + this + "]").prop("checked", true);
//
//   });
//
//   var industries = this.data.categories.industries;
//   $(industries).each(function(){
//     var checkbox = $(":checkbox[value=" + this + "]").prop("checked", true);
//   });
//
// }

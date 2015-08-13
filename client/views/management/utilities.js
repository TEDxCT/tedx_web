Template.editor.rendered = function(){
  var elements = document.querySelectorAll('.editable'),
  editor = new MediumEditor(elements);

  window.addEventListener("beforeunload", function (e) {
    if(Session.get("unsavedChanges")==true) {
      var confirmationMessage = 'It looks like you have been editing something.';
      confirmationMessage += 'If you leave before saving, your changes will be lost.';

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    }
  });

  var modifiedSections = this.data.sections;
  for(var i = 0; i<modifiedSections.length; i++) {
    modifiedSections[i].index = i;
  }

  Session.set("sections", modifiedSections);
}

// Template.editor.events({
//   "click .featured-switch": function(event, template) {
//     console.log($(".onoffswitch-checkbox")[0].value);
//      posts.update(this._id, {$set: {"featured":$(".onoffswitch-checkbox").is(":checked")}});
//   },
// });

Template.editor.helpers({
  'layoutIs': function(layoutType) {
    if(layoutType==this.type) return true;
    else return false;
  },
  'saved': function() {
    if(Session.get("unsavedChanges")==undefined) return true;
    else return !Session.get("unsavedChanges");
  },
  'modifiedThis': function() {
    // Return a modified data object with edtiable set to true
    var modifiedThis = this;
    modifiedThis.editable = true;
    modifiedThis.unique = ShortId.generate();
    return modifiedThis;
  },
  'sections': function() {
    return Session.get("sections");
  },
  'stringOrPlaceholder': function(string) {
    if((string=="")||(string==undefined)) {
      return "Select this text to edit it";
    }
    else {
      return string;
    }
  },

  'data' : function() {

  }
});

Template.viewer.helpers({
  'layoutIs': function(layoutType) {
    if(layoutType==this.type) return true;
    else return false;
  },
  'modifiedThis': function() {
    // Return a modified data object with edtiable set to false
    var modifiedThis = this;
    modifiedThis.edtiable = false;
    modifiedThis.unique = ShortId.generate();
    return modifiedThis;
  },
})

Template.text.events({
  'click .editable': function(event, template) {
    var elements = document.querySelectorAll('.editable'),
    editor = new MediumEditor(elements);
    if(!event.isDefaultPrevented()) Session.set("unsavedChanges", true);
  },
})

Template.sectionQuickEdits.events({
  'click .remove': function(event, template) {
    var sectionsWithRemovedElement = Session.get("sections");
    sectionsWithRemovedElement.splice(this.index,1);
    $(template.find(".row")).remove();
    Session.set("sections", sectionsWithRemovedElement);
    Session.set("unsavedChanges", true);
  },
  'click .order-up': function(event, template) {
    var sections = Session.get("sections");

    if(this.index!=0) {
      var targetSection = sections[this.index];
      var switchSection = sections[this.index-1];
      targetSection.index = this.index-1;
      switchSection.index = this.index;

      sections[targetSection.index] = targetSection;
      sections[switchSection.index] = switchSection;

      Session.set("sections", sections);
      Session.set("unsavedChanges", true);
    } else FlashMessages.sendError("Aiming too high?");
  },
  'click .order-down': function(event, template) {
    var sections = Session.get("sections");

    if(this.index!=sections.length-1) {
      var targetSection = sections[this.index];
      var switchSection = sections[this.index+1];

      targetSection.index = this.index+1;
      switchSection.index = this.index;

      sections[targetSection.index] = targetSection;
      sections[switchSection.index] = switchSection;
      Session.set("sections", sections);
      Session.set("unsavedChanges", true);
    } else FlashMessages.sendError("Aiming too low?");
  }
})

Template.image.events({
  'click .upload': function(event, template) {
    var self = this;
    filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
      $('#' + self.unique + ' img').attr("src", Blob.url);
    });
  },
})

Template.image.helpers({
  'unique': function() {
    return ShortId.generate();
  }
})

Template.chooseSection.helpers({
  'saved': function() {
    if(Session.get("unsavedChanges")==undefined) return true;
    else return !Session.get("unsavedChanges");
  }
})

Template.chooseSection.events({
  'click .sectionType.text':function() {
    var newSection = {"type": "text", "content":"Click this text to edit it"};
    posts.update({"_id": this._id}, {$push: {"sections":  newSection}});
    var sections = Session.get("sections");
    newSection.index = sections.length;
    sections.push(newSection)
    Session.set("sections", sections);
  },
  'click .sectionType.image':function() {
    var newSection = {"type": "image", "source": "/images/default/image.png"};
    posts.update({"_id": this._id}, {$push: {"sections":  newSection}});
    var sections = Session.get("sections");
    newSection.index = sections.length;
    sections.push(newSection)
    Session.set("sections", sections);
  },
})

Template.actions.helpers({
  'saved': function() {
    if(Session.get("unsavedChanges")==undefined) return true;
    else return !Session.get("unsavedChanges");
  }
})

Template.actions.events({
  'click .save': function(event, template) {
    event.preventDefault();
    var allSections = $("section.forSaving");
    var formattedSections = [];
    allSections.each(function( index ) {
      // If section is a text section
      if($(this).hasClass("text")){
        formattedSections[index] = {
          "type": "text",
          "content": $(this)[0].innerHTML
        }
      }
      // If section is a image section
      else if($(this).hasClass("image")) {
        formattedSections[index] = {
          "type": "image",
          "source": $(this)[0].lastElementChild.src
        }
      }
      // If section is a date section
      else if($(this).hasClass("start-date")) {
        console.log('START DATE')
        formattedSections[index] = {
          "type": "start-date",
          "date": $(this)[0].lastElementChild
        }
      }
    });
    Session.set("unsavedChanges", false);
    posts.update({"_id": this._id}, {$set: {"sections":  formattedSections}});

    saveTemplateSpecificData(this, template);
    // Router.go("posts.show", this);
  },
  // Making sure any unsaved changes don't get thrown away
  // Cancel
  'click .cancel': function() {
    event.preventDefault();
    if(Session.get("unsavedChanges")==true) $(".cancelPrompt").toggleClass("hidden");
    else Router.go("posts");
  },
  'click .cancelPrompt .back': function() {
    event.preventDefault();
    $(".cancelPrompt").toggleClass("hidden");
  },
  'click .cancelApproved': function() {
    event.preventDefault();
    Session.set("unsavedChanges", false);
    Router.go("posts");
  },
  // Delete
  'click .delete': function() {
    event.preventDefault();
    $(".deletePrompt").toggleClass("hidden");
    // else Router.go("posts");
  },
  'click .deletePrompt .back': function() {
    event.preventDefault();
    $(".deletePrompt").toggleClass("hidden");
  },
  'click .deleteApproved': function() {
    event.preventDefault();
    Session.set("unsavedChanges", false);
    posts.update({"_id": this._id}, {$set: {"archive":  true}});

    Router.go("posts");
  },
});

function saveTemplateSpecificData(doc, template) {
  var templateFields = new Object();

  if(doc.type=="article") {
    templateFields.title = $(".title")[0].innerText;
    templateFields.summary = $(".summary")[0].value;
  }

  if(doc.type=="event") {
    templateFields.title = $(".title")[0].innerText;
    templateFields.summary = $(".summary")[0].value;
    templateFields.venue = $(".venue")[0].innerText;
    templateFields.price = $(".price")[0].innerText;
    templateFields.afterparty = $(".afterparty")[0].innerText;
    templateFields.date = $(".date")[0].value;
    templateFields.starttime = $(".starttime")[0].value;
    templateFields.endtime = $(".endtime")[0].value;
    var featured = $(".onoffswitch-checkbox").is(":checked")
    templateFields.featured = featured;

    templateFields.session1 = [
      $("#s1p1 :selected")[0].value,
      $("#s1p2 :selected")[0].value,
      $("#s1p3 :selected")[0].value,
      $("#s1p4 :selected")[0].value]
      templateFields.session2 = [
        $("#s2p1 :selected")[0].value,
        $("#s2p2 :selected")[0].value,
        $("#s2p3 :selected")[0].value,
        $("#s2p4 :selected")[0].value]
        templateFields.session3 = [
          $("#s3p1 :selected")[0].value,
          $("#s3p2 :selected")[0].value,
          $("#s3p3 :selected")[0].value,
          $("#s3p4 :selected")[0].value]
          templateFields.session4 = [
            $("#s4p1 :selected")[0].value,
            $("#s4p2 :selected")[0].value,
            $("#s4p3 :selected")[0].value,
            $("#s4p4 :selected")[0].value]
  }


  var published = $(".publishedSwitch");
  if(published!=undefined) templateFields.published = published.is(":checked");
  else templateFields.published = false;

  console.dir(templateFields);
  var update = posts.update({"_id": doc._id}, {$set: templateFields});
  if (update > 0) {
    FlashMessages.sendSuccess("Successfully updated event");
  } else {
    FlashMessages.sendError("Failed to update event");
  }

}

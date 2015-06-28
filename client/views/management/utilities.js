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
}

Template.editor.helpers({
  'layoutIs': function(layoutType) {
    if(layoutType==this.type) return true;
    else return false;
  },
  'saved': function() {
    if(Session.get("unsavedChanges")==undefined) return true;
    else return !Session.get("unsavedChanges");
  }
});

Template.text.events({
  'click .editable': function(event, template) {
    var elements = document.querySelectorAll('.editable'),
    editor = new MediumEditor(elements);
    if(!event.isDefaultPrevented()) Session.set("unsavedChanges", true);
  },
  'click .remove': function(event, template) {
    $(template.find(".row")).remove();
    Session.set("unsavedChanges", true);
  }
})

Template.image.events({
  'click .upload': function(event, template) {
    var uniqueImageIdentifier = event.currentTarget.attributes.unique.textContent;
    var selector = 'img[unique="' +uniqueImageIdentifier + '"]';
    var self = this;
    filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
      $(selector).attr("src", Blob.url);
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
    posts.update({"_id": this._id}, {$push: {"sections":  {"type": "text", "content":"Click this text to edit it"}}});
  }
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
    });
    Session.set("unsavedChanges", false);
    posts.update({"_id": this._id}, {$set: {"sections":  formattedSections}});
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

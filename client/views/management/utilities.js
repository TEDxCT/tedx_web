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

  Session.set("sections", this.data.sections);
  console.log(this.data);
}

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
  }
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
    $(template.find(".row")).remove();
    Session.set("unsavedChanges", true);
  },
  'click .order-up': function(event, template) {
    // console.log("Going up");
    // var allSections = $(".forMoving");
    // var self = this;
    //
    // allSections.each(function( index ) {
    //   // If section is a text section
    //   if($(this).is("#" + self.unique)){
    //     $('#' + allSections[index-1].id).before(this.outerHTML);
    //     $(this).remove();
    //   }
    // })
    var sections = Session.get("sections");
    var b = sections[0];
    sections[0] = sections[1];
    sections[1] = b;
    Session.set("sections", sections);
  },
  'click .order-down': function(event, template) {
    // console.log("Going Down");
    // var allSections = $(".forMoving");
    // var self = this;
    //
    // allSections.each(function( index ) {
    //   // If section is a text section
    //   if($(this).is("#" + self.unique)){
    //     $('#' + allSections[index+1].id).after(this.outerHTML);
    //     $(this).remove();
    //   }
    // })
    var sections = Session.get("sections");
    var b = sections[1];
    sections[1] = sections[0];
    sections[0] = b;
    Session.set("sections", sections);
  }
})

Template.image.events({
  'click .upload': function(event, template) {
    var uniqueImageIdentifier = event.currentTarget.attributes.unique.textContent;
    var self = this;
    filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
      $('#' + uniqueImageIdentifier + " img").attr("src", Blob.url);
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
  console.log(doc);
  var templateFields = new Object();

  if(doc.type="article") {
    templateFields.title = $(".title")[0].innerText;
    templateFields.summary = $(".summary")[0].innerText;
  }

  var published = $(".publishedSwitch");
  if(published!=undefined) templateFields.published = published.is(":checked");
  else templateFields.published = false;

  console.dir(templateFields);
  posts.update({"_id": doc._id}, {$set: templateFields});
}

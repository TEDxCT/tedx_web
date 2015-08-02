Template.newSpeaker.events({
  'click .upload': function(event, template) {
    uploadWithFilePicker(template)
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    uploadFromWebURL(template);
  },
  'click .save_speaker': function(event, template) {
		console.log("SAVING SPEAKER")
    var newSpeaker = new Object();

    newSpeaker.firstName = $(template.find(".firstNameText")).val();
    newSpeaker.lastName = $(template.find(".lastNameText")).val();
    newSpeaker.description = $(template.find(".descriptionText")).val();
    newSpeaker.imageURL = $('#imageUpload').attr("src");

    var newId = speakers.insert(newSpeaker);
		Router.go('speakers.show', {"_id": newId});
  },
});

function uploadWithFilePicker(template) {
  filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
    $('#imageUpload').attr("src", Blob.url);
    $('.logoURL').attr("value", Blob.url);
  });
}

function uploadFromWebURL(template) {
  var imageURL = $(template.find(".logoURL")).val();
  if (imageURL != undefined && imageURL != "") {
    $('#imageUpload').attr("src", imageURL);
  }
}

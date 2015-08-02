Template.editSpeaker.events({
  'click .upload': function(event, template) {
    uploadWithFilePicker(template)
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    uploadFromWebURL(template);
  },
  'click .update': function(event, template) {


		speakers.update({"_id": this._id}, {$set: {
			"firstName":  $(template.find(".firstNameText")).val(),
			"lastName":  $(template.find(".lastNameText")).val(),
			"description":  $(template.find(".descriptionText")).val(),
			"imageURL":   $('#imageUpload').attr("src")
		}})

		Router.go('/speakers/show/' + this._id)

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

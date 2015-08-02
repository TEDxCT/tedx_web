Template.editSpeaker.events({
  'click .upload': function(event, template) {
    uploadWithFilePicker(template)
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    uploadFromWebURL(template);
  },
  'click .update': function(event, template) {

    var selectedEventId = template.find('#eventSelector :selected').value
    // var selectedTalkId = template.find('#talkSelector :selected').value

		speakers.update({"_id": this._id}, {$set: {
			"firstName":  $(template.find(".firstNameText")).val(),
			"lastName":  $(template.find(".lastNameText")).val(),
			"description":  $(template.find(".descriptionText")).val(),
      "topic":  $(template.find(".topicText")).val(),
			"imageURL":   $('#imageUpload').attr("src"),
      "selectedEventId" : selectedEventId,
      // "selectedTalkId" : selectedTalkId
		}})

    var speaker = speakers.findOne(this._id);

    // posts.update({'_id' : selectedEventId}, { $push: { 'speakers':  speaker}})
    // talk.update({'_id' : selectedTalkId}, { $push: { 'speakers':  speaker}})


		Router.go('/speakers/show/' + this._id)

  },
});

Template.editSpeaker.helpers({
  'events': function(){
    return posts.find({'type':'event'}, {sort: {'title' : 1}});
  },
  'talks': function(){
    return videos.find({}, {sort: {'title' : 1}});
  }
})

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

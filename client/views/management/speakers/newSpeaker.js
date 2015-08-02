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
    newSpeaker.topic = $(template.find(".topicText")).val();
    newSpeaker.description = $(template.find(".descriptionText")).val();
    newSpeaker.imageURL = $('#imageUpload').attr("src");
    var selectedEventId = template.find('#eventSelector :selected').value
    // var selectedTalkId = template.find('#talkSelector :selected').value
    newSpeaker.selectedEventId = selectedEventId;
    // newSpeaker.selectedTalkId = selectedTalkId;

    var newId = speakers.insert(newSpeaker);
    var speaker = speakers.findOne(newId);

    // var postUpdate = posts.update({'_id' : selectedEventId}, { $push: { 'speakers':  speaker}})
    // console.log('UPDATED POST: ' + postUpdate)
    // var talkUpdate = talk.update({'_id' : selectedTalkId}, { $push: { 'speakers':  speaker}})
    // console.log('UPDATED TALK: ' + talkUpdate)

		Router.go('speakers.show', {"_id": newId});
  },
});

Template.newSpeaker.helpers({
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

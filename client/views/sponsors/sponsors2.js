Meteor.subscribe('sponsors');


Template.sponsors.rendered = function() {
  var owl = $("#owl-demo");
  owl.owlCarousel({
      autoPlay: 1000, //Set AutoPlay to 3 seconds
      items : 4,
      autoplay: true,
      loop : true,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [979,3]

  });
};

Template.sponsors.helpers({
  'sponsors': function() {
    var s = sponsors.find();
    console.log(sponsors.find().fetch())
    return s;
  },
})


Template.newSponsor2.events({
  'click .upload': function() {
    filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
      $('#imageUpload').attr("src", Blob.url);
      $('.logoURL').attr("value", Blob.url);

    });
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    var imageURL = $(template.find(".logoURL")).val();
    $('#imageUpload').attr("src", imageURL);
  },
  'click .save_sponsor': function(event, template) {
    var newSponsor = new Object();
    newSponsor.name = $(template.find(".nameText")).val();
    newSponsor.description = $(template.find(".descriptionText")).val();
    newSponsor.webURL = $(template.find(".websiteURL")).val();
    newSponsor.logoImage = $(template.find("#imageUpload")).val();
    newSponsor.imageURL = $('#imageUpload').attr("src");
    newSponsor.type = $(template.find(".typeText")).val();
    console.log(newSponsor)
    sponsors.insert(newSponsor)
    Router.go('/sponsors/show/' + this._id)
  },
});

Template.editSponsor.events({
  'click .upload': function() {
    filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
      $('#imageUpload').attr("src", Blob.url);
      $('.logoURL').attr("value", Blob.url);
    });
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    var imageURL = $(template.find(".logoURL")).val();
    $('#imageUpload').attr("src", imageURL);
  },
  'click .update_sponsor': function(event, template) {
    sponsors.update({"_id": this._id}, {$set: {
      "name":  $(template.find(".nameText")).val(),
      "description" : $(template.find(".descriptionText")).val(),
      "webURL" : $(template.find(".websiteURL")).val(),
      "imageURL" : $('#imageUpload').attr("src")
    }});
    Router.go('/sponsors/show/' + this._id)
  },
});

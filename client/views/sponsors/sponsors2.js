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
    console.log('Click upload image')
    // var self = this;
    filepicker.pick({maxSize: 4*1024*1024}, function onSuccess(Blob){
      $('#imageUpload').attr("src", Blob.url);
    });
  },
  'click .save_sponsor': function(event, template) {
    console.log('Save')
    var newSponsor = new Object();
    newSponsor.name = $(template.find(".nameText")).val();
    newSponsor.description = $(template.find(".descriptionText")).val();
    newSponsor.webURL = $(template.find(".websiteURL")).val();
    newSponsor.logoImage = $(template.find("#imageUpload")).val();
    console.log(newSponsor)
    sponsors.insert(newSponsor)
  },
});

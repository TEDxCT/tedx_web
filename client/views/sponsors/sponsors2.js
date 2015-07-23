Meteor.subscribe('sponsors');


Template.sponsors.rendered = function() {
  var owl = $("#owl-demo");
  if (owl != undefined) {
    owl.owlCarousel({
        autoPlay: 1000, //Set AutoPlay to 3 seconds
        items : 4,
        autoplay: true,
        loop : true,
        // itemsDesktop : [1199,3],
        // itemsDesktopSmall : [979,3]
    });
  }
};

Template.sponsors.helpers({
  'sponsors': function() {
    var s = sponsors.find();
    return s;
  },
})


Template.newSponsor2.events({
  'click .upload': function(event, template) {
    uploadWithFilePicker(template)
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    uploadFromWebURL(template);
  },
  'click .save_sponsor': function(event, template) {
    var newSponsor = new Object();
    var years = []
    $("input:checkbox[name=year]:checked").each(function(){
      years.push($(this).val());
    });
    newSponsor.years = years;
    newSponsor.name = $(template.find(".nameText")).val();
    newSponsor.type = $(template.find(".typeText")).val();
    newSponsor.description = $(template.find(".descriptionText")).val();
    newSponsor.webURL = $(template.find(".websiteURL")).val();
    newSponsor.logoImage = $(template.find("#imageUpload")).val();
    newSponsor.imageURL = $('#imageUpload').attr("src");
    newSponsor.type = $(template.find(".typeText")).val();
    console.log(newSponsor);
    var newId = sponsors.insert(newSponsor)
    Router.go('/sponsors/show/' + newId)
  },
});

Template.editSponsor.events({
  'click .upload': function(event, template) {
    uploadWithFilePicker(template)
  },
  'click .btn-upload-from-web': function(event, template) {
    event.preventDefault();
    uploadFromWebURL(template);
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

Template.registerHelper("isInYear", function (selectedYears, year) {
    var index = selectedYears.indexOf(year);
    if (index>-1) {
      return true;
    }
    return false;
});
